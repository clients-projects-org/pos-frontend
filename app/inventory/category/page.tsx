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
import { Row } from '@tanstack/react-table';
export default function Category() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetCategoryQuery(value);
	const getSelectedRow = (e: Row<CategoryType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
	};
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
						getSelectedRow={getSelectedRow}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
