'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { PurchaseType, StatusType } from '@/lib/type';
import { useState } from 'react';

import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';

import {
	SellComponents,
	useGetPosSellHistoryQuery,
} from '@/lib/features/pos-sell';
export default function Page() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } =
		useGetPosSellHistoryQuery(undefined);
	const getSelectedRow = (e: Row<any>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
	};
	return (
		<>
			<PageTitle title="POS Sell" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					{data?.data && (
						<TableBox<any>
							searchColumnName="reference_number"
							columns={SellComponents.Column}
							data={data?.data}
							TFilters={
								<SellComponents.Filter value={value} setValue={setValue} />
							}
							TEndChild={<SellComponents.Add />}
							getSelectedRow={getSelectedRow}
						/>
					)}
				</Motion>
			</ApiUseHOC>
		</>
	);
}
