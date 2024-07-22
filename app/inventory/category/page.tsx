'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { CategoryType, StatusType } from '@/lib/type';
import { useState } from 'react';
import {
	useGetCategoryQuery,
	CategoryComponents,
} from '@/lib/features/category';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
export default function Category() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetCategoryQuery(value);

	return (
		<>
			<PageTitle title="Category" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<CategoryType>
						columns={CategoryComponents.categoryColumn}
						data={data?.data}
						TFilters={
							<CategoryComponents.Filter value={value} setValue={setValue} />
						}
						TEndChild={<CategoryComponents.AddCategory />}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
