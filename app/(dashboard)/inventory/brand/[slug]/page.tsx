import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Store } from '@/lib/features/brand';

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
			<PageLink href="/inventory/brand" text="All Brand" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit Brand">
			<PageLink href="/inventory/brand" text="All Brand" icon="Anchor" />
		</PageTitle>
		<Store slug={slug} />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Brand Details">
			<PageLink
				href={`/inventory/brand/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
