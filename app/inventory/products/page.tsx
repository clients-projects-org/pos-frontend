import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import {
	ProductColumns,
	ProductData,
	ProductType,
} from '@/lib/table/table-details';
import { TableDemo } from '@/lib/test';

export default function Products() {
	return (
		<>
			<PageTitle title="Products" />

			<TableBox<ProductType> columns={ProductColumns} data={ProductData} />
			{/* <TableDemo /> */}
		</>
	);
}
