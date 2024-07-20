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
import { useStoreRoleMutation } from '.';
import { useRouter } from 'next/navigation';
import { useGetDevPermissionQuery } from '../dev-permission/devPermissionSlice';
import { DevPermissionType } from '@/lib/type';
import { isEmptyArray } from '@/lib/actions';
export function RoleStore() {
	const router = useRouter();
	const devPermission = useGetDevPermissionQuery('active');

	const FormSchema = z.object({
		name: zod.name,
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
		dev_permission_id: zod.id,
		description: zod.description,
	});

	const methods = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: undefined,
			status: 'active',
			description: undefined,
			image: 'Aperture',
			image_type: 'icon',
			dev_permission_id: undefined,
		},
	});
	const [store, { isLoading }] = useStoreRoleMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		store({ ...data, created_by: 'admin' } as any).then((e) => {
			console.log(e);
			router.push('/user-management/roles-permissions', { scroll: false });

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
							<div className="col-span-8">
								<FormField
									control={methods.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role Name</FormLabel>
											<FormControl>
												<Input placeholder="Role Name" {...field} />
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
									render={({ field }) => {
										console.log(field);
										return (
											<div className="space-y-2">
												<Label className="capitalize  ">Status</Label>
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
						<div className="grid grid-cols-12 gap-3">
							{/* Role  */}
							<div className="col-span-8">
								<FormField
									control={methods.control}
									name="dev_permission_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Role</FormLabel>
											{isEmptyArray(devPermission.data?.data) && (
												<p className="text-sm  text-stone-500">No Item Found</p>
											)}
											{!isEmptyArray(devPermission.data?.data) && (
												<FormControl>
													<Select onValueChange={field.onChange}>
														<SelectTrigger className="capitalize">
															<SelectValue placeholder="Select a Permission" />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																<SelectLabel>Permission All List</SelectLabel>
																{devPermission.data?.data?.map(
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
							<div className="space-y-2 col-span-4  ">
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
								Create Role
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
