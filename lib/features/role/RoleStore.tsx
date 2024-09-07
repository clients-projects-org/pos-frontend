'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';

import { Form } from '@/components/ui/form';
import {
	RFIcon,
	RFInput,
	RFStatus,
	RFSubmit,
	RFTextarea,
} from '@/components/custom/form';
import { zod } from '@/lib/zod';
import { useStoreRoleMutation } from '.';
import { useRouter } from 'next/navigation';
import { useGetDevPermissionQuery } from '../dev-permission/devPermissionSlice';
import { DevPermissionType } from '@/lib/type';
import { Checkbox } from '@/components/ui/checkbox';
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
			name: '',
			status: 'active',
			description: '',
			image: 'Aperture',
			image_type: 'icon',
			dev_permission_id: '',
		},
	});
	const [store, { isLoading }] = useStoreRoleMutation();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		store({ ...data, created_by: 'admin' } as any).then((e) => {
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
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-7 gap-3">
							<div className="col-span-4 ">
								<RFInput
									label="Role Name"
									methods={methods}
									name="name"
									placeholder="Role Name"
								/>
							</div>
							<div className="col-span-2 ">
								<RFStatus methods={methods} name="status" />
							</div>

							<div className="space-y-2 col-span-1">
								<RFIcon methods={methods} />
							</div>
						</div>
						<RFTextarea methods={methods} />

						<div>
							<div className="grid grid-cols-3 gap-4">
								{devPermission.data?.data?.map((dev: DevPermissionType) => (
									<div
										key={dev._id}
										className="border p-3 shadow space-x-2 space-y-2"
									>
										<Checkbox className="scale-125" id={dev._id} />
										<label
											htmlFor={dev._id}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{dev.name}
										</label>
										<div className="space-y-6 ps-4">
											{dev.routes?.map(
												(route) =>
													route.status === 'active' && (
														<div
															key={route._id}
															className="space-x-2 space-y-1"
														>
															<Checkbox className="scale-125" id={route._id} />
															<label
																htmlFor={route._id}
																className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
															>
																{route.name}
															</label>
														</div>
													)
											)}
										</div>
									</div>
								))}
							</div>
						</div>
						<RFSubmit text="Create Role" />
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
