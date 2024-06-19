import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { UserType } from '@/lib/type';
import Image from 'next/image';
import Link from 'next/link';
export default function userManagementUser() {
	return (
		<>
			<PageTitle title="Users">
				{/* create link  */}
				<Link
					href={'/user-management/users/create'}
					className="gap-1 flex items-center"
				>
					<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
					<span className="sr-only sm:not-sr-only !whitespace-nowrap">
						Add User
					</span>
				</Link>
			</PageTitle>
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{/* loop all users  */}
				{users?.map((user: UserType) => (
					<CardContent key={user.id} className="p-0 ">
						<div className="flex items-center space-x-4 rounded-md border p-4">
							<Link href={`/user-management/users/${user?.slug}`}>
								{user?.image?.image_type === 'icon' ? (
									<DynamicIcon icon={user?.image?.image as string} />
								) : (
									<Image
										alt="User"
										className="aspect-square rounded-md object-cover"
										height="40"
										src={user?.image?.image as string}
										width="40"
									/>
								)}
							</Link>

							<div className="flex-1 space-y-1">
								<Link href={`/user-management/users/${user?.slug}`}>
									<p className="text-sm font-medium leading-none">
										{user?.name}
									</p>
									<p className="text-sm text-muted-foreground">{user?.role}</p>
								</Link>
							</div>
							{/* switch */}
							<Switch checked={user.status === 'active'} />
						</div>
					</CardContent>
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
		status: 'active',
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
		status: 'active',
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
		status: 'active',
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
		status: 'deactivate',
		role: 'admin',
		slug: 'adminsasd423da4',
	},
];
