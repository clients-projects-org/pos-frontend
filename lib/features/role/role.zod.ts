import { DevNameType } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
export const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Must be at least 2 characters.',
	}),
	description: z.optional(z.string()),
	status: z.enum(['active', 'deactivated'], {
		message: 'Status is Required',
	}),
});

// store
export const createZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			description: '',
		},
	});

	return { methods };
};

// edit
export const useEditZodFrom = (data: any) => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
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
