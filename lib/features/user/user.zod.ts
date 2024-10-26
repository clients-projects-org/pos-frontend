import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

// schema
export const FormSchema = z
	.object({
		name: z.string().min(2, {
			message: 'Name is required',
		}),
		email: z.string().email({
			message: 'Email is required.',
		}),
		phone: z
			.string()
			.max(15, 'Phone must be a maximum 15 characters')
			.optional(),

		role_id: z.string().min(1, {
			message: `Role is Required.`,
		}),
		description: z.string().optional(),
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
		password: z
			.string()
			.min(8, 'The password must be at least 8 characters long')
			.max(32, 'The password must be a maximum 32 characters'),
	})
	.refine((data) => zod.refined(data, data.image), zod.refinedImageMessage);

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			email: '',
			phone: '',
			password: '',
			role_id: '',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
		},
	});

	return { methods };
};

/* edit need another for password =============

*/

export type FormValuesEdit = z.infer<typeof FormSchemaEdit>;

// schema
export const FormSchemaEdit = z
	.object({
		name: z.string().min(2, {
			message: 'Name is required',
		}),
		email: z.string().email({
			message: 'Email is required.',
		}),
		phone: z
			.string()
			.max(15, 'Phone must be a maximum 15 characters')
			.optional(),

		role_id: z.string().min(1, {
			message: `Role is Required.`,
		}),
		description: z.string().optional(),
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
	})
	.refine((data) => zod.refined(data, data.image), zod.refinedImageMessage);

export const editZodFrom = (data: any) => {
	const methods = useForm<any>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: data?.name || '',
			status: data?.status || 'active',
			email: data?.email || '',
			phone: data?.phone || '',
			role_id: data?.role_id || '',
			image: data?.image || 'Aperture',
			image_type: data?.image_type || 'icon',
			description: data?.description || '',
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				status: data?.status || 'active',
				email: data?.email || '',
				phone: data?.phone || '',
				role_id: data?.role_id || '',
				image: data?.image || 'Aperture',
				image_type: data?.image_type || 'icon',
				description: data?.description || '',
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
