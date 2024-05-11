import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import {
	ProductColumns,
	ProductData,
	ProductType,
} from '@/lib/table/table-details';

export default function Products() {
	return (
		<>
			<PageTitle title="Low Stocks" />
			<TableBox<ProductType> columns={ProductColumns} data={ProductData} />
		</>
	);
}
