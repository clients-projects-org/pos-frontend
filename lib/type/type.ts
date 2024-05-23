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
	id: string;
	code?: string;
	image?: string;
	name?: string;
	slug?: string;
	short_description?: string;
	long_description?: string;
	status?: 'draft' | 'active' | 'pending' | 'hold' | 'canceled';
	original_price?: number;
	selling_price?: number;
	qty?: number;
	alert_qty?: number;
	total_sells?: number;
	created_at?: string;
	sku?: string;
	created_by?: UserType;
	brand?: BrandType;
	category?: CategoryType;
	subcategory?: SubCategoryType;
	discount?: DiscountType;
	supplier?: SupplierType;
	warehouse?: WarehouseType;
	exp_date?: string;
	warranty?: WarrantyType;
	variants?: VariantType[];
};
export type DiscountType = {
	type?: 'flat' | 'percentage' | 'none';
	rate?: '20';
};

export type StatusType = 'draft' | 'active' | 'deactivate';

// user type
export type UseRole = 'admin' | 'supper admin' | 'staff' | 'user';

export type UserType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	email?: string;
	created_at?: string;
	role?: UseRole;
	image?: ImageType;
};
export type RoleType = {
	_id?: string;
	name?: string;
	slug?: string;
	status?: string;
	image?: ImageType;
	created_by?: UserType;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	id?: string;
};

export type SupplierType = {
	id: string;
	code?: string;
	name?: string;
	slug?: string;
	email?: string;
	phone: string;
	address: string;
	image: ImageType;
	description: string;
	status: StatusType;
	created_at?: string;
	created_by?: UserType;
};

export type WarehouseType = {
	id: string;
	code?: string;
	name?: string;
	slug?: string;
	status: StatusType;
	description: string;
	created_at?: string;
	created_by?: UserType;
};

// icon/image type
export type ImageType = {
	image?: string;
	image_type: 'image' | 'icon';
	_id?: string;
};

// category type
export type CategoryType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: ImageType;
	created_at?: string;
	crated_by?: UserType;
	status?: StatusType;
};

export type SubCategoryType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: ImageType;
	created_at?: string;
	crated_by?: UserType;
	status?: StatusType;
	category_id?: string;
};

export type BrandType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	slug?: string;
	image?: ImageType;
	created_at?: string;
	crated_by?: UserType;
	status?: StatusType;
};

export type UnitType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	short_name?: string;
	slug?: string;
	image?: ImageType;
	created_at?: string;
	crated_by?: UserType;
	status?: StatusType;
};
export type VariantType = {
	id: string;
	code?: string;
	description?: string;
	name?: string;
	value?: string[];
	slug?: string;
	image?: ImageType;
	created_at?: string;
	crated_by?: UserType;
	status?: StatusType;
};
export type PeriodsType = 'day' | 'week' | 'month' | 'year';
export type WarrantyType = {
	id: string;
	code?: string;
	name?: string;
	slug?: string;
	created_at?: string;
	created_by?: UserType;
	status?: StatusType;
	description?: string;
	periods?: PeriodsType;
};

const data = {
	phone: '01818321271',
	email: 'abdurshobur.developer@gmail.com',
	address: 'nkjkljl',
	description: 't',
	status: 'active',
	deleted_at: null,
	created_at: '2024-04-22T04:30:51.000000Z',
	updated_at: '2024-04-22T04:30:51.000000Z',
	vendor_id: 2,
};
