import { generateUniqueId } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const variantSchema = z.object({
	variant_id: z.string().optional(), // Make optional by default
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
});

const productSchema = z
	.object({
		_id: z.string().optional(),

		// just for type checking [no use case]
		name: z.string().optional(),
		quantity: z.number().optional(),
		warehouse_data: z.array(z.any()).optional(),
		store_data: z.array(z.any()).optional(),
		// -------------------end---------------------------

		// product_id: z.string().min(2, { message: `Product is Required` }),
		warehouse_id: z
			.string()
			.min(2, { message: `Warehouse is Required` }),
		store_id: z.string().min(2, { message: `Store is Required` }),
		variants: z.array(variantSchema).min(1, 'At least one variant is required'),
		product_type: z.enum(['single', 'variant'], {
			message: 'Product type is required',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.product_type === 'variant') {
			data.variants.forEach((variant, index) => {
				if (!variant.variant_id) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Variant ID is required ',
						path: ['variants', index, 'variant_id'],
					});
				}
			});
		}
	});

export const FormSchema = z.object({
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

	reference_number: z
		.string()
		.min(1, 'Reference number is required')
		.max(30, 'Reference number maximum 30 characters'),
	product_ids: z.array(z.string()).min(1, 'At least one product is required'),
	supplier_id: z.string().min(2, 'Supplier is required'),
	payment_method: z.string().min(2, 'payment method is required'),
	products: z.array(productSchema).min(1, 'At least one product is required'),
});

export const createZodFromNew = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),

		defaultValues: {
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
			reference_number: 'PUR-' + generateUniqueId(),
		},
	});

	return { methods };
};

export type FormValuesNew = z.infer<typeof FormSchema>;
