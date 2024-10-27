'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { BrandType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { useGetBrandQuery, BrandComponents } from '@/lib/features/brand';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
export default function Brand() {
	const [value, setValue] = useState<StatusType | 'all'>('all');

	const { data, isLoading, isFetching, isError } = useGetBrandQuery(value);

	const getSelectedRow = (e: Row<BrandType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
	};
	return (
		<>
			<PageTitle title="Brand" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<BrandType>
						columns={BrandComponents.Column}
						data={data?.data}
						TFilters={
							<BrandComponents.Filter value={value} setValue={setValue} />
						}
						TEndChild={<BrandComponents.Add />}
						getSelectedRow={getSelectedRow}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
