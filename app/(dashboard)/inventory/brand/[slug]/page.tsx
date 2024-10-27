'use client';

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
			return <EditComponent />;

		// default all
		default:
			return <DefaultComponent slug={slug} />;
	}
}

const CreateComponent = () => (
	<>
		<PageTitle title="Create Brand">
			<PageLink href="/inventory/brand" text="All Brand" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Brand">
			<PageLink href="/inventory/brand" text="All Brand" icon="Anchor" />
		</PageTitle>
		<Store />
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
