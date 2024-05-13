import PageTitle from '@/components/custom/PageTitle';
import { Modal } from '@/components/modal';
import { TableBox } from '@/lib/table';
import {
	categoryColumn,
	categoryData,
} from '@/lib/table/table-details/categroy';

import { CategoryType } from '@/lib/type';

export default function Category() {
	return (
		<>
			<PageTitle title="Warranties" />
			<TableBox<CategoryType> columns={categoryColumn} data={categoryData} />
			<Modal />
		</>
	);
}
