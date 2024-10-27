'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { CategoryType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import {
	SubCategoryComponents,
	useGetSubCategoryQuery,
} from '@/lib/features/sub-category';
export default function SubCategory() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } =
		useGetSubCategoryQuery(value);
	const getSelectedRow = (e: Row<CategoryType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
	};
	return (
		<>
			<PageTitle title="Sub Category" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<CategoryType>
						TFilters={
							<SubCategoryComponents.Filter value={value} setValue={setValue} />
						}
						columns={SubCategoryComponents.categoryColumn}
						data={data?.data}
						TEndChild={<SubCategoryComponents.AddCategory />}
						getSelectedRow={getSelectedRow}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
