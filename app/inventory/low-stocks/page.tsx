import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { ProductColumns, ProductData } from '@/lib/table/table-details';
import { ProductType } from '@/lib/type';

export default function Products() {
	return (
		<>
			<PageTitle title="Low Stocks" />
			<TableBox<ProductType> columns={ProductColumns} data={ProductData} />
		</>
	);
}
