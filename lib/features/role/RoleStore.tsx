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
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { setPermissions, toggleChild, toggleParent } from './roleSlice';
export function RoleStore() {
	const router = useRouter();
	const devPermission = useGetDevPermissionQuery('active');
	const permissions = useAppSelector((state) => state.role);

	const dispatch = useAppDispatch();

	const handleParentToggle = (parentId: string) => {
		dispatch(toggleParent(parentId));
	};

	const handleChildToggle = (parentId: string, childId: string) => {
		dispatch(toggleChild({ parentId, childId }));
	};

	console.log(permissions);

	useEffect(() => {
		if (devPermission.data) {
			const initialPermissions = devPermission.data.data.reduce((acc, dev) => {
				acc[dev._id] = {
					checked: false,
					children: dev.routes.reduce((childAcc, route) => {
						if (route.status === 'active') {
							childAcc[route._id] = false;
						}
						return childAcc;
					}, {}),
				};
				return acc;
			}, {});

			dispatch(setPermissions(initialPermissions));
		}
	}, [devPermission.data, dispatch]);
	const routeSchema = z.object({
		route_id: zod.id, // Validates route ID
	});

	// Nested schema for dev permissions
	const devPermissionSchema = z.object({
		dev_permission_id: zod.id, // Validates permission ID
		routes: z.array(routeSchema), // Array of routes associated with the permission
	});
	const FormSchema = z.object({
		name: zod.name,
		status: zod.status,
		image: zod.image,
		image_type: zod.image_type,
		dev_permissions: z.array(devPermissionSchema),
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
			// dev_permissions: permissions.map((perm) => ({
			// 	dev_permission_id: perm.dev_permission_id,
			// 	routes: perm.routes.map((routeId) => ({ route_id: routeId })),
			// })),
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
	}

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

						<div className="grid grid-cols-3 gap-4">
							{devPermission.data?.data?.map((dev) => (
								<div
									key={dev._id}
									className="border p-3 shadow space-x-2 space-y-2"
								>
									<Checkbox
										className="scale-125"
										id={dev._id}
										checked={permissions[dev._id]?.checked}
										onCheckedChange={() => handleParentToggle(dev._id)}
									/>
									<label
										htmlFor={dev._id}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{dev.name}
									</label>
									<div className="space-y-6 ps-4">
										{dev.routes?.map((route) =>
											route.status === 'active' ? (
												<div key={route._id} className="space-x-2 space-y-1">
													<Checkbox
														className="scale-125"
														id={route._id}
														checked={permissions[dev._id]?.children[route._id]}
														onCheckedChange={() =>
															handleChildToggle(dev._id, route._id)
														}
													/>
													<label
														htmlFor={route._id}
														className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														{route.name}
													</label>
												</div>
											) : null
										)}
									</div>
								</div>
							))}
						</div>
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
													<div key={route._id} className="space-x-2 space-y-1">
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
						<RFSubmit text="Create Role" />
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
