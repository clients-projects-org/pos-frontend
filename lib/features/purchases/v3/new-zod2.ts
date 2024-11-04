import { generateUniqueId } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const variantSchema = z
	.object({
		variant_id: z.string().optional(), // Make optional by default
		attribute_id: z.string().optional(), // Make optional by default
		manufacture_date: z.any().optional(),
		expire_date: z.any().optional(),
		// expire_date: z
		// 	.preprocess(
		// 		(val) => (typeof val === 'string' ? new Date(val) : val),
		// 		z.date({ invalid_type_error: 'Invalid expire date' })
		// 	)
		// 	.optional(),
		quantity: z.preprocess(
			(val) => {
				// If it's a string, convert it to a number
				if (typeof val === 'string') {
					const num = Number(val);
					return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
				}
				return val; // Otherwise return the value unchanged
			},
			z.number().min(1, {
				message: 'Quantity is Required',
			}) // Validate the number
		),
		rate: z.preprocess(
			(val) => {
				// If it's a string, convert it to a number
				if (typeof val === 'string') {
					const num = Number(val);
					return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
				}
				return val; // Otherwise return the value unchanged
			},
			z.number().min(1, {
				message: 'Rate is Required',
			}) // Validate the number
		),
	})
	.refine(
		(data) => {
			// Check if both dates are provided and are valid dates
			if (data.manufacture_date && data.expire_date) {
				const manufactureDate = new Date(data.manufacture_date);
				const expireDate = new Date(data.expire_date);

				// Ensure both dates are valid
				if (isNaN(manufactureDate.getTime()) || isNaN(expireDate.getTime())) {
					return true; // Skip if either date is invalid
				}

				// Check if expire_date is after manufacture_date
				return expireDate > manufactureDate;
			}

			return true; // Skip validation if either date is not provided
		},
		{
			message: 'Expire date must be after the manufacture date',
			path: ['expire_date'], // Show error on the expire_date field
		}
	);

const productSchema = z
	.object({
		_id: z.string().optional(),

		// just for type checking [no use case]
		name: z.string().optional(),
		sell_price: z.any().optional(),
		quantity: z.number().optional(),
		warehouse_data: z.array(z.any()).optional(),
		store_data: z.array(z.any()).optional(),
		// -------------------end---------------------------

		// product_id: z.string().min(2, { message: `Product is Required` }),
		warehouse_id: z.string().min(2, { message: `Warehouse is Required` }),
		store_id: z.string().min(2, { message: `Store is Required` }),
		variants: z.array(variantSchema).min(1, 'At least one variant is required'),
		product_type: z.enum(['single', 'variant'], {
			message: 'Product type is required',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.product_type === 'variant') {
			const variantAttributePairs = new Set(); // To track unique (variant_id, attribute_id) pairs

			data.variants.forEach((variant, index) => {
				// Check if both variant_id and attribute_id are present
				if (!variant.variant_id) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Variant ID is required',
						path: ['variants', index, 'variant_id'], // Error on variant_id
					});
				}

				if (!variant.attribute_id) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Attribute ID is required',
						path: ['variants', index, 'attribute_id'], // Error on attribute_id
					});
				}

				// Check if the combination of variant_id and attribute_id is unique
				if (variant.variant_id && variant.attribute_id) {
					const pairKey = `${variant.variant_id}-${variant.attribute_id}`;

					if (variantAttributePairs.has(pairKey)) {
						// problem hossa je attribute change korle error jay na

						// ctx.addIssue({
						// 	code: z.ZodIssueCode.custom,
						// 	message: 'Duplicate Variant/Attribute Found',
						// 	path: ['variants', index, 'variant_id'], // Error on variant_id
						// });

						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Duplicate Attribute found.',
							path: ['variants', index, 'attribute_id'], // Error on attribute_id
						});
					} else {
						variantAttributePairs.add(pairKey); // Add the pair to the set
					}
				}
			});
		}
	});

export const FormSchema2 = z.object({
	purchase_date: z.date({ message: 'Purchase date is required' }),
	purchase_status: z.enum(['ordered', 'received'], {
		message: 'Purchase status is required',
	}),
	discount_type: z.enum(['percentage', 'fixed', 'none'], {
		message: 'Discount type is required',
	}),

	description: z.string().optional(),

	shipping_cost: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
			}
			return val; // Otherwise return the value unchanged
		},
		z.number().min(0, {
			message: 'Shipping cost is Required',
		}) // Validate the number
	),
	paid_amount: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
			}
			return val; // Otherwise return the value unchanged
		},
		z.number().min(0, {
			message: 'paid_amount is Required',
		}) // Validate the number
	),
	discount_value: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
			}
			return val; // Otherwise return the value unchanged
		},
		z.number().min(0, {
			message: 'Shipping cost is Required',
		}) // Validate the number
	),
	tax: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if conversion fails (so it fails validation)
			}
			return val; // Return value unchanged if it's already a number
		},
		z.number().min(0, {
			message: 'Tax must be 0 or greater',
		}) // Validate that the number is at least 0
	),
	total_price_auto_rate: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if conversion fails (so it fails validation)
			}
			return val; // Return value unchanged if it's already a number
		},
		z.number().min(0, {
			message: 'total price must be 0 or greater',
		}) // Validate that the number is at least 0
	),

	reference_number: z
		.string()
		.min(1, 'Reference number is required')
		.max(30, 'Reference number maximum 30 characters'),
	product_ids: z.array(z.string()).min(1, 'At least one product is required'),
	supplier_id: z.string().min(2, 'Supplier is required'),
	payment_method: z.string().min(2, 'payment method is required'),
	products: z.array(productSchema).min(1, 'At least one product is required'),
	payment_system: z.boolean(),
});

export const CreateZodFromNew2 = () => {
	const methods = useForm<z.infer<typeof FormSchema2>>({
		resolver: zodResolver(FormSchema2),
		defaultValues: getDefaultValues(),
	});

	const resetForm = () => {
		methods.reset(getDefaultValues()); // Pass new default values with a fresh reference_number
	};

	return { methods, resetForm };
};

const getDefaultValues = (): FormValuesNew2 => ({
	description: '',
	discount_type: 'none',
	paid_amount: 0,
	discount_value: 0,
	payment_method: '',
	product_ids: [],
	products: [],
	purchase_date: new Date(),
	tax: 0,
	shipping_cost: 0,
	supplier_id: '',
	purchase_status: 'ordered',
	payment_system: false,
	reference_number: 'PUR-' + generateUniqueId(), // Generate new reference number
	total_price_auto_rate: 0,
});

export type FormValuesNew2 = z.infer<typeof FormSchema2>;
