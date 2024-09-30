import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Define common fields for all products
const baseProductSchema = z.object({
	supplier_id: z.string().min(2, { message: `Supplier is Required` }),
	warehouse_id: z.string().min(2, { message: `Warehouse is Required` }),
	store_id: z
		.array(z.string().min(2, { message: 'Store is Required' }))
		.min(1, { message: 'At least one store is required' }),

	name: z
		.string()
		.min(2, { message: `Product Name is Required` })
		.max(100, 'Product Name maximum 100 characters'),
	sku: z
		.string()
		.min(2, { message: `Product SKU is Required` })
		.max(10, 'Product SKU maximum 10 characters'),
	category_id: z.string().min(2, { message: `Category is Required` }),
	sub_category_id: z.string().min(2, { message: `Sub Category is Required` }),
	brand_id: z.string().min(2, { message: `Brand is Required` }),
	sort_description: z
		.string()
		.min(2, { message: `Sort Description is Required` })
		.max(150, 'Sort Description maximum 150 characters'),
	long_description: z
		.string()
		.min(2, { message: `Long Description is Required` })
		.max(550, 'Long Description maximum 550 characters'),
	tags: z.array(z.string()).optional(),
	isFeature: z.boolean(),
	warranty_id: z.string().optional(),
	image: z.instanceof(File, {
		message: 'Product image  is required.',
	}),
	gallery_images: z
		.array(z.instanceof(File), {
			message: 'Gallery image must be a valid file.',
		})
		.refine((files) => files.length > 0, {
			message: 'At least one gallery image is required.',
		}),

	manufacture_date: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z.date({ invalid_type_error: 'Invalid manufacture date' })
	),
	expire_date: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z.date({ invalid_type_error: 'Invalid expire date' })
	),
});

// Define specific fields for a "single" product
const singleProductFields = z.object({
	quantity: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Quantity must be a number greater than 0',
		}),
	alert_quantity: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Alert quantity must be a number greater than 0',
		}),
	buy_price: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Buy price must be a number greater than 0',
		}),
	sell_price: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'Sell price must be a number greater than 0',
		}),
	discount_value: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), {
			message: 'Discount value must be a number',
		}),
	discount_type: z.enum(['fixed', 'percentage', 'none'], {
		message: 'Discount Type is Required',
	}),
});

// Define specific fields for a "variant" product
const variantProductFields = z.object({
	variants: z.array(
		z.object({
			unit_id: z.string().min(2, { message: `Unit is Required` }),
			variant_id: z.string().min(2, { message: `Variant is Required` }),
			quantity: z
				.string()
				.transform((val) => Number(val))
				.refine((val) => !isNaN(val) && val > 0, {
					message: 'Quantity must be a number greater than 0',
				}),
		})
	),
});

// Create a discriminated union based on product_type
export const FormSchema = z
	.discriminatedUnion('product_type', [
		baseProductSchema
			.extend({
				product_type: z.literal('single'),
			})
			.merge(singleProductFields),
		baseProductSchema
			.extend({
				product_type: z.literal('variant'),
			})
			.merge(variantProductFields),
	])
	.superRefine((data, ctx) => {
		// Check if expire date is after manufacture date
		console.log(data, ctx);
		if (data.expire_date <= data.manufacture_date) {
			ctx.addIssue({
				code: 'invalid_date',
				path: ['expire_date'],
				message: 'Expire date must be after manufacture date',
			});
		}
	});

// Use default product type as 'single'
export const createZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			product_type: 'single', // Default to single product type
			supplier_id: '',
			warehouse_id: '',
			store_id: [],
			name: '',
			sku: '',
			category_id: '',
			sub_category_id: '',
			brand_id: '',
			sort_description: '',
			long_description: '',
			tags: [],
			isFeature: false,
			warranty_id: '',
			image: undefined,
			gallery_images: undefined,
			manufacture_date: new Date(),
			expire_date: new Date(),

			// Single product defaults
			quantity: '0',
			alert_quantity: '0',
			buy_price: '0',
			sell_price: '0',
			discount_value: '0',
			discount_type: 'none',

			// Variant product defaults (will be ignored if 'single')
			variants: [{ unit_id: '', variant_id: '', quantity: '0' }],
		},
	});

	return { methods };
};

export type FormValues = z.infer<typeof FormSchema>;
