'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetUnitByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError } =
	useGetUnitByIdQuery(slug);

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
