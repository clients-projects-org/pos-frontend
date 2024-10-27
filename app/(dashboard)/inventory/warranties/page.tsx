'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { WarrantyType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import { Components, useGetWarrantyQuery } from '@/lib/features/warranty';
export default function Warranty() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetWarrantyQuery(value);
	const getSelectedRow = (e: Row<WarrantyType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
	};
	return (
		<>
			<PageTitle title="Warranty" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<WarrantyType>
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
