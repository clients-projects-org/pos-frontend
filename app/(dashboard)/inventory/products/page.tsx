'use client';

import PageTitle from '@/components/custom/PageTitle';
import { TableBox } from '@/lib/table';
import { ProductColumns, ProductData } from '@/lib/table/table-details';
import { ProductType } from '@/lib/type';
import { CategoryComponents } from '@/lib/features/category';
export default function Products() {
	return (
		<>
			<PageTitle title="Products" />
			{/* <TableBox<ProductType>
				columns={ProductColumns}
				data={ProductData}
				TFilters={CategoryComponents.Filter}
				TEndChild={CategoryComponents.AddCategory}
			/> */}
		</>
	);
}
