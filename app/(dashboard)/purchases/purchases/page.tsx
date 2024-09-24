'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { ProductType, StatusType } from '@/lib/type';
import { useState } from 'react';

import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import { useGetProductsQuery } from '@/lib/features/create-product';
import { PurchaseComponents } from '@/lib/features/purchases';
export default function Category() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } = useGetProductsQuery(value);
	const getSelectedRow = (e: Row<ProductType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		console.log(ids);
	};
	return (
		<>
			<PageTitle title="Purchases" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<ProductType>
						columns={PurchaseComponents.Column}
						data={data?.data}
						TFilters={
							<PurchaseComponents.Filter value={value} setValue={setValue} />
						}
						TEndChild={<PurchaseComponents.Add />}
						getSelectedRow={getSelectedRow}
					/>
				</Motion>
			</ApiUseHOC>
		</>
	);
}
