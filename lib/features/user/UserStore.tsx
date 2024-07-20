'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';

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
import { IconModal, SelectStatus } from '@/components/custom/form';
import { zod } from '@/lib/zod';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { DevPermissionType } from '@/lib/type';
import { isEmptyArray } from '@/lib/actions';
import { useStoreUserMutation } from './UserApiSlice';
import { useGetRolesQuery } from '../role';
export function UserStore() {
	const router = useRouter();
	const roles = useGetRolesQuery('active');

	const FormSchema = z.object({
		name: zod.name,
		email: zod.email,
		role_id: zod.id,
		description: zod.description,
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
		phone: zod.name,
		password: zod.name,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: undefined,
			status: 'active',

			email: undefined,
			phone: undefined,

			password: undefined,
			role_id: undefined,
			image: 'Aperture',
			image_type: 'icon',

			description: undefined,
		},
	});
	const [store, { isLoading }] = useStoreUserMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		store({ ...data, created_by: 'admin' } as any).then((e) => {
			console.log(e);
			router.push('/user-management/users', { scroll: false });

			// router.push('/user-management/roles-permissions', { scroll: false });
			toast({
				title: 'You submitted the following values:',
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(e, null, 2)}</code>
					</pre>
				),
			});
		});
		// toast({
		// 	title: 'You submitted the following values:',
		// 	description: (
		// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
		// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
	}
	console.log(methods.watch());
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<FormField
									control={methods.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>User Name</FormLabel>
											<FormControl>
												<Input placeholder="User Name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<FormField
									control={methods.control}
									name="status"
									render={({ field }) => {
										console.log(field);
										return (
											<div className="space-y-2">
												<Label className="capitalize">Status</Label>
												<SelectStatus
													placeholder="Select a Status"
													items="actDeDraft"
													defaultValue={field.value}
													onChange={(e) => field.onChange(e)}
												/>
											</div>
										);
									}}
								/>
							</div>
						</div>
						{/* Email */}
						<div className="grid grid-cols-2 gap-3">
							<div className=" ">
								<FormField
									control={methods.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email </FormLabel>
											<FormControl>
												<Input placeholder="Email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* Phone */}
							<div className=" ">
								<FormField
									control={methods.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone </FormLabel>
											<FormControl>
												<Input placeholder="Phone" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-3">
							{/* password  */}
							<div className="col-span-6">
								<FormField
									control={methods.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password </FormLabel>
											<FormControl>
												<Input placeholder="Password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* Role  */}
							<div className="col-span-4">
								<FormField
									control={methods.control}
									name="role_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											{isEmptyArray(roles.data?.data) && (
												<p className="text-sm  text-stone-500">No Item Found</p>
											)}
											{!isEmptyArray(roles.data?.data) && (
												<FormControl>
													<Select onValueChange={field.onChange}>
														<SelectTrigger className="capitalize">
															<SelectValue placeholder="Select a Permission" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																<SelectLabel>Permission All List</SelectLabel>
																{roles.data?.data?.map(
																	(dev: DevPermissionType) => (
																		<SelectItem
																			className="capitalize"
																			value={dev._id && dev._id}
																		>
																			{dev.name}
																		</SelectItem>
																	)
																)}
															</SelectGroup>
														</SelectContent>
													</Select>
												</FormControl>
											)}
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* icon  */}
							<div className="space-y-2 col-span-2  ">
								<FormField
									control={methods.control}
									name="image"
									render={({ field }) => (
										<FormItem>
											<Label className="capitalize block mt-2">Icon</Label>
											<FormControl>
												<IconModal
													onSave={(value) => {
														field.onChange(value);
													}}
													defaultValue={field.value}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<FormField
							control={methods.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Type description" {...field} />
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
