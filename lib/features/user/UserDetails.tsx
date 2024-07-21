'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetUserByIdQuery } from './UserApiSlice';

export function UserDetails({ slug }: { slug: string }) {
	const { data, isLoading, error, isFetching, isError } =
		useGetUserByIdQuery(slug);

	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		>
			details
		</PageDetailsApiHOC>
	);
}
