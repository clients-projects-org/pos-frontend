'use client';
import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { UnitType, StatusType } from '@/lib/type';
import { useState } from 'react';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Row } from '@tanstack/react-table';
import {
	Components,
	useGetPaymentMethodQuery,
} from '@/lib/features/payment-method';
export default function Unit() {
	const [value, setValue] = useState<StatusType | 'all'>('all');
	const { data, isLoading, isFetching, isError } =
		useGetPaymentMethodQuery(value);
	const getSelectedRow = (e: Row<UnitType>[]): void => {
		const ids = e.map((e) => e.original).map((i) => i._id);
		// console\.log\(ids\);
	};
	return (
		<>
			<PageTitle title="Payment Method" />
			<ApiUseHOC
				data={data}
				isFetching={isFetching}
				isLoading={isLoading}
				isError={isError}
			>
				<Motion>
					<TableBox<UnitType>
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
