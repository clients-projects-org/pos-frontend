import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import {
	SubCategoryDetails,
	SubCategoryStore,
} from '@/lib/features/sub-category';

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
			<PageLink
				href="/inventory/sub-category"
				text="All Sub Category"
				icon="List"
			/>
		</PageTitle>
		<SubCategoryStore />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit User">
			<PageLink
				href="/inventory/sub-category"
				text="All Sub Category"
				icon="List"
			/>
		</PageTitle>
		<SubCategoryStore slug={slug} />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="User Details">
			<PageLink
				href={`/inventory/sub-category/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<SubCategoryDetails slug={slug} />
	</>
);
