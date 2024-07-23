'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { BrandType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import { Components, useGetBrandQuery } from '@/lib/features/brand';
export default function Brand() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetBrandQuery(value);
	const getSelectedRow = (e: Row<BrandType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
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
						TFilters={<Components.Filter value={value} setValue={setValue} />}
						columns={Components.Column}
						data={data?.data}
						TEndChild={<Components.Add />}
						getSelectedRow={getSelectedRow}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
