'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetCouponByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError } =
		useGetCouponByIdQuery(slug);

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
