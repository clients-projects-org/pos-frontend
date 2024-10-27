'use client';

import PageTitle from '@/components/custom/PageTitle';

export default function Page({ params }: { params: { slug: string } }) {
	return (
		<>
			<PageTitle title={params.slug} />
		</>
	);
}
