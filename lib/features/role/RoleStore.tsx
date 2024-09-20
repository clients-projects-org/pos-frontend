'use client';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import {
	RFInput,
	RFStatus,
	RFSubmit,
	RFTextarea,
} from '@/components/custom/form';
import { useStoreRoleMutation } from '.';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetDevNameQuery } from '../dev-permission-name';
import { DevNameType, RouteType } from '@/lib/type';
import { useEffect } from 'react';
import {
	getCheckedRoutes,
	getCheckedSidebars,
	setPermissions,
	toggleChild,
	toggleChildChildrenSidebar,
	toggleChildSidebar,
	toggleParent,
	toggleParentSidebar,
} from './roleSlice';
import { createZodFrom, FormSchema } from './role.zod';
import { PageDetailsApiHOC } from '@/components/hoc';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetSidebarQuery } from '../sidebar/apiSlice';
export function RoleStore() {
	const router = useRouter();
	const sidebarData = useGetSidebarQuery();
	// state
	const dispatch = useAppDispatch();
	const permissions = useAppSelector((state) => state.role);
	// get all permissions that is in dev name api
	const devPermissionName = useGetDevNameQuery('active');

	// all checked true data
	const checked = getCheckedRoutes(permissions.data);
	const checkedSidebar = getCheckedSidebars(permissions.sidebarData);
	// handler for toggle parent name
	const handleParentToggle = (devId: string) => {
		dispatch(toggleParent(devId));
	};

	// handler for toggle child item
	const handleChildToggle = (devId: string, routeId: string) => {
		dispatch(toggleChild({ devId, routeId }));
	};

	useEffect(() => {
		// set data in redux store
		if (devPermissionName.data && sidebarData.data) {
			dispatch(
				setPermissions({
					data: devPermissionName.data.data,
					sidebarData: sidebarData.data.data,
				})
			);
		}
	}, [devPermissionName.data, dispatch, sidebarData?.data]);

	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreRoleMutation();

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const submitData = {
			name: data.name,
			status: data.status,
			description: data.description || '',
			permissions: checked.map((e) => ({
				permission_id: e._id,
				parent_id: e.parent_id,
				code: e.code,
			})),
			sidebars: checkedSidebar,
		};
		try {
			const response = await store({
				...submitData,
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/user-management/roles-permissions');
			router.refresh();
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}

	return (
		<PageDetailsApiHOC
			data={devPermissionName.data}
			isError={devPermissionName.isError}
			isLoading={devPermissionName.isLoading}
			isFetching={devPermissionName.isFetching || isLoading}
			error={devPermissionName.error}
		>
			<div className=" w-full border p-4 rounded">
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

							<div>
								<p className="mt-5 text-lg">All Permissions</p>
							</div>

							<div className="grid grid-cols-5 gap-4">
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
								<p className="mt-5 text-lg">Sidebar Permissions</p>
							</div>

							<div className="grid grid-cols-5 gap-4">
								{permissions.sidebarData?.map((dev) => (
									<div
										key={dev._id}
										className="border p-3 shadow space-x-2 space-y-2"
									>
										<div className="flex justify-between items-center">
											<div className="flex items-center gap-2">
												<Checkbox
													className="scale-125"
													id={dev._id}
													checked={dev.checked}
													onCheckedChange={() =>
														dev._id &&
														dispatch(
															toggleParentSidebar({
																devId: dev._id,
																type: 'single',
															})
														)
													}
												/>
												<label
													htmlFor={dev._id}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{dev.title}
												</label>
											</div>
											<div className="flex items-center gap-2">
												<Checkbox
													className="scale-125"
													id={dev._id + 'All'}
													checked={dev.show}
													onCheckedChange={() =>
														dev._id &&
														dispatch(
															toggleParentSidebar({
																devId: dev._id,
																type: 'all',
															})
														)
													}
												/>
												<label
													htmlFor={dev._id + 'All'}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													All
												</label>
											</div>
										</div>

										<div className="space-y-2 ps-4">
											{dev.sidebarChildren?.map((route) =>
												route.show ? (
													<div key={route._id} className="space-x-2 space-y-1">
														<Checkbox
															className="scale-125"
															id={route._id}
															checked={route.checked}
															onCheckedChange={() =>
																dev._id &&
																route._id &&
																dispatch(
																	toggleChildSidebar({
																		devId: dev._id,
																		routeId: route._id,
																	})
																)
															}
														/>
														<label
															htmlFor={route._id}
															className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														>
															{route.name}
														</label>

														<div className="space-y-2 ps-4">
															{route.children?.map((child) =>
																route.show ? (
																	<div
																		key={child._id}
																		className="space-x-2 space-y-1"
																	>
																		<Checkbox
																			className="scale-125"
																			id={route._id}
																			checked={child.checked}
																			onCheckedChange={() =>
																				dev._id &&
																				route._id &&
																				child._id &&
																				dispatch(
																					toggleChildChildrenSidebar({
																						devId: dev._id,
																						routeId: route._id,
																						childId: child._id,
																					})
																				)
																			}
																		/>
																		<label
																			htmlFor={route._id}
																			className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
																		>
																			{child.name}
																		</label>
																	</div>
																) : null
															)}
														</div>
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
								<Button disabled={isLoading} variant="default" type="submit">
									{isLoading ? 'Creating...' : 'Create Role'}
								</Button>
							</div>
						</form>
					</Form>
				</FormProvider>
			</div>
		</PageDetailsApiHOC>
	);
}
