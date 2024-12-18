'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Suspense, lazy } from 'react';

// Lazy load the IconSelect component
const IconSelect = lazy(
	() => import('@/components/custom/form/ImageIcoSelect')
);

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ImageIcoRadio, ImageSelect } from '@/components/custom/form';
import { LineLoader } from '@/components/custom/loader';
export function UserStore() {
	const FormSchema = z.object({
		name: z.string().min(2, {
			message: 'Username must be at least 2 characters.',
		}),
		email: z.string().email({
			message: 'Invalid email address.',
		}),
		description: z.string().min(2, {
			message: 'Description must be at least 2 characters.',
		}),
		role: z.string(), // assuming role is a string, if it's an object, update accordingly
		image: z.string({
			message: 'Invalid image URL.',
		}),
		image_type: z.enum(['image', 'icon']),
		code: z.string().optional(),
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			description: '',
			email: '',
			role: '',
			image: '',
			image_type: 'image',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	// const methods = useForm();
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<FormField
								control={methods.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>User Name</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>User Email</FormLabel>
										<FormControl>
											<Input placeholder="shadcn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange}>
												<SelectTrigger>
													<SelectValue placeholder="Select a Role" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Fruits</SelectLabel>
														<SelectItem value="apple">Apple</SelectItem>
														<SelectItem value="banana">Banana</SelectItem>
														<SelectItem value="blueberry">Blueberry</SelectItem>
														<SelectItem value="grapes">Grapes</SelectItem>
														<SelectItem value="pineapple">Pineapple</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={methods.control}
								name="image_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Image or Icon</FormLabel>
										<FormControl>
											<ImageIcoRadio {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={methods.control}
							name="image_type"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										{field.value === 'image' ? (
											<ImageSelect onChange={() => {}} />
										) : (
											<Suspense fallback={<LineLoader />}>
												<IconSelect setValue={() => {}} value="" />
											</Suspense>
										)}
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={methods.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end">
							<Button
								variant="outline"
								className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600"
								type="submit"
							>
								Create User
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
