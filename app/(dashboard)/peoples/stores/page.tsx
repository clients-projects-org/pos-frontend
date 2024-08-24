'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { StoreType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import { Components, useGetStoreQuery } from '@/lib/features/store';
export default function Store() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetStoreQuery(value);
	const getSelectedRow = (e: Row<StoreType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
	};
	return (
		<>
			<PageTitle title="Store" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<StoreType>
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
