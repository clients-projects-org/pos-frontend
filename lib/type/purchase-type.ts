export type PurchaseType = {
	_id: string;
	product_ids: string[];
	purchase_date: string;
	reference_number: string;
	purchase_status: string;
	discount_type: string;
	discount_value: number;
	tax: number;
	shipping_cost: number;
	paid_amount: number;
	sub_total: number;
	total_after_discount: number;
	grand_total: number;
	due_amount: number;
	payment_method: string;
	payment_status: 'paid' | 'due';
	description: string;
	created_by: string;
	createdAt: string;
	sr: number;
	supplier_data: {
		_id: string;
		name: string;
		business_name: string;
	};
	createdBy: {
		_id: string;
		name: string;
	};
	products: {
		product_id: string;
		quantity: number;
		warehouse_id: string;
		store_id: string;
		product_type: string;
		variants: {
			variant_id: string;
			quantity: number;
			rate: number;
			_id: string;
		}[];
		_id: string;
	}[];
};
