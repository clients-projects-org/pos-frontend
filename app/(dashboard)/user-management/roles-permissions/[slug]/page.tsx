'use client';
import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { RoleStore } from '@/lib/features/dev-permission';
import RoleDetails from '@/lib/features/role/RoleDetails';
import { RoleEdit } from '@/lib/features/role/RoleEdit';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	switch (true) {
		// if create role
		case slug === 'create-role':
			return <CreateRoleComponent />;

		// if edit role
		case slug.startsWith('edit_role'):
			return <EditRoleComponent />;

		// if view role
		case slug.startsWith('role'):
			return <RoleDetailsComponent slug={slug} />;

		// default all
		default:
			return (
				<>
					<PageTitle title="Role & Permission">
						<Link
							href={`/user-management/roles-permissions`}
							className="gap-1 flex items-center"
						>
							<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
							<span className="sr-only sm:not-sr-only !whitespace-nowrap">
								All
							</span>
						</Link>
					</PageTitle>
					<div>Not Found</div>
				</>
			);
	}
}

const CreateRoleComponent = () => (
	<>
		<PageTitle title="Create Role">
			<Link
				href="/user-management/roles-permissions"
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Role
				</span>
			</Link>
		</PageTitle>
		<RoleStore />
	</>
);

const EditRoleComponent = () => (
	<>
		<PageTitle title="Edit Role">
			<Link
				href="/user-management/roles-permissions"
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Role
				</span>
			</Link>
		</PageTitle>
		<RoleEdit />
	</>
);

const RoleDetailsComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Role Details">
			<Link
				href={`/user-management/roles-permissions/edit_${slug}`}
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="SquarePen" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					Edit Role
				</span>
			</Link>
		</PageTitle>
		<RoleDetails slug={slug} />
	</>
);
