export type StatusType = 'draft' | 'active' | 'deactivated' | 'deleted';
export const statusData = [
	'draft',
	'active',
	'deactivated',
	'deleted',
] as const;
export type StatusTypeApi = StatusType | 'all';
export type PeriodsType = 'day' | 'week' | 'month' | 'year';
export type UseRole = 'admin' | 'supper admin' | 'staff' | 'user';
export type DiscountType = 'fixed' | 'percentage' | 'none';
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
	_id: string;
	name: string;
	path?: string;
	icon?: string;
	show?: boolean;
	checked?: boolean;
	children?: MenuItemType[];
};

export type MenuType = {
	_id: string;
	title: string;
	hr?: boolean;
	show?: boolean;
	sidebarChildren?: MenuItemType[];
};

export interface MenuTypeRoleState extends MenuType {
	checked: boolean;
}

// product type
export type ProductType = {
	inventory: any;
	category: any;
	sub_category: any;
	sr: number;
	_id: string;

	// from
	supplier_id: string;
	warehouse_id: string;
	store_id: string[];

	// info
	name: string;
	slug: string;
	category_id: string;
	sub_category_id: string;
	brand_id: string;
	brand: BrandType;
	sort_description: string;
	long_description: string;

	// price and stock
	quantity: number;
	buy_price: number;
	sell_price: number;
	discount: number;
	discount_type: DiscountType;
	discount_value: number; // this will calculate from sell price and discount type

	// custom field
	alert_quantity?: number;
	manufacture_date: Date;
	expire_date: Date;
	warranty_id: string;

	variant: string;
	unit: UnitType;

	status: StatusType | 'new';

	image: string;
	image_type: 'image' | 'icon';
	gallery_images: string[];

	tags?: string[];
	isFeature?: 'true' | 'false';
	sku: string;

	variant_details: any;
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
	role_id?: RoleType;
	image?: string;
	image_type: ImageType;
	status?: StatusType;
	created_by?: UserType;
	role?: RoleType;
};

export type RoleType = {
	_id?: string;
	name?: string;
	slug?: string;
	status?: StatusType;
	description?: string;
	created_by?: UserType;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	id?: string;
};

export type SupplierType = {
	sr: number;
	_id: string;
	name: string;
	email: string;
	phone: string;
	status: StatusType;
	description: string;
	address: string;
	image: string;
	image_type: ImageType;
	created_by?: string;
	createdBy: UserType;
};

export type CustomerType = {
	_id: string;
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
	created_by?: string;
	createdBy?: UserType;
};

export type WarehouseType = {
	name: string;
	description?: string;
	image: string;
	image_type: 'image' | 'icon';
	status?: StatusType;
	created_by?: string;
	sr: number;
	_id: string;
	createdAt?: string;
	createdBy?: UserType;
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
	name: string;
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
	description?: string;
	name?: string;
	short_name?: string;
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
	coupon_type: 'fixed' | 'percentage';
	status?: StatusType;
	amount: number;
	limitation: number;
	expire_date?: string;
	created_by?: string;
	createdAt?: string;
	slug?: string;
};

export type RouteType = {
	createdAt?: string;
	name?: string;
	code: string;
	status?: StatusType;
	checked?: boolean;
	updatedAt?: string;
	parent_id?: string;
	_id?: string;
};
export type DevNameType = {
	_id?: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	created_by?: UserType;
	status?: StatusType;
	routes?: RouteType[];
	checked?: boolean;
};

export type RoleDetailsType = {
	parent: string;
	_id: string;
	status: StatusType;
	children: {
		permission_id: string;
		name: string;
		status: StatusType;
	}[];
};

export type ErrorMessage = {
	path: string | number;
	message: string;
};
// Define the success response type
export interface ApiSuccessResponse<T> {
	message: string;
	statusCode: number;
	success: boolean;
	data: T;
}

// Define the error response type (you can adjust this based on your actual error structure)
export interface ApiErrorResponseType {
	message: string;
	statusCode: number;
	success: boolean;
	errorMessages?: ErrorMessage[];
}

export type PurchasePaymentHistoryType = {
	_id?: string;
	payment_method: string;
	purchase_id: string;
	supplier_id: string;
	added_by: string;
	paid_amount: number;
	note?: string;
};

// Define a union type for both success and error responses
export type ApiResponse<T> = ApiSuccessResponse<T>;
