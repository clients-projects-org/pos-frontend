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
	useGetDevPermissionQuery,
} from '@/lib/features/dev-permission';
import { RoleComponents, useGetRolesQuery } from '@/lib/features/role';
import { RoleType, StatusType, DevNameType } from '@/lib/type';
import {
	DevNameComponents,
	DevNameStoreModal,
	useGetDevNameQuery,
} from '@/lib/features/dev-permission-name';
import { NoItemFound } from '@/components/custom/not-found';

export default function RoleAndPermissions() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const [valueRole, setValueRole] = useState<StatusType | 'all'>('all');
	const role = useGetRolesQuery(valueRole);
	const devPermission = useGetDevPermissionQuery(value);
	const devPermissionName = useGetDevNameQuery(value);

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

					{/* role filter  */}
					<RoleComponents.Filter value={valueRole} setValue={setValueRole} />
				</>
			)}

			{/* api management  */}
			<ApiUseHOC
				data={role.data}
				isFetching={role.isFetching}
				isLoading={role.isLoading}
				notFound
			>
				{!isEmptyArray(role.data?.data) && (
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{role.data?.data?.map((data: RoleType) => (
							<Motion key={data._id}>
								<CardContent className="p-0 ">
									<div className="flex items-center space-x-4 rounded-md border p-4">
										<Link href={`/user-management/users/${data?.slug}`}>
											<DynamicIcon icon={data?.image as string} />
										</Link>
										<div className="flex-1 space-y-1">
											<Link href={`/user-management/users/${data?.slug}`}>
												<p className="text-sm font-medium leading-none">
													{data?.name}
												</p>
												<p className="text-sm text-muted-foreground">
													by {data?.role}
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
			{!devPermission.isLoading && devPermission.data?.success && (
				<>
					<PageTitleNoBack title="Permissions">
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
			>
				{!isEmptyArray(devPermissionName.data?.data) && (
					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{devPermissionName.data?.data?.map((dev: DevNameType) => (
							<Motion key={dev._id}>
								<div className="text-gray-900 px-4 py-2  border rounded-lg    dark:text-white">
									<div className=" pb-1 border-b mb-2 text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between">
										<Link
											href={`/user-management/roles-permissions/permission-${dev._id}`}
											className="capitalize"
										>
											{dev.name}
										</Link>
										<DevNameComponents.Actions data={dev} />
									</div>
									<div className="pb-1 border-b mb-2">
										{dev.routes?.map((route) => (
											<div
												key={route._id}
												className="mb-2 text-xs font-semibold text-gray-800 dark:text-gray-400 flex items-center justify-between"
											>
												<Link
													href={`/user-management/roles-permissions/permission-${dev._id}`}
													className="capitalize"
												>
													{route.name}
												</Link>
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
