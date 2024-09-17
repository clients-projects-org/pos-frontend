import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Edit, Store } from '@/lib/features/customer';

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
		<PageTitle title="Create">
			<PageLink href="/peoples/customers" text="All Customer" icon="Anchor" />
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit Customer">
			<PageLink href="/peoples/customers" text="All Customer" icon="Anchor" />
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Customer Details">
			<PageLink
				href={`/peoples/customers/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
