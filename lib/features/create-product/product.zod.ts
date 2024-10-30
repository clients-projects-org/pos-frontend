import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

// schema
export const FormSchema = z.object({
	// image
	image: z
		.instanceof(File, {
			message: 'Product image  is required.',
		})
		.optional(),
	gallery_images: z
		.array(z.instanceof(File), {
			message: 'Gallery image must be a valid file.',
		})
		.refine((files) => files.length > 0, {
			message: 'At least one gallery image is required.',
		})
		.optional(),

	// product from
	supplier_id: z.string().min(2, { message: `Supplier is Required` }),
	unit_id: z.string().min(2, { message: `Unit is Required` }),
	// warehouse_id: z.string().min(2, { message: `Warehouse is Required` }),
	warehouse_id: z
		.array(z.string().min(2, { message: 'Warehouse is Required' }))
		.min(1, { message: 'At least one Warehouse is required' }),
	store_id: z
		.array(z.string().min(2, { message: 'Store is Required' }))
		.min(1, { message: 'At least one Warehouse is required' }),

	// product info
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

	// price and stock

	sell_price: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
			}
			return val; // Otherwise return the value unchanged
		},
		z.number().min(0, {
			message: 'Sell price is Required',
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
			message: 'Discount is Required',
		}) // Validate the number
	),
	discount_type: z.enum(['fixed', 'percentage', 'none'], {
		message: 'Discount Type is Required',
	}),

	alert_quantity: z.preprocess(
		(val) => {
			// If it's a string, convert it to a number
			if (typeof val === 'string') {
				const num = Number(val);
				return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
			}
			return val; // Otherwise return the value unchanged
		},
		z.number().min(0, {
			message: 'Alert Quantity is Required',
		}) // Validate the number
	),

	// others
	tags: z.array(z.string()).optional(),
	isFeature: z.boolean(),

	// manufacture_date: z.preprocess(
	// 	(val) => (typeof val === 'string' ? new Date(val) : val),
	// 	z.date({ invalid_type_error: 'Invalid manufacture date' })
	// ),
	// expire_date: z.preprocess(
	// 	(val) => (typeof val === 'string' ? new Date(val) : val),
	// 	z.date({ invalid_type_error: 'Invalid expire date' })
	// ),
});
// .superRefine((data, ctx) => {
// 	// Check if expire date is after manufacture date
// 	if (data.expire_date <= data.manufacture_date) {
// 		ctx.addIssue({
// 			code: 'invalid_date',
// 			path: ['expire_date'],
// 			message: 'Expire date must be after manufacture date',
// 		});
// 	}
// });

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			// image
			gallery_images: undefined,
			image: undefined,

			// product from
			supplier_id: '',
			warehouse_id: [],
			store_id: [],

			// product info
			name: '',
			sku: '',
			category_id: '',
			sub_category_id: '',
			brand_id: '',
			unit_id: '',
			sort_description: '',
			long_description: '',

			// price and stock
			sell_price: 0,
			discount_type: 'none',
			discount_value: 0,
			alert_quantity: 0,

			// others
			// manufacture_date: new Date(),
			// expire_date: new Date(),
			tags: [],
			isFeature: false,
		},
	});

	return { methods };
};
