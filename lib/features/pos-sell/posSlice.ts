import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the variant details
interface Attribute {
	name: string;
	_id: string;
}

interface Variant {
	_id: string;
	variant_id: {
		_id: string;
		name: string;
		status: string;
		description: string;
		attributes: Attribute[];
		created_by: string;
		createdAt: string;
		updatedAt: string;
	};
	attribute_id: string;
	quantity: number;
}

// Define a type for the initial state
interface VariantState {
	variants: Variant[];
}

// Initial state
const initialState: VariantState = {
	variants: [],
};

// Create the Redux slice
const posSlice = createSlice({
	name: 'variant',
	initialState,
	reducers: {
		// Action to add a single variant
		addVariant(state, action: PayloadAction<Variant>) {
			const variantExists = state.variants.find(
				(v) => v._id === action.payload._id
			);

			if (!variantExists) {
				state.variants.push({ ...action.payload, quantity: 1 });
			} else {
				state.variants = state.variants.map((v) => {
					if (
						v._id === action.payload._id &&
						action.payload.quantity > v.quantity
					) {
						return {
							...v,
							quantity: v.quantity + 1,
						};
					}

					return v;
				});
			}
		},

		// Action to remove a variant
		removeVariant(state, action: PayloadAction<string>) {
			state.variants = state.variants.filter((v) => v._id !== action.payload);
		},
	},
});

// Export the actions generated by createSlice
export const { addVariant, removeVariant } = posSlice.actions;

// Export the reducer to be added to the store
export default posSlice;
