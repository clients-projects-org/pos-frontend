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

		// email
		email: z.string().email({ message: 'Invalid email address' }),

		// phone
		phone: z
			.string()
			.min(1, 'Phone is Required')
			.max(15, 'Phone must be a maximum 15 characters'),
		// status

		status: z.enum(statusData, {
			message: 'Status is Required',
		}),

		// description
		description: z.string().optional(),

		// address
		address: z.string().optional(),

		// password
		password: z
			.string()
			.min(8, 'The password must be at least 8 characters long')
			.max(32, 'The password must be a maximum 32 characters'),
		// password: z
		//   .string()
		//   .min(8, 'The password must be at least 8 characters long')
		//   .max(32, 'The password must be a maximum 32 characters'),

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
			email: '',
			phone: '',
			password: '',
			image: 'Aperture',
			image_type: 'icon',
			description: '',
			address: '',
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

	// email
	email: z.string().email({ message: 'Invalid email address' }),

	// phone
	phone: z
		.string()
		.min(1, 'Phone is Required')
		.max(15, 'Phone must be a maximum 15 characters'),
	// status

	status: z.enum(statusData, {
		message: 'Status is Required',
	}),

	// description
	description: z.string().optional(),

	// address
	address: z.string().optional(),
});

export const editZodFrom = (data: FormValuesEdit) => {
	const methods = useForm<FormValuesEdit>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: data?.name || '',
			email: data?.email || '',
			phone: data?.phone || '',
			status: data?.status || 'active',
			description: data?.description || '',
			address: data?.address || '',
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				status: data?.status || 'active',
				email: data?.email || '',
				phone: data?.phone || '',
				address: data?.address || '',
				description: data?.description || '',
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
