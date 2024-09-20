'use client';
import PageTitle from '@/components/custom/PageTitle';

import { CreateProduct } from '@/lib/features/create-product';

export default function CreateProducts() {
	return (
		<>
			<PageTitle title="Create Product" />
			<CreateProduct />
		</>
	);
}
