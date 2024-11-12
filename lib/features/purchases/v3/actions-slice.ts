import { generateUniqueId } from '@/lib/actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const productState = {
	_id: '',
	name: '',
	sell_price: 0,
	quantity: 0,
	warehouse_data: '',
	store_data: '',
	warehouse_id: [] as {
		_id: string;
		name: string;
	}[],
	store_id: [] as {
		_id: string;
		name: string;
	}[],
	variants: [] as (typeof variantState)[],
	product_type: 'single',
};
const variantState = {
	variant_id: '',
	attribute_id: '',
	manufacture_date: '',
	expire_date: '',
	quantity: 0,
	rate: 0,
	id: '',
};
const initialState = {
	auto_payment_system: false,

	supplier_id: '',
	products: [] as (typeof productState)[],
	purchase_date: new Date(),
	reference_number: 'PUR-' + generateUniqueId(), // Generate new reference number
	purchase_status: 'ordered',

	discount_type: 'none',
	paid_amount: 0,
	discount_value: 0,
	tax: 0,
	shipping_cost: 0,
	total_price_auto_rate: 0,

	description: '',
	payment_method: '',
	errors: {} as any,
};

const purchaseSliceV3 = createSlice({
	name: 'purchase_create',
	initialState,
	reducers: {
		setField: (
			state,
			action: PayloadAction<{
				field: keyof typeof initialState;
				value: (typeof initialState)[typeof field];
			}>
		) => {
			const { field, value } = action.payload;

			(state as Record<keyof typeof initialState, any>)[field] = value;
			delete state.errors[field];
		},

		// Action to clear all errors
		clearErrors: (state) => {
			state.errors = {};
		},
		// Toggle product by _id: if it exists, remove it; if not, add it
		addProduct: (state, action) => {
			const product = action.payload; // Incoming product with a unique _id
			const existingProductIndex = state.products.findIndex(
				(p) => p._id === product._id
			);

			if (existingProductIndex !== -1) {
				// Product already exists, remove it by filtering it out
				state.products = state.products.filter((p) => p._id !== product._id);
			} else {
				// Product does not exist, add it
				const newProduct = {
					...product,
					variants: [{ ...variantState, id: uuidv4() }],
				};
				state.products.push(newProduct);
			}
		},

		addVariant: (state, action) => {
			const { product_id } = action.payload;
			const product = state.products.find((p) => p._id === product_id);
			if (product) {
				product.variants.push({
					...variantState,
					id: uuidv4(),
				});
			}
		},

		removeVariant: (state, action) => {
			const { product_id, id } = action.payload;
			const product = state.products.find((p) => p._id === product_id);
			if (product) {
				product.variants = product.variants.filter((v) => v.id !== id);
			}
		},

		updateVariant: (
			state,
			action: PayloadAction<{
				product_id: string;
				variant_id: string;
				key: keyof typeof variantState;
				value: (typeof variantState)[typeof key];
			}>
		) => {
			const { product_id, variant_id, key, value } = action.payload;
			const product = state.products.find((p) => p._id === product_id);
			console.log(action.payload);
			if (product) {
				const variant = product.variants.find((v) => v.id === variant_id);
				if (variant) {
					(variant as Record<keyof typeof variantState, any>)[key] = value;
				}
			}
		},

		// Action to reset the form to its initial state
		resetForm: (state) => {
			Object.assign(state, initialState);
			state.reference_number = 'PUR-' + generateUniqueId(); // Reset with a new unique reference number
		},
	},
});

const totalPrice = (state: typeof initialState) => {
	return state.products?.reduce((acc, product) => {
		const productSubtotal = product.variants.reduce((variantAcc, variant) => {
			return variantAcc + variant.quantity * variant.rate;
		}, 0); // Calculate subtotal for each product's variants

		return acc + productSubtotal; // Add to the total subtotal
	}, 0); // Initialize total subtotal
};

const discount = (state: typeof initialState) => {
	let subtotal = totalPrice(state);

	let finalTotal = subtotal;
	let discount_type = state.discount_type;
	let discount_value = state.discount_value;
	if (discount_type === 'fixed') {
		// Apply fixed discount (subtract fixed value)
		finalTotal = subtotal - discount_value;
	} else if (discount_type === 'percentage') {
		// Apply percentage discount (subtract percentage from subtotal)
		const percentageDiscount = (subtotal * discount_value) / 100;
		finalTotal = subtotal - percentageDiscount;
	}

	// Ensure total doesn't drop below zero
	return Math.max(finalTotal, 0);
};
const grandTotal = (state: typeof initialState) => {
	const tax = Math.max(state.tax || 0, 0); // Ensure tax is positive or 0
	const shippingCost = Math.max(state.shipping_cost || 0, 0); // Ensure shipping cost is positive or 0

	// Calculate the tax amount (assuming it's a percentage)
	const taxAmount = (discount(state) * tax) / 100;

	// Grand total = (Total after discount) + tax + shipping - paid amount
	const grandTotal = discount(state) + taxAmount + shippingCost;

	// Ensure grand total doesn't go below zero
	return Math.max(grandTotal, 0);
};
const dueAndExchange = (state: typeof initialState) => {
	const getGrandTotal = grandTotal(state);

	const paidAmount = Math.max(state.paid_amount || 0, 0); // Ensure paid amount is positive or 0

	let dueAmount = 0;
	let exchangeAmount = 0;

	if (paidAmount < getGrandTotal) {
		// If paid amount is less than the grand total, the due amount is the difference
		dueAmount = getGrandTotal - paidAmount;
	} else {
		// If paid amount is greater than or equal to the grand total, the exchange is the excess amount
		exchangeAmount = paidAmount - getGrandTotal;
	}

	return {
		dueAmount,
		exchangeAmount,
	};
};
export const calculate = {
	totalPrice,
	discount,
	grandTotal,
	dueAndExchange,
};

export const {
	updateVariant,
	setField,
	addProduct,
	resetForm,
	addVariant,
	removeVariant,
} = purchaseSliceV3.actions;
export default purchaseSliceV3;
