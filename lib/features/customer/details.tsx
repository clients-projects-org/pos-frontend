'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetCustomerByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError, error } =
		useGetCustomerByIdQuery(slug);

	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		>
			asdasd
		</PageDetailsApiHOC>
	);
}
