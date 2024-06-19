import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { UserStore } from '@/components/store';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
	if (params.slug === 'create-role') {
		/*
			create role component
		*/
		return (
			<>
				<PageTitle title="Create Role">
					<Link
						href={'/user-management/roles-permissions'}
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
		/*
			create permission component
		*/
	} else if (params.slug === 'create-permission') {
		return (
			<>
				<PageTitle title="Create Permission">
					<Link
						href={'/user-management/roles-permissions'}
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
	} else if (params.slug.startsWith('edit_role')) {
		/*
 			Edit  Role component
		*/
		return (
			<>
				<PageTitle title="Edit Role">
					<Link
						href={'/user-management/roles-permissions'}
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
	} else if (params.slug.startsWith('edit_permission')) {
		/*
 			Edit  Permission component
		*/
		return (
			<>
				<PageTitle title="Edit Permission">
					<Link
						href={'/user-management/roles-permissions'}
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
	} else if (params.slug.startsWith('role')) {
		/*
 			  role  Data
		*/
		return (
			<>
				<PageTitle title="Role Details">
					<Link
						href={`/user-management/roles-permissions/edit_${params.slug}`}
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
	} else if (params.slug.startsWith('permission')) {
		/*
 			  permission Data
		*/
		return (
			<>
				<PageTitle title="Permission Details">
					<Link
						href={`/user-management/roles-permissions/edit_${params.slug}`}
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
	}
}
