export type StatusType = 'draft' | 'active' | 'deactivated';
export type PeriodsType = 'day' | 'week' | 'month' | 'year';
export type UseRole = 'admin' | 'supper admin' | 'staff' | 'user';
export type DiscountType = 'flat' | 'percentage' | 'none';
export type ImageType = 'image' | 'icon';
export type ProductStatusType =
	| 'draft'
	| 'active'
	| 'pending'
	| 'hold'
	| 'canceled';

export type IconType = {
	[key: string]: React.ForwardRefExoticComponent<
		React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
	>;
};

// menu
export type MenuItemType = {
	id: number;
	name: string;
	path?: string;
	icon?: string;
	children?: MenuItemType[];
};

export type MenuType = {
	id: number;
	title: string;
	hr: boolean;
	children: MenuItemType[];
};

// product type
export type ProductType = {
	_id: string;
	code?: string;
	image?: string;
	name?: string;
	slug?: string;
	short_description?: string;
	long_description?: string;
	status?: ProductStatusType;
	original_price?: number;
	selling_price?: number;
	qty?: number;
	alert_qty?: number;
	total_sells?: number;
	createdAt?: string;
	sku?: string;
	created_by?: UserType;
	brand?: BrandType;
	category?: CategoryType;
	subcategory?: SubCategoryType;
	discount_type?: DiscountType;
	discount_rate: string;
	supplier?: SupplierType;
	warehouse?: WarehouseType;
	exp_date?: string;
	warranty?: WarrantyType;
	variants?: VariantType[];
};

export type UserType = {
	_id?: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	email?: string;
	phone?: string;
	password?: string;
	createdAt?: string;
	role_id?: string;
	image?: string;
	image_type: ImageType;
	status?: StatusType;
	created_by?: string;
};

export type RoleType = {
	_id?: string;
	name?: string;
	slug?: string;
	status?: string;
	image?: string;
	image_type: ImageType;
	created_by?: UserType;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	id?: string;
};

export type SupplierType = {
	_id: string;
	code?: string;
	name?: string;
	slug?: string;
	email?: string;
	phone: string;
	address: string;
	image?: string;
	image_type: ImageType;
	description: string;
	status: StatusType;
	createdAt?: string;
	created_by?: UserType;
};

export type CustomerType = {
	_id: string;
	code?: string;
	name?: string;
	slug?: string;
	email?: string;
	phone: string;
	address: string;
	image?: string;
	image_type: ImageType;
	description: string;
	status: StatusType;
	createdAt?: string;
	created_by?: UserType;
};

export type WarehouseType = {
	_id: string;
	code?: string;
	name?: string;
	slug?: string;
	status: StatusType;
	description: string;
	createdAt?: string;
	created_by?: UserType;
};
export type StoreType = {
	_id: string;
	code?: string;
	name?: string;
	slug?: string;
	status: StatusType;
	description: string;
	createdAt?: string;
	created_by?: UserType;
};

// category type
export type CategoryType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: string;
	image_type: ImageType;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
};

export type SubCategoryType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: string;
	image_type: ImageType;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
	category_id?: string;
};

export type BrandType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: string;
	image_type: ImageType;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
};

export type UnitType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	short_name?: string;
	slug?: string;
	image?: string;
	image_type: ImageType;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
};

export type VariantType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	value?: string[];
	slug?: string;
	image?: string;
	image_type: ImageType;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
};

export type WarrantyType = {
	_id: string;
	code?: string;
	name?: string;
	slug?: string;
	createdAt?: string;
	created_by?: UserType;
	status?: StatusType;
	description?: string;
	periods?: string;
};

export type CouponType = {
	_id: string;
	code?: string;
	description?: string;
	name?: string;
	image: string;
	image_type: 'image' | 'icon';
	coupon_type: 'flat' | 'percentage';
	status?: StatusType;
	amount: number;
	limitation: number;
	expire_date?: string;
	created_by?: string;
	createdAt?: string;
	slug?: string;
};
