'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Motion } from '@/components/motion';
import { ApiUseHOC } from '@/components/hoc';
import { DynamicIcon } from '@/components/actions';
import PageTitle, { PageTitleNoBack } from '@/components/custom/PageTitle';
import { CardContent } from '@/components/ui/card';
import { isEmptyArray } from '@/lib/actions';
import {
	DevPermission,
	DevPermissionStoreModal,
} from '@/lib/features/dev-permission';
import { RoleComponents, useGetRolesQuery } from '@/lib/features/role';
import { RoleType, DevNameType, StatusTypeApi } from '@/lib/type';
import {
	DevNameComponents,
	DevNameStoreModal,
	useGetDevNameQuery,
} from '@/lib/features/dev-permission-name';
import { NoItemFound } from '@/components/custom/not-found';
import { useAllSettingsQuery } from '@/lib/features/all-settings';

export default function RoleAndPermissions() {
	const [value, setValue] = useState<StatusTypeApi>('all');
	const [valueRole, setValueRole] = useState<StatusTypeApi>('all');
	const role = useGetRolesQuery(valueRole);
	const devPermissionName = useGetDevNameQuery(value);
	const { data: allSettings } = useAllSettingsQuery();

	return (
		<>
			{/* -----------------------Roles--------------------------------- */}

			{/* roles title*/}
			{!role.isLoading && role.data?.success && (
				<>
					<PageTitle title="Roles">
						<Link
							href={'/user-management/roles-permissions/create-role'}
							className="gap-1 flex items-center"
						>
							<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
							<span className="sr-only sm:not-sr-only !whitespace-nowrap">
								Add Role
							</span>
						</Link>
					</PageTitle>

					{/* --- Role filter ----  */}
					<RoleComponents.Filter value={valueRole} setValue={setValueRole} />
				</>
			)}

			{/* api management  */}
			<ApiUseHOC
				data={role.data}
				isFetching={role.isFetching}
				isLoading={role.isLoading}
				notFound
				loadingBox={3}
			>
				{/* --- Role List ---- */}
				{!isEmptyArray(role.data?.data) && (
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{role.data?.data?.map((data: RoleType) => (
							<Motion key={data._id}>
								<CardContent className="p-0 ">
									<div className="flex items-center space-x-4 rounded-md border p-4">
										<div className="flex-1 space-y-1">
											<Link
												href={`/user-management/roles-permissions/role-${data?._id}`}
											>
												<p className="text-sm font-medium  mb-1 capitalize">
													{data?.name}
												</p>
												<p className="text-sm text-muted-foreground">
													{data?.description}
												</p>
											</Link>
										</div>

										{/* action  */}
										<RoleComponents.Actions data={data} />
									</div>
								</CardContent>
							</Motion>
						))}
					</div>
				)}
			</ApiUseHOC>

			{/* -----------------------dev permission--------------------------------- */}

			{/* permissions title*/}
			{!devPermissionName.isLoading && devPermissionName.data?.success && (
				<>
					<PageTitleNoBack title="Permissions">
						{/* create permission */}
						<DevNameStoreModal />
					</PageTitleNoBack>

					{/* filter  */}
					<DevNameComponents.Filter value={value} setValue={setValue} />
				</>
			)}

			<ApiUseHOC
				data={devPermissionName.data}
				isFetching={devPermissionName.isFetching}
				isLoading={devPermissionName.isLoading}
				notFound
				loadingBox={3}
			>
				{/* --- Permission List ---- */}
				{!isEmptyArray(devPermissionName.data?.data) && (
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
						{devPermissionName.data?.data?.map((dev: DevNameType) => (
							<Motion key={dev._id}>
								<div className="text-gray-900 px-4 py-2  border rounded-lg    dark:text-white">
									<div className=" pb-1 border-b mb-2 text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between">
										{/* permission name  */}
										<p className="capitalize">{dev.name}</p>
										<DevNameComponents.Actions data={dev} />
									</div>
									<div className="pb-1 border-b mb-2">
										{/* route list  */}
										{dev.routes?.map((route) => (
											<div
												key={route._id}
												className="mb-2 text-xs font-semibold text-gray-800 dark:text-gray-400 flex items-center justify-between"
											>
												<p className="capitalize">{route.name}</p>
												<DevPermission.Actions isFor="child" data={route} />
											</div>
										))}
										{isEmptyArray(dev.routes) && <NoItemFound />}
									</div>

									<div className="text-center">
										<DevPermissionStoreModal data={dev} />
									</div>
								</div>
							</Motion>
						))}
					</div>
				)}
			</ApiUseHOC>
		</>
	);
}
