const data = {
	_id: '67206022e268fbf8d571fafe',
	total_quantity: 1,
	total_price: 20,
	grand_total: 20,
	discount_value: 0,
	discount_type: 'none',
	paid: 0,
	due: 20,
	payment_status: 'due',
	customer: {
		_id: '66e99678fb3ba498387469c4',
		name: 'vendor pro',
		email: 'new@gmsdfail.com',
		phone: '01818321271',
		address: 'asdasd',
	},
	product_details: [
		{
			product_id: {
				_id: '671ef0039a2cb7fbc7a64b53',
				name: 'Product 1',
				sku: 'alkdsfj',
			},
			inventory_id: '67205f24ecc532e7a5934088',
			variant_id: {
				_id: '67074dee2f263739e28e2398',
				name: 'Size',
				attributes: [
					{
						name: 'M',
						_id: '67100db48f36271994e2ef32',
					},
					{
						name: 'L',
						_id: '67100db48f36271994e2ef33',
					},
					{
						name: 'X',
						_id: '67100db48f36271994e2ef34',
					},
				],
			},
			attribute_id: '67100db48f36271994e2ef33',
			quantity: 1,
			sell_price: 20,
			product_price: 20,
			warehouse_id: '66f04005b60ec40c31273d0e',
			store_id: '66ecf524cad56df6f4ab71db',
			product_type: 'variant',
			expire_date: '2024-11-01T18:00:00.000Z',
			manufacture_date: '2024-10-30T18:00:00.000Z',
			discount_value: 0,
			discount_type: 'none',
			_id: '67206022e268fbf8d571faff',
		},
	],
	payment_method: '671ae828eda1720739446865',
	tax: 0,
	created_by: {
		_id: '66e47f8d4ae2d2765e4aac3a',
		email: 'admin@gmail.com',
		phone: 'admin@gmail.com',
		name: 'admin@gmail.com',
	},
	createdAt: '2024-10-29T04:10:10.743Z',
	updatedAt: '2024-10-29T04:10:10.743Z',
	__v: 0,
};

export type InvoiceType = typeof data;
