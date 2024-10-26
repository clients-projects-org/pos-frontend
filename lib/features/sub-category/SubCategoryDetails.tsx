'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetSubCategoryByIdQuery } from './subCategoryApiSlice';

export function SubCategoryDetails({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError, error } =
		useGetSubCategoryByIdQuery(slug);

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
