import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DynamicIcon } from '@/components/actions';
import Link from 'next/link';

type DataProps = {
	category: Array<any>;
	subCategory: Array<any>;
	brand: Array<any>;
	supplier: Array<any>;
	warehouse: Array<any>;
	store: Array<any>;
};

export function CheckNecessaryData({ data }: { data: DataProps }) {
	const requiredData = [
		{
			key: 'category',
			message: 'You need to add a category',
			link: '/inventory/category',
		},
		{
			key: 'subCategory',
			message: 'You need to add a sub-category',
			link: '/inventory/sub-category',
		},
		{
			key: 'brand',
			message: 'You need to add a brand',
			link: '/inventory/brand',
		},
		{
			key: 'supplier',
			message: 'You need to add a supplier',
			link: '/peoples/suppliers',
		},
		{
			key: 'warehouse',
			message: 'You need to add a warehouse',
			link: '/peoples/warehouses',
		},
		{
			key: 'store',
			message: 'You need to add a store',
			link: '/peoples/stores',
		},
	];

	const missingData = requiredData.filter(
		(item) => data[item.key as keyof DataProps].length === 0
	);

	return (
		<div>
			{missingData.map((item, index) => (
				<Alert key={index} variant="destructive" className="mb-4">
					<DynamicIcon icon="ExclamationTriangleIcon" className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						<Link href={item.link}>{item.message}</Link>
					</AlertDescription>
				</Alert>
			))}
		</div>
	);
}

// Example usage
// const testData = {
//   category: [
//     { _id: '1', name: 'Category 1' },
//     { _id: '2', name: 'Category 2' },
//   ],
//   subCategory: [],
//   brand: [
//     { _id: '1', name: 'Brand 1' },
//   ],
//   supplier: [],
//   warehouse: [],
//   store: [{ _id: '1', name: 'Store 1' }],
// };

// export default function App() {
//   return <CheckNecessaryData data={testData} />;
// }
