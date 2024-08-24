import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Store } from '@/lib/features/store';

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
			<PageLink href="/peoples/stores" text="All Store" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Edit Store">
			<PageLink href="/peoples/stores" text="All Store" icon="Anchor" />
		</PageTitle>
		<Store slug={slug} />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Store Details">
			<PageLink
				href={`/peoples/stores/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
