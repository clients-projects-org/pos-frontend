import { statusData } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

// schema
export const FormSchema = z.object({
	// product from
	supplier: z.string().min(2, {
		message: `Supplier is Required`,
	}),
	warehouse: z.string().min(2, {
		message: `Warehouse is Required`,
	}),
	store: z.array(
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

	category: z.string().min(2, {
		message: `Category is Required`,
	}),

	sub_category: z.string().min(2, {
		message: `Sub Category is Required`,
	}),

	brand: z.string().min(2, {
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

	// status
	status: zod.status,

	// image
	image: z.instanceof(File),
	gallery_images: z.array(z.instanceof(File)),
});

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			brand: '',
			category: '',
			gallery_images: undefined,
			image: undefined,
			long_description: '',
			sort_description: '',
			sub_category: '',
			supplier: '',
			warehouse: '',
			store: undefined,
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
