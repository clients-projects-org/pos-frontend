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
		// name
		name: z
			.string()
			.min(2, {
				message: `Name is Required`,
			})
			.max(32, 'Name must be a maximum 32 characters'),

		// short_name
		short_name: z
			.string()
			.min(1, {
				message: `Short Name is Required`,
			})
			.max(32, 'Short Name must be a maximum 32 characters'),

		// status
		status: zod.status,

		// description
		description: z.string().optional(),

		// image
		image: zod.image,
		image_type: zod.image_type,

		// image_type
	})
	.refine((data) => zod.refined(data, data.image), zod.refinedImageMessage);

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
			short_name: '',
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

	// short_name
	short_name: z
		.string()
		.min(1, {
			message: `Short Name is Required`,
		})
		.max(32, 'Short Name must be a maximum 32 characters'),

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
			short_name: data?.short_name || '',
			status: data?.status || 'active',
			description: data?.description || '',
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				short_name: data?.short_name || '',
				status: data?.status || 'active',
				description: data?.description || '',
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
