import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { CategoryStore, CategoryDetails } from '@/lib/features/category';

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
		<PageTitle title="Create">
			<PageLink href="/inventory/category" text="All Category" icon="Grid" />
		</PageTitle>
		<CategoryStore />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit User">
			<PageLink href="/inventory/category" text="All Category" icon="Grid" />
		</PageTitle>
		<CategoryStore slug={slug} />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="User Details">
			<PageLink
				href={`/inventory/category/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<CategoryDetails slug={slug} />
	</>
);
