'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetPaymentMethodByIdQuery } from './apiSlice';

export function Details({ slug }: { slug: string }) {
	const { data, error, isLoading, isFetching, isError } =
		useGetPaymentMethodByIdQuery(slug);

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
