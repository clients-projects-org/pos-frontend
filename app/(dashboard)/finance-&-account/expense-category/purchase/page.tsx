'use client';
import { PageTitleNoBack } from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { PurchaseType, StatusType } from '@/lib/type';
import { useState } from 'react';

import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import {
	PurchasePaymentComponents,
	useGetPurchasePaymentHistoryQuery,
} from '@/lib/features/payment-history';
export default function Page() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } =
		useGetPurchasePaymentHistoryQuery(undefined);
	const getSelectedRow = (e: Row<PurchaseType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
	};
	return (
		<>
			<PageTitleNoBack title="Purchases" />

			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					{data?.data && (
						<TableBox<any>
							searchColumnName="paid_amount"
							columns={PurchasePaymentComponents.Column}
							data={data?.data}
							TFilters={
								<PurchasePaymentComponents.Filter
									value={value}
									setValue={setValue}
								/>
							}
							getSelectedRow={getSelectedRow}
							TEndChild={<div />}
						/>
					)}
				</Motion>
			</ApiUseHOC>
		</>
	);
}
