import { DynamicIcon } from '@/components/actions';
import PageTitle from '@/components/custom/PageTitle';
import { UserStore } from '@/lib/features/user';
// import { UserStore } from '@/components/store';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;

	switch (true) {
		// if crete
		case slug === 'create':
			return <CreateComponent />;

		// if edit
		case slug.startsWith('edit-'):
			return <EditComponent />;

		// default all
		default:
			return <DefaultComponent slug={slug} />;
	}
}

const CreateComponent = () => (
	<>
		<PageTitle title="Create">
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

const EditComponent = () => (
	<>
		<PageTitle title="Edit User">
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

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title={slug}>
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
		<div>All Data page</div>
	</>
);
