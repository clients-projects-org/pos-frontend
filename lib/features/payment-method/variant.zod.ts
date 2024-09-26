import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof FormSchema>;

// schema
export const FormSchema = z.object({
	// name
	name: z
		.string()
		.min(2, {
			message: `Name is Required`,
		})
		.max(100, 'Name must be a maximum 100 characters'),

	status: zod.status,

	description: z.string().optional(),

	url: z.string().max(100, 'Url must be a maximum 100 characters').optional(),
});

// store
export const createZodFrom = () => {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			url: '',
			description: '',
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
		.max(100, 'Name must be a maximum 100 characters'),

	status: zod.status,

	description: z.string().optional(),

	url: z.string().max(100, 'Url must be a maximum 100 characters').optional(),
});

export const editZodFrom = (data: FormValuesEdit) => {
	const methods = useForm<FormValuesEdit>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: data?.name || '',
			status: data?.status || 'active',
			description: data?.description || '',
			url: data?.url || '',
		},
	});

	useEffect(() => {
		if (data) {
			methods.reset({
				name: data?.name || '',
				status: data?.status || 'active',
				description: data?.description || '',
				url: data?.url || '',
			});
		}
	}, [data, methods.reset]);

	return { methods };
};
