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
import {
	ImageIcoRadio,
	ImageSelect,
	SelectStatus,
} from '@/components/custom/form';
import { LineLoader } from '@/components/custom/loader';

export function DevPermissionStore() {
	// Define Zod schemas
	const StatusTypeSchema = z.enum(['draft', 'active', 'deactivated']);

	const RouteActionSchema = z.object({
		name: z.string(),
		status: StatusTypeSchema,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
	});

	const DevRouteSchema = z.object({
		name: z.string(),
		status: StatusTypeSchema,
		image: z.string(),
		image_type: z.literal('icon'),
		value: z.boolean(),
		actions: z.array(RouteActionSchema),
	});

	const FormSchema = z.object({
		routes: z.array(DevRouteSchema),
		name: z.string(),
		status: StatusTypeSchema,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			status: 'active',
			routes: [
				{
					id: 1,
					name: '',
					image: '',
					image_type: 'icon',
					status: 'active',
					actions: [
						{
							id: 1,
							image: '',
							image_type: 'icon',
							name: '',
							status: 'active',
							value: false,
						},
					],
					value: false,
				},
			],
		},
	});

	// Define types
	type DevPermissionType = z.infer<typeof FormSchema>;

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	console.log(methods.getValues());
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-12 gap-3">
							<div className="col-span-8">
								<FormField
									control={methods.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Main Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Add Main Title"
													{...field}
													type="text"
													autoComplete="off"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="col-span-4">
								<FormField
									control={methods.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<SelectStatus
													onChange={field.onChange}
													placeholder="Select a Status"
													items="actDeDraft"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<FormField
								control={methods.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role Name</FormLabel>
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
								name="image.image_type"
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
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										{field.value?.image_type === 'image' ? (
											<ImageSelect />
										) : (
											<Suspense fallback={<LineLoader />}>
												<IconSelect />
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
							<Button type="submit">Create User</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
