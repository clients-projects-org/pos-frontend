'use client';

import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { UserDetails, UserStore, UserEdit } from '@/lib/features/user';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	switch (true) {
		// if crete
		case slug === 'create':
			return <CreateComponent />;

		// if edit
		case slug.startsWith('edit-'):
			return <EditComponent slug={slug} />;

		// default all
		default:
			return <DefaultComponent slug={slug} />;
	}
}

const CreateComponent = () => (
	<>
		<PageTitle title="Create User">
			<Link href="/user-management/users" className="gap-1 flex items-center">
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Users
				</span>
			</Link>
		</PageTitle>
		<UserStore />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit User">
			<Link href="/user-management/users" className="gap-1 flex items-center">
				<DynamicIcon icon="Users" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					All Users
				</span>
			</Link>
		</PageTitle>
		<UserEdit slug={slug.split('edit-')[1]} />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="User Details">
			<Link
				href={`/user-management/users/edit-${slug}`}
				className="gap-1 flex items-center"
			>
				<DynamicIcon icon="SquarePen" className="h-4 w-4 ml-0" />
				<span className="sr-only sm:not-sr-only !whitespace-nowrap">
					Edit User
				</span>
			</Link>
		</PageTitle>
		<UserDetails slug={slug} />
	</>
);
