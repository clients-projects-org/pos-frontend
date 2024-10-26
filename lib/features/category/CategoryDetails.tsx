'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetCategoryByIdQuery } from './categoryApiSlice';

export function CategoryDetails({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError, error } =
		useGetCategoryByIdQuery(slug);

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
