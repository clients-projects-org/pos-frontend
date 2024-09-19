'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetBrandByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError, error } =
		useGetBrandByIdQuery(slug);

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
