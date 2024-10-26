import { DevNameType } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
export const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Must be at least 2 characters.',
	}),
	code: z.string().min(4, {
		message: 'Code be at least 4 characters.',
	}),

	status: z.enum(['active', 'deactivated'], {
		message: 'Status is Required',
	}),
});

// store
export const devZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			code: '',
		},
	});

	return { methods };
};

// edit
export const devZodFromEdit = (data: any) => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: data.name,
			status: data.status ?? 'active',
			code: data.code,
		},
	});

	return { methods };
};
