import PageTitle, { PageLink } from '@/components/custom/PageTitle';
import { Details, Edit, Store } from '@/lib/features/payment-method';

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
		<PageTitle title="Create Payment Method">
			<PageLink
				href="/settings/financial/payment-method"
				text="All Unit"
				icon="Anchor"
			/>
		</PageTitle>
		<Store />
	</>
);

const EditComponent = () => (
	<>
		<PageTitle title="Edit /settings/financial/payment-method">
			<PageLink
				href="/settings/financial/payment-method"
				text="All Unit"
				icon="Anchor"
			/>
		</PageTitle>
		<Edit />
	</>
);

const DefaultComponent = ({ slug }: { slug: string }) => (
	<>
		<PageTitle title="Unit Details">
			<PageLink
				href={`/settings/financial/payment-method/edit-${slug}`}
				text="Edit Category"
				icon="SquarePen"
			/>
		</PageTitle>
		<Details slug={slug} />
	</>
);
