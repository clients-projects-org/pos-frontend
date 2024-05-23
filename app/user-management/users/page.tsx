import PageTitle from '@/components/custom/PageTitle';

import { Switch } from '@/components/ui/switch';
import { UserType } from '@/lib/type';
import { DynamicIcon } from '@/components/actions';
import Image from 'next/image';
import { CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { UserStore } from '@/components/store';
export default function userManagementUser() {
	return (
		<>
			<PageTitle title="Users">
				<UserStore />
			</PageTitle>
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{users?.map((user: UserType) => (
					<Link key={user.id} href={`/user-management/users/${user?.slug}`}>
						<CardContent className="p-0 ">
							<div className=" flex items-center space-x-4 rounded-md border p-4">
								{user?.image?.image_type === 'icon' ? (
									<DynamicIcon icon={user?.image?.image as string} />
								) : (
									<Image
										alt="Product image"
										className="aspect-square rounded-md object-cover"
										height="40"
										src={user?.image?.image as string}
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
		image: {
			image_type: 'image',
			image: 'https://ui.shadcn.com/placeholder.svg',
		},
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
		image: {
			image_type: 'image',
			image: 'https://ui.shadcn.com/placeholder.svg',
		},
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
		image: {
			image_type: 'image',
			image: 'https://ui.shadcn.com/placeholder.svg',
		},
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
		image: {
			image_type: 'image',
			image: 'https://ui.shadcn.com/placeholder.svg',
		},
		name: 'Abdur Shobur',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
];
