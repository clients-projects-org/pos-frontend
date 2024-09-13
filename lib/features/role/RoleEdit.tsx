'use client';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';

import { Form } from '@/components/ui/form';
import {
	RFInput,
	RFStatus,
	RFSubmit,
	RFTextarea,
} from '@/components/custom/form';
import { useGetRoleByIdQuery, useUpdateRoleMutation } from '.';
import { useParams, useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetDevNameQuery } from '../dev-permission-name';
import { DevNameType, RouteType } from '@/lib/type';
import { useEffect } from 'react';
import {
	getCheckedRoutes,
	setEditPermissions,
	toggleChild,
	toggleParent,
} from './roleSlice';
import { FormSchema, useEditZodFrom } from './role.zod';
import { PageDetailsApiHOC } from '@/components/hoc';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export function RoleEdit() {
	const param = useParams();
	const router = useRouter();
	const devPermissionName = useGetDevNameQuery('active');
	const { data: roleDetails, isLoading: isLoadingRole } = useGetRoleByIdQuery(
		(param.slug as string).split('-')[1],
		{
			skip: !param.slug,
		}
	);

	const dispatch = useAppDispatch();
	const permissions = useAppSelector((state) => state.role);
	const checked = getCheckedRoutes(permissions.data);
	const handleParentToggle = (devId: string) => {
		dispatch(toggleParent(devId));
	};

	const handleChildToggle = (devId: string, routeId: string) => {
		dispatch(toggleChild({ devId, routeId }));
	};

	useEffect(() => {
		if (devPermissionName.data && roleDetails?.data) {
			dispatch(
				setEditPermissions({
					permissionData: devPermissionName.data?.data,
					roleData: roleDetails?.data?.permissions,
				})
			);
		}
	}, [devPermissionName.data, dispatch, roleDetails?.data]);

	const { methods } = useEditZodFrom(roleDetails?.data);

	const [store, { isLoading }] = useUpdateRoleMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const submitData = {
			name: data.name,
			status: data.status,
			description: data.description || '',
			permissions: checked.map((e) => ({
				permission_id: e._id,
				parent_id: e.parent_id,
			})),
		};

		try {
			const response = await store({
				id: roleDetails?.data?._id,
				payload: submitData,
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/user-management/roles-permissions');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}

	return (
		<PageDetailsApiHOC
			data={devPermissionName.data}
			isError={devPermissionName.isError}
			isLoading={devPermissionName.isLoading || isLoadingRole}
			isFetching={devPermissionName.isFetching || isLoading}
		>
			<div className="max-w-5xl mx-auto w-full border p-4 rounded">
				<FormProvider {...methods}>
					<Form {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className="space-y-3"
						>
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
							</div>

							<div className="grid grid-cols-3 gap-4">
								{permissions.data?.map((dev: DevNameType) => (
									<div
										key={dev._id}
										className="border p-3 shadow space-x-2 space-y-2"
									>
										<Checkbox
											className="scale-125"
											id={dev._id}
											checked={dev.checked}
											onCheckedChange={() =>
												dev._id && handleParentToggle(dev._id)
											}
										/>
										<label
											htmlFor={dev._id}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{dev.name}
										</label>
										<div className="space-y-2 ps-4">
											{dev.routes?.map((route: RouteType) =>
												route.status === 'active' ? (
													<div key={route._id} className="space-x-2 space-y-1">
														<Checkbox
															className="scale-125"
															id={route._id}
															checked={route.checked}
															onCheckedChange={() =>
																dev._id &&
																route._id &&
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

							<div>
								<RFTextarea methods={methods} />
							</div>

							<div className="flex justify-end gap-3">
								<Link href="/user-management/roles-permissions">
									<Button
										disabled={isLoading}
										variant="destructive"
										type="button"
									>
										Cancel
									</Button>
								</Link>
								<RFSubmit
									text={`${isLoading ? 'Updating...' : 'Update Role'}`}
									isLoading={isLoading}
								/>
							</div>
						</form>
					</Form>
				</FormProvider>
			</div>
		</PageDetailsApiHOC>
	);
}
