import { statusData } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

// schema
export const FormSchema = z
	.object({
		// product from
		supplier_id: z.string().min(2, {
			message: `Supplier is Required`,
		}),
		warehouse_id: z.string().min(2, {
			message: `Warehouse is Required`,
		}),

		store_id: z.array(
			z.string().min(2, {
				message: `Store is Required`,
			})
		),

		// Product Info
		name: z
			.string()
			.min(2, {
				message: `Product Name is Required`,
			})
			.max(100, 'Product Name maximum 100 characters'),

		sku: z
			.string()
			.min(2, {
				message: `Product sku is Required`,
			})
			.max(10, 'Product sku maximum 10 characters'),

		category_id: z.string().min(2, {
			message: `Category is Required`,
		}),

		sub_category_id: z.string().min(2, {
			message: `Sub Category is Required`,
		}),

		brand_id: z.string().min(2, {
			message: `Brand is Required`,
		}),

		sort_description: z
			.string()
			.min(2, {
				message: `Sort Description is Required`,
			})
			.max(150, 'Sort Description maximum 150 characters'),
		long_description: z
			.string()
			.min(2, {
				message: `Long Description is Required`,
			})
			.max(550, 'Long Description maximum 550 characters'),

		// others
		tags: z.array(z.string()).optional(),
		isFeature: z.boolean(),

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
				message: 'alert quantity must be a number greater than 0',
			}),

		buy_price: z
			.string()
			.transform((val) => Number(val))
			.refine((val) => !isNaN(val) && val > 0, {
				message: 'buy price must be a number greater than 0',
			}),

		sell_price: z
			.string()
			.transform((val) => Number(val))
			.refine((val) => !isNaN(val) && val > 0, {
				message: 'sell price must be a number greater than 0',
			}),

		warranty_id: z.string().optional(),

		discount_value: z
			.string()
			.transform((val) => Number(val))
			.refine((val) => !isNaN(val), {
				message: 'discount value must be a number',
			}),

		discount_type: z.enum(['flat', 'percentage', 'none'], {
			message: 'Discount Type is Required',
		}),

		// image
		image: z.instanceof(File),
		gallery_images: z.array(z.instanceof(File)),
		manufacture_date: z.preprocess(
			(val) => {
				// Convert string to Date object
				return typeof val === 'string' ? new Date(val) : val;
			},
			z.date({ invalid_type_error: 'Invalid manufacture date' })
		),

		expire_date: z.preprocess(
			(val) => {
				// Convert string to Date object
				return typeof val === 'string' ? new Date(val) : val;
			},
			z.date({ invalid_type_error: 'Invalid expire date' })
		),
	})
	.superRefine((data, ctx) => {
		if (data.expire_date <= data.manufacture_date) {
			ctx.addIssue({
				code: 'invalid_date', // Add a code property
				path: ['expire_date'], // Specify the field that caused the error
				message: 'Expire date must be after manufacture date',
			});
		}
	});

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			brand_id: '',
			isFeature: false,
			store_id: [],
			supplier_id: '',
			warehouse_id: '',
			name: '',
			category_id: '',
			gallery_images: undefined,
			image: undefined,
			long_description: '',
			sort_description: '',
			sub_category_id: '',
			tags: [],
			buy_price: 0,
			sell_price: 0,
			discount_type: 'none',
			discount_value: 0,
			quantity: 0,
			alert_quantity: 1,
			sku: '',
			warranty_id: '',
			expire_date: new Date(),
			manufacture_date: new Date(),
		},
	});

	return { methods };
};

/* edit need another for password =============

*/

export type FormValuesEdit = z.infer<typeof FormSchemaEdit>;

// schema
export const FormSchemaEdit = z.object({
	// name
	name: z
		.string()
		.min(2, {
			message: `Name is Required`,
		})
		.max(32, 'Name must be a maximum 32 characters'),

	status: z.enum(statusData, {
		message: 'Status is Required',
	}),

	// description
	description: z.string().optional(),
});

export const editZodFrom = (data: FormValuesEdit) => {
	const methods = useForm<FormValuesEdit>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: data?.name || '',
			status: data?.status || 'active',
			description: data?.description || '',
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				status: data?.status || 'active',
				description: data?.description || '',
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
