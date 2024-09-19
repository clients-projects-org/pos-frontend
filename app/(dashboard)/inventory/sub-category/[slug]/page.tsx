import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { SubCategoryDetails, Store, Edit } from '@/lib/features/sub-category';

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
		<PageTitle title="Create Sub Category">
			<PageLink
				href="/inventory/sub-category"
				text="All Sub Category"
				icon="List"
			/>
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Sub Category">
			<PageLink
				href="/inventory/sub-category"
				text="All Sub Category"
				icon="List"
			/>
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Sub Category Details">
			<PageLink
				href={`/inventory/sub-category/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<SubCategoryDetails slug={slug} />
	</>
);
