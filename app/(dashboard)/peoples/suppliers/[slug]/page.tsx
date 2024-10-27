'use client';

import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Edit, Store } from '@/lib/features/supplier';

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
		<PageTitle title="Create Supplier">
			<PageLink href="/peoples/suppliers" text="All Supplier" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Supplier">
			<PageLink href="/peoples/suppliers" text="All Supplier" icon="Anchor" />
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Supplier Details">
			<PageLink
				href={`/peoples/suppliers/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
