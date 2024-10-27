'use client';

import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Edit, Store } from '@/lib/features/store';

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
		<PageTitle title="Create Store">
			<PageLink href="/peoples/stores" text="All Store" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Store">
			<PageLink href="/peoples/stores" text="All Store" icon="Anchor" />
		</PageTitle>
		<Edit />
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
