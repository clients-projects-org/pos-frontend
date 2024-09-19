import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Edit, Store } from '@/lib/features/warehouse';

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
		<PageTitle title="Create Warehouse">
			<PageLink href="/peoples/warehouses" text="All Warehouse" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Warehouse">
			<PageLink href="/peoples/warehouses" text="All Warehouse" icon="Anchor" />
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Warehouse Details">
			<PageLink
				href={`/peoples/warehouses/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
