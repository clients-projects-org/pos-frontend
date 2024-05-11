import PageTitle from '@/components/custom/PageTitle';
import { Modal } from '@/components/modal';
import { TableBox } from '@/lib/table';
import {
	ProductColumns,
	ProductData,
	ProductType,
} from '@/lib/table/table-details';

export default function Category() {
	return (
		<>
			<PageTitle title="Category" />
			<TableBox<ProductType> columns={ProductColumns} data={ProductData} />
			<Modal />
		</>
	);
}
