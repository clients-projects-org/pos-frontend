import { MenuType } from '../type';

export const menu: MenuType[] = [
	{
		id: 1,
		title: 'Main',
		hr: true,
		children: [
			{
				id: 1,
				name: 'Dashboard',
				icon: 'LayoutGrid',
				children: [
					{
						id: 1,
						name: 'Admin Dashboard',
						path: '/',
					},
					{
						id: 2,
						name: 'Sales Dashboard',
						path: '/sales-dashboard',
					},
				],
			},
		],
	},
	{
		id: 2,
		title: 'Inventory',
		hr: true,
		children: [
			{
				id: 14,
				name: 'Products',
				path: '/inventory/products',
				icon: 'BarChart2',
			},
			{
				id: 15,
				name: 'Create Products',
				path: '/inventory/create-products',
				icon: 'PlusCircle',
			},
			{
				id: 16,
				name: 'Expired Products',
				path: '/inventory/expired-products',
				icon: 'Clock',
			},
			{
				id: 17,
				name: 'Low Stocks',
				path: '/inventory/low-stocks',
				icon: 'AlertTriangle',
			},
			{ id: 18, name: 'Category', path: '/inventory/category', icon: 'Grid' },
			{
				id: 19,
				name: 'Sub Category',
				path: '/inventory/sub-category',
				icon: 'List',
			},
			{ id: 20, name: 'Brand', path: '/inventory/brand', icon: 'Anchor' },
			{ id: 21, name: 'Units', path: '/inventory/units', icon: 'Ruler' },
			{
				id: 22,
				name: 'Variant Attributes',
				path: '/inventory/variant-attributes',
				icon: 'Layers',
			},
			{
				id: 23,
				name: 'Warranties',
				path: '/inventory/warranties',
				icon: 'Shield',
			},
			{
				id: 24,
				name: 'Print Barcode',
				path: '/inventory/print-barcode',
				icon: 'Printer',
			},
			{
				id: 25,
				name: 'Print QR Code',
				path: '/inventory/print-qr-code',
				icon: 'QrCode',
			},
		],
	},
	{
		id: 3,
		title: 'Stock',
		hr: true,
		children: [
			{
				id: 14,
				name: 'Manage Stock',
				path: '/stock/manage-stock',
				icon: 'PackageCheck',
			},
			{
				id: 15,
				name: 'Stock Adjustment',
				path: '/stock/stock-adjustment',
				icon: 'PackageOpen',
			},
			{
				id: 16,
				name: 'Stock Transfer',
				path: '/stock/stock-transfer',
				icon: 'Truck',
			},
		],
	},
	{
		id: 4,
		title: 'Sales',
		hr: true,
		children: [
			{ id: 14, name: 'Sales', path: '/sales/sales', icon: 'ShoppingCart' },
			{ id: 15, name: 'Invoices', path: '/sales/invoices', icon: 'BarChart2' },
			{
				id: 16,
				name: 'Sales Return',
				path: '/sales/sales-return',
				icon: 'GitPullRequestCreateArrow',
			},
			{
				id: 17,
				name: 'Quotation',
				path: '/sales/quotation',
				icon: 'BarChart2',
			},
			{ id: 18, name: 'POS', path: '/sales/pos', icon: 'BookLock' },
		],
	},
	{
		id: 4,
		title: 'Promo',
		hr: true,
		children: [
			{ id: 18, name: 'Coupons', path: '/promo/coupons', icon: 'BarChart2' },
		],
	},
	{
		id: 4,
		title: 'Purchases',
		hr: true,
		children: [
			{
				id: 18,
				name: 'Purchases',
				path: '/purchases/purchases',
				icon: 'BarChart2',
			},
			{
				id: 19,
				name: 'Purchase Order',
				path: '/purchases/purchase-order',
				icon: 'BarChart2',
			},
			{
				id: 20,
				name: 'Purchase Return',
				path: '/purchases/purchase-return',
				icon: 'BarChart2',
			},
		],
	},
	{
		id: 3,
		title: 'Finance & Accounts',
		hr: true,
		children: [
			{
				id: 1,
				name: 'Expenses',
				icon: 'DollarSign',
				children: [
					{ id: 1, name: 'Expenses', path: '/expenses', icon: 'DollarSign' },
					{
						id: 2,
						name: 'Expense Category',
						path: '/expense-category',
						icon: 'Archive',
					},
				],
			},
		],
	},
	{
		id: 4,
		title: 'Peoples',
		hr: true,
		children: [
			{ id: 18, name: 'Customers', path: '/customers', icon: 'User' },
			{ id: 19, name: 'Suppliers', path: '/suppliers', icon: 'Truck' },
			{ id: 20, name: 'Stores', path: '/stores', icon: 'ShoppingBag' },
			{ id: 21, name: 'Warehouses', path: '/warehouses', icon: 'Warehouse' },
		],
	},
	{
		id: 4,
		title: 'HRM',
		hr: true,
		children: [
			{ id: 22, name: 'Employees', path: '/employees', icon: 'Users' },
		],
	},
	{
		id: 3,
		title: 'Reports',
		hr: true,
		children: [
			{
				id: 1,
				name: 'Reports & Analytics',
				icon: 'TrendingUp',
				children: [
					{
						id: 18,
						name: 'Sales Report',
						path: '/reports/sales',
						icon: 'TrendingUp',
					},
					{
						id: 19,
						name: 'Purchase Report',
						path: '/reports/purchase',
						icon: 'TrendingDown',
					},
					{
						id: 20,
						name: 'Inventory Report',
						path: '/reports/inventory',
						icon: 'Package',
					},
					{
						id: 21,
						name: 'Invoice Report',
						path: '/reports/invoice',
						icon: 'FileText',
					},
					{
						id: 22,
						name: 'Supplier Report',
						path: '/reports/supplier',
						icon: 'Users',
					},
					{
						id: 23,
						name: 'Customer Report',
						path: '/reports/customer',
						icon: 'User',
					},
					{
						id: 24,
						name: 'Expense Report',
						path: '/reports/expense',
						icon: 'DollarSign',
					},
					{
						id: 25,
						name: 'Income Report',
						path: '/reports/income',
						icon: 'DollarSign',
					},
					{ id: 26, name: 'Tax Report', path: '/reports/tax', icon: 'Percent' },
					{
						id: 27,
						name: 'Profit & Loss',
						path: '/reports/profit-loss',
						icon: 'DollarSign',
					},
				],
			},
		],
	},

	{
		id: 4,
		title: 'User Management',
		hr: true,
		children: [
			{ id: 28, name: 'Users', path: '/user-management/users', icon: 'Users' },
			{
				id: 29,
				name: 'Roles & Permissions',
				path: '/user-management/roles-permissions',
				icon: 'Key',
			},
			{
				id: 30,
				name: 'Delete Account Request',
				path: '/user-management/delete-account-request',
				icon: 'Trash',
			},
		],
	},
	{
		id: 4,
		title: 'Settings',
		hr: true,
		children: [
			{
				id: 31,
				name: 'General Settings',
				path: '/settings/general',
				icon: 'Settings',
			},
			{
				id: 32,
				name: 'Website Settings',
				path: '/settings/website',
				icon: 'Globe',
			},

			{
				id: 34,
				name: 'System Settings',
				path: '/settings/system',
				icon: 'Wrench',
			},
			{
				id: 35,
				name: 'Financial Settings',
				path: '/settings/financial',
				icon: 'DollarSign',
			},
			{
				id: 36,
				name: 'Other Settings',
				path: '/settings/other',
				icon: 'SlidersHorizontal',
			},
			{ id: 37, name: 'Logout', path: '/logout', icon: 'LogOut' },
		],
	},
	{
		id: 4,
		title: 'Help',
		hr: true,
		children: [
			{
				id: 38,
				name: 'Documentation',
				path: '/help/documentation',
				icon: 'Book',
			},
		],
	},
];

/*
 this is dummy data for save can be helpful next time we need to use this
export const menu: MenuType[] = [
	{
		id: 1,
		title: 'Main',
		hr: true,
		children: [
			{
				id: 1,
				name: 'Dashboard',
				icon: 'LayoutGrid',
				children: [
					{
						id: 1,
						name: 'Admin Dashboard',
						path: '/',
					},
					{
						id: 2,
						name: 'Sales Dashboard',
						path: '/',
					},
				],
			},
			{
				id: 2,
				name: 'Category',
				path: '/category',
				icon: 'ShoppingCart',
			},
		],
	},
	{
		id: 1,
		title: 'Inventory',
		hr: true,
		children: [
			{
				id: 1,
				name: 'Products',
				path: '/',
				icon: 'Home',
				children: [
					{
						id: 1,
						name: 'Admin  2 Dashboard',
						path: '/',
					},
					{
						id: 2,
						name: 'Sales 2 Dashboard',
						path: '/',
					},
				],
			},
			{
				id: 2,
				name: 'Dashboard 2',
				path: '/',
				icon: 'Home',
				children: [
					{
						id: 1,
						name: 'Admin  2 Dashboard',
						path: '/',
						icon: 'Home',
					},
					{
						id: 2,
						name: 'Sales 2 Dashboard',
						path: '/',
						icon: 'Home',
					},
				],
			},
			{
				id: 6,
				name: 'Category',
				path: '/system/category',
				icon: 'LineChart',
			},
			
		],
	},
];

*/
