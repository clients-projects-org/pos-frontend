import { DevNameType } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
export const FormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Must be at least 2 characters.',
		})
		.trim(),
	code: z.optional(z.string().trim()),
	description: z.optional(z.string().trim()),
	status: zod.status,
});

// store
export const devZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			code: '',
			description: '',
		},
	});

	return { methods };
};

// edit
export const devZodFromEdit = (data: DevNameType) => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: data.name,
			status: data.status,
			code: data.code,
			description: data.description,
		},
	});

	return { methods };
};
