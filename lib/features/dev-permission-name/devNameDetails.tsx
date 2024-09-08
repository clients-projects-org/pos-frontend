'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetCategoryByIdQuery } from './devNameApiSlice';

export function CategoryDetails({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError } =
		useGetCategoryByIdQuery(slug);

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
