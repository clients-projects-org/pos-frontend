'use client';
import { DynamicIcon } from '@/components/actions';
import PageTitle, { PageTitleNoBack } from '@/components/custom/PageTitle';
import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useGetRolesQuery } from '@/lib/features/role';

import { UserType } from '@/lib/type';
import Image from 'next/image';
import Link from 'next/link';

export default function RoleAndPermissions() {
	const { data } = useGetRolesQuery();
	console.log(data);
	return (
		<>
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

			{/* permissions */}
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

			{/* permissions  lists*/}

			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{users?.map((user: UserType) => (
					<Link
						key={user.id}
						href={`/user-management/roles-permissions/permissions-${user?.slug}`}
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
