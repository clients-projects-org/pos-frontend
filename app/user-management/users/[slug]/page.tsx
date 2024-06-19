import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { UserStore } from '@/components/store';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
	if (params.slug === 'create') {
		/*
			create component
		*/
		return (
			<>
				<PageTitle title={params.slug}>
					<Link
						href={'/user-management/users'}
						className="gap-1 flex items-center"
					>
						<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
						<span className="sr-only sm:not-sr-only !whitespace-nowrap">
							All Users
						</span>
					</Link>
				</PageTitle>
				<UserStore />
			</>
		);
	} else if (params.slug.startsWith('edit-')) {
		/*
 			Edit component
		*/
		return (
			<>
				<PageTitle title="Edit User">
					<Link
						href={'/user-management/users'}
						className="gap-1 flex items-center"
					>
						<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
						<span className="sr-only sm:not-sr-only !whitespace-nowrap">
							All Users
						</span>
					</Link>
				</PageTitle>
				<UserStore />
			</>
		);
	} else {
		/*
 			default all Data
		*/
		return (
			<>
				<PageTitle title={params.slug}>
					<Link
						href={`/user-management/users/edit-${params.slug}`}
						className="gap-1 flex items-center"
					>
						<DynamicIcon icon="SquarePen" className="h-4 w-4 ml-0" />
						<span className="sr-only sm:not-sr-only !whitespace-nowrap">
							Edit User
						</span>
					</Link>
				</PageTitle>
				<div>All Data page</div>
			</>
		);
	}
}
