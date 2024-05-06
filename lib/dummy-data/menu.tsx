export const menu = [
	{
		id: 1,
		name: 'Home',
		path: '/',
		icon: 'Home',
		title: 'Main',
		children: [
			{
				id: 1,
				name: 'Dashboard',
				path: '/',
				icon: 'Home',
				children: [
					{
						id: 1,
						name: 'Admin Dashboard',
						path: '/',
						icon: 'Home',
					},
					{
						id: 1,
						name: 'Sales Dashboard',
						path: '/',
						icon: 'Home',
					},
				],
			},
		],
	},
	{
		id: 6,
		name: 'Category',
		path: '/system/category',
		icon: 'LineChart',
	},
	{
		id: 2,
		name: 'Category',
		path: '/category',
		icon: 'ShoppingCart',
	},
	{
		id: 3,
		name: 'Sub Category',
		path: '/sub-category',
		icon: 'Package',
	},
	{
		id: 4,
		name: 'Brand',
		path: '/brand',
		icon: 'Users',
	},
	{
		id: 5,
		name: 'Customer',
		path: '/customer',
		icon: 'LineChart',
	},
	{
		id: 5,
		name: 'Supplier',
		path: '/supplier',
		icon: 'LineChart',
	},
];
