import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Store, Edit, CategoryDetails } from '@/lib/features/category';

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
		<PageTitle title="Create Category">
			<PageLink href="/inventory/category" text="All Category" icon="Grid" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Category">
			<PageLink href="/inventory/category" text="All Category" icon="Grid" />
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Category Details">
			<PageLink
				href={`/inventory/category/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<CategoryDetails slug={slug} />
	</>
);
