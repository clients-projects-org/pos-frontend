import { DiscountType, StatusType } from '@/lib/type';

export type ProductVariant = {
	_id: string;
	status: string;
	product_id: string;
	unit_id: string;
	variant_id: string;

	buy_price: number;
	sell_price: number;
	quantity: number;
	discount_value: number;
	discount_type: DiscountType;

	createdAt: string;

	unit_data: {
		_id: string;
		name: string;
	};
	variant_data: {
		_id: string;
		name: string;
	};
};

export type ProductTypeView = {
	_id: string;
	created_by: string;
	supplier_id: string;
	warehouse_id: string;
	store_id: string[];
	name: string;
	sku: string;
	category_id: string;
	sub_category_id: string;
	brand_id: string;
	warranty_id: string;
	sort_description: string;
	long_description: string;
	isFeature: boolean;
	quantity: number;
	status: StatusType | 'new';
	image: string;
	gallery_images: string[];
	tags: string[];
	created_by_data: {
		_id: string;
		name: string;
	};
	store_data: {
		_id: string;
		name: string;
	}[];

	product_type: 'single' | 'variant';
	buy_price: number;
	sell_price: number;
	discount_value: number;
	discount_type: DiscountType;

	manufacture_date: Date;
	expire_date: Date;

	warehouse_data: {
		_id: string;
		name: string;
	};
	supplier_data: {
		_id: string;
		name: string;
	};
	brand_data: {
		_id: string;
		name: string;
	};
	sub_category_data: {
		_id: string;
		name: string;
		category_id: string;
	};
	category_data: {
		_id: string;
		name: string;
	};
	warranty_data: {
		_id: string;
		name: string;
	};
};
