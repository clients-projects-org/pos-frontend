import { RouteType } from '@/lib/type';
import { zod } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// schema
export const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Must be at least 2 characters.',
	}),

	status: zod.status,
});

// store
export const devZodFrom = () => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
		},
	});

	return { methods };
};

// edit
export const devZodFromEdit = (data: RouteType) => {
	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: data.name,
			status: data.status,
		},
	});

	return { methods };
};
