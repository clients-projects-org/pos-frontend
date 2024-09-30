export * from './check-necessary-data';
export * from './components';
export * from './purchaseApiSlice';
export * from './purchase.select-product';

type purchase = {
	supplier_id: string;
};

const data = {
	supplier_id: 46,
	chalan_no: '22721',
	purchase_date: '23-08-2024',
	payment_id: 1,
	paid_amount: '1000.00',
	total_price: '1000.00',
	due_amount: '0.00',
	purchase_discount: '0.00',
	total_qty: 10,
	note: null,
	status: 'received',
	created_at: '2024-08-23T11:41:11.000000Z',
	updated_at: '2024-08-23T11:41:11.000000Z',
	payment_status: 'paid',
	return_qty: 0,
	return_amount: '0.00',
	return_date: null,
	vendor_id: 2,
	purchase_details: [
		{
			id: 11,
			product_purchase_id: 8,
			product_id: 130,
			unit_id: 22,
			qty: 10,
			rate: '100.00',
			sub_total: '1000.00',
			product: {
				id: 130,
				name: 'ভাত নাই',
			},
			unit: {
				id: 22,
				name: 'PCS',
			},
		},
	],
	supplier: {
		id: 46,
		name: 'Sayed',
	},
};
