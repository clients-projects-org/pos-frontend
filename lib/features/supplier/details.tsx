'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetSupplierByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError } =
		useGetSupplierByIdQuery(slug);

	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
		>
			asdasd
		</PageDetailsApiHOC>
	);
}
