import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { UserStore } from '@/components/store';
import { DevPermissionStore } from '@/lib/features/dev-permission';
import Link from 'next/link';

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
		<UserStore />
	</>
);

const CreatePermissionComponent = () => (
	<>
		<PageTitle title="Create Permission">
			<Link
				href="/user-management/roles-permissions"
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Permission
				</span>
			</Link>
		</PageTitle>
		<DevPermissionStore />
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
		<UserStore />
	</>
);

const EditPermissionComponent = () => (
	<>
		<PageTitle title="Edit Permission">
			<Link
				href="/user-management/roles-permissions"
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Permission
				</span>
			</Link>
		</PageTitle>
		<UserStore />
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
		<div>All role Data page</div>
	</>
);

const PermissionDetailsComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Permission Details">
			<Link
				href={`/user-management/roles-permissions/edit_${slug}`}
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="SquarePen" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					Edit Permission
				</span>
			</Link>
		</PageTitle>
		<div>All permission Data page</div>
	</>
);

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	switch (true) {
		// if crete role
		case slug === 'create-role':
			return <CreateRoleComponent />;

		// if crete permission
		case slug === 'create-permission':
			return <CreatePermissionComponent />;

		// if edit role
		case slug.startsWith('edit_role'):
			return <EditRoleComponent />;

		// if edit permission
		case slug.startsWith('edit_permission'):
			return <EditPermissionComponent />;

		// if all role
		case slug.startsWith('role'):
			return <RoleDetailsComponent slug={slug} />;

		// if all permission
		case slug.startsWith('permission'):
			return <PermissionDetailsComponent slug={slug} />;

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
