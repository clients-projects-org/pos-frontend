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
		// common fields
		supplier_id: z.string().min(2, { message: `Supplier is Required` }),
		warehouse_id: z.string().min(2, { message: `Warehouse is Required` }),
		store_id: z.array(z.string().min(2, { message: `Store is Required` })),
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
		image: z.instanceof(File),
		gallery_images: z.array(z.instanceof(File)),
		manufacture_date: z.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date({ invalid_type_error: 'Invalid manufacture date' })
		),
		expire_date: z.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date({ invalid_type_error: 'Invalid expire date' })
		),

		// single product fields, now conditionally validated
		quantity: z
			.string()
			.optional()
			.transform((val) => (val ? Number(val) : null))
			.refine((val) => val === null || (!isNaN(val) && val > 0), {
				message: 'Quantity must be a number greater than 0',
			}),
		alert_quantity: z
			.string()
			.optional()
			.transform((val) => (val ? Number(val) : null))
			.refine((val) => val === null || (!isNaN(val) && val > 0), {
				message: 'Alert quantity must be a number greater than 0',
			}),
		buy_price: z
			.string()
			.optional()
			.transform((val) => (val ? Number(val) : null))
			.refine((val) => val === null || (!isNaN(val) && val > 0), {
				message: 'Buy price must be a number greater than 0',
			}),
		sell_price: z
			.string()
			.optional()
			.transform((val) => (val ? Number(val) : null))
			.refine((val) => val === null || (!isNaN(val) && val > 0), {
				message: 'Sell price must be a number greater than 0',
			}),
		discount_value: z
			.string()
			.optional()
			.transform((val) => (val ? Number(val) : null))
			.refine((val) => val === null || !isNaN(val), {
				message: 'Discount value must be a number',
			}),
		discount_type: z.enum(['fixed', 'percentage', 'none']).optional(),

		// variant product fields
		variants: z
			.array(
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
			)
			.optional(),

		// product type
		product_type: z.enum(['single', 'variant'], {
			message: 'Product Type is Required',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.product_type === 'single') {
			// Ensure single product fields are provided for single products
			if (!data.quantity || !data.buy_price || !data.sell_price) {
				ctx.addIssue({
					code: 'custom',
					path: ['quantity'],
					message: 'All fields related to single products must be provided',
				});
			}
		} else if (data.product_type === 'variant') {
			// Ensure variants are provided for variant products
			if (!data.variants || data.variants.length === 0) {
				ctx.addIssue({
					code: 'custom',
					path: ['variants'],
					message: 'At least one variant must be provided for variant products',
				});
			}
		}

		// Check if expire date is after manufacture date
		if (data.expire_date <= data.manufacture_date) {
			ctx.addIssue({
				code: 'invalid_date',
				path: ['expire_date'],
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

			alert_quantity: 1,
			sku: '',
			warranty_id: '',
			expire_date: new Date(),
			manufacture_date: new Date(),

			product_type: 'single',

			// for check single product
			quantity: 0,
			buy_price: 0,
			sell_price: 0,
			discount_type: 'none',
			discount_value: 0,

			// for check variant product
			variants: [{ unit_id: '', variant_id: '', quantity: 0 }],
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

// ---------------------

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
export const productSchema = z
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
export const createZodForm2 = () => {
	const methods = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
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

export type ProductValues = z.infer<typeof productSchema>;
