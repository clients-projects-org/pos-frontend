'use client';
import { DynamicIcon } from '@/components/actions';
import {
	DropDownDotItem,
	DropDownThreeDot,
	ListItem,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { LineLoader } from '@/components/custom/loader';
import { ApiError } from '@/components/custom/notifications';
import PageTitle, { PageTitleNoBack } from '@/components/custom/PageTitle';
import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { isEmptyArray } from '@/lib/actions';
import { useGetDevPermissionQuery } from '@/lib/features/dev-permission';
import { useGetRolesQuery } from '@/lib/features/role';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DevPermissionType, DevRouteType, UserType } from '@/lib/type';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function RoleAndPermissions() {
	const { data } = useGetRolesQuery();
	const devPermission = useGetDevPermissionQuery();
	console.log(devPermission);
	return (
		<>
			<div>
				{/* roles  */}
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

				{/* filter  */}
				<div className="mt-2">
					<TabList>
						<TabListItem name="All" onClick={() => {}} active count={10} />
						<TabListItem name="Active" onClick={() => {}} />
						<TabListItem name="Deactivated" onClick={() => {}} />
						<TabListItem name="Draft" onClick={() => {}} />
					</TabList>
				</div>
			</div>

			{/* roles lists  */}
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{users?.map((user: UserType) => (
					<Link
						key={user.id}
						href={`/user-management/roles-permissions/role-${user?.slug}`}
					>
						<CardContent className="p-0 ">
							<div className="flex items-center space-x-4 rounded-md border p-4">
								{user?.image === 'icon' ? (
									<DynamicIcon icon={user?.image as string} />
								) : (
									<Image
										alt="Product image"
										className="aspect-square rounded-md object-cover"
										height="40"
										src={user?.image as string}
										width="40"
									/>
								)}

								<div className="flex-1 space-y-1">
									<p className="text-sm font-medium leading-none">
										{user?.name}
									</p>
									<p className="text-sm text-muted-foreground">{user?.role}</p>
								</div>
								<Switch checked={true} />
							</div>
						</CardContent>
					</Link>
				))}
			</div>

			{/* check api for error dev permission  */}
			{!devPermission.isLoading && <ApiError data={devPermission.data} />}

			{/* is loading  dev permission */}
			{devPermission.isLoading && <LineLoader />}

			{/* permissions */}
			{!devPermission.isLoading && devPermission.data?.success && (
				<>
					<div>
						<PageTitleNoBack title="Permissions">
							<Link
								href={'/user-management/roles-permissions/create-permission'}
								className="gap-1 flex items-center"
							>
								<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
								<span className="sr-only sm:not-sr-only !whitespace-nowrap">
									Add Permissions
								</span>
							</Link>
						</PageTitleNoBack>

						{/* filter  */}
						<div className="mt-2">
							<TabList>
								<TabListItem
									name="All"
									onClick={() => {
										alert('all');
									}}
									active
								/>
								<TabListItem name="Active" onClick={() => {}} />
								<TabListItem name="Deactivated" onClick={() => {}} />
								<TabListItem name="Draft" onClick={() => {}} />
							</TabList>
						</div>
					</div>
					{/* permissions  lists*/}

					<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{devPermission.data?.data?.map((dev: DevPermissionType) => (
							<div
								key={dev.slug}
								className="text-gray-900 px-4 py-2  border border-gray-200 rounded-lg   dark:border-gray-600 dark:text-white"
							>
								<div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-between">
									<span>{dev.name}</span>
									<div className="ml-auto flex items-center gap-2">
										<Badge className="text-xs">Badge</Badge>
										<DropDownThreeDot>
											<DropDownDotItem
												icon="SquarePen"
												name="Edit"
												onChange={() => {
													alert('edit');
												}}
											/>
											<DropDownDotItem
												icon="ScanEye"
												name="View"
												onChange={() => {}}
											/>
											<DropdownMenuSeparator />
											<DropDownDotItem
												icon="CircleCheckBig"
												name="Active"
												onChange={() => {}}
											/>
											<DropDownDotItem
												icon="CircleSlash2"
												name="Disable"
												onChange={() => {}}
											/>
											<DropDownDotItem
												icon="Trash2"
												name="Delete"
												onChange={() => {}}
											/>
										</DropDownThreeDot>
									</div>
									{/* <Switch checked={dev.status && dev.status === 'active'} /> */}
								</div>

								{isEmptyArray(dev.routes) && (
									<p className="text-sm  text-stone-500">No Routes</p>
								)}

								{dev.routes?.map((route: DevRouteType) => (
									<ListItem key={route.slug} data={route} />
								))}
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}

const users: UserType[] = [
	{
		id: '66482b8dbc443d6b1ec88693s',
		code: 'adminsasd423da4',
		created_at: '2024-05-18T04:16:13.111Z',
		description: 'admin',
		email: 'abdurshobur.developer@gmail.com',
		image_type: 'image',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Abdur Shobur',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
	{
		id: '66482b8dbc443d6b1eca88693',
		code: 'adminsasd423da4',
		created_at: '2024-05-18T04:16:13.111Z',
		description: 'admin',
		email: 'abdurshobur.developer@gmail.com',
		image_type: 'image',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Abdur Shobur',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
	{
		id: '66482b8dbsc443d6b1ec88693',
		code: 'adminsasd423da4',
		created_at: '2024-05-18T04:16:13.111Z',
		description: 'admin',
		email: 'abdurshobur.developer@gmail.com',
		image_type: 'image',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Abdur Shobur',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
	{
		id: '66482b8dbc443ds6b1ec88693',
		code: 'adminsasd423da4',
		created_at: '2024-05-18T04:16:13.111Z',
		description: 'admin',
		email: 'abdurshobur.developer@gmail.com',
		image_type: 'image',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Abdur Shobur',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
];
