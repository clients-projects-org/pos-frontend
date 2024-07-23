import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Warehouse } from '@/lib/features/warehouse';

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
			<PageLink href="/peoples/warehouses" text="All Warehouse" icon="Anchor" />
		</PageTitle>
		<Warehouse />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit Warehouse">
			<PageLink href="/peoples/warehouses" text="All Warehouse" icon="Anchor" />
		</PageTitle>
		<Warehouse slug={slug} />
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
