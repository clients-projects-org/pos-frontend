import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Store, Edit } from '@/lib/features/warranty';

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
		<PageTitle title="Create Warranty">
			<PageLink
				href="/inventory/warranties"
				text="All Warranty"
				icon="Anchor"
			/>
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Warranty">
			<PageLink
				href="/inventory/warranties"
				text="All Warranty"
				icon="Anchor"
			/>
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Warranty Details">
			<PageLink
				href={`/inventory/warranties/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
