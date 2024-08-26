import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ColumnDef } from '@tanstack/react-table';
import { CategoryType } from './type';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { DynamicIcon } from '@/components/actions';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { status } from './actions';

const invoices = [
	{
		invoice: 'INV001 adf df sdfas dfsadf sdf',
		paymentStatus: 'Paid',
		totalAmount: '$250.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV002',
		paymentStatus: 'Pending',
		totalAmount: '$150.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV003',
		paymentStatus: 'Unpaid',
		totalAmount: '$350.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV004',
		paymentStatus: 'Paid',
		totalAmount: '$450.00',
		paymentMethod: 'Credit Card',
	},
	{
		invoice: 'INV005',
		paymentStatus: 'Paid',
		totalAmount: '$550.00',
		paymentMethod: 'PayPal',
	},
	{
		invoice: 'INV006',
		paymentStatus: 'Pending',
		totalAmount: '$200.00',
		paymentMethod: 'Bank Transfer',
	},
	{
		invoice: 'INV007',
		paymentStatus: 'Unpaid',
		totalAmount: '$300.00',
		paymentMethod: 'Credit Card',
	},
];

export function TableDemo() {
	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell className="text-right">{invoice.totalAmount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

export const categoryColumn: ColumnDef<CategoryType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'image',
		header: () => 'Image',
		cell: ({ row }) => (
			<div>
				{row.original.image && row.original.image_type === 'image' ? (
					<Image
						alt="Product image"
						className="aspect-square rounded-md object-cover"
						height="40"
						src={row.original.image as string}
						width="40"
					/>
				) : (
					<div className="icon">
						{row.original.image && (
							<DynamicIcon
								className="w-10 h-10"
								icon={row.original.image as string}
							/>
						)}
					</div>
				)}
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }) => (
			<div className="capitalize">
				<Badge variant={status(row.getValue('status'))}>
					{row.getValue('status')}
				</Badge>
			</div>
		),
	},
	{
		accessorKey: 'code',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Code
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('code')}</div>,
	},
	{
		accessorKey: 'created_by',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created By
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize whitespace-nowrap">
				{row.original.created_by ? (
					<>
						{row.original.created_by.role && (
							<>
								{row.original.created_by.name}{' '}
								<Badge
									className="capitalize"
									variant={status(row.original.created_by.role)}
								>
									{row.original.created_by.role}
								</Badge>
							</>
						)}
					</>
				) : (
					'N/A'
				)}
			</div>
		),
	},

	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<div>
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Created at
						<ArrowUpDown className="ml-2 h-4 w-4 " />
					</Button>
				</div>
			);
		},

		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('createdAt')}</div>
		),
	},
	{
		id: 'actions',
		header: () => 'Actions',
		cell: () => {
			return (
				<div className="flex items-center">
					<Button variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="ScanEye" className="h-4 w-4" />
					</Button>
					<Button disabled variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="SquarePen" className="h-4 w-4" />
					</Button>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="Trash2" className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	},
];

const sidebarMenu = [
	{
		title: 'Main',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Dashboard',
				icon: 'LayoutGrid',
				show: true,
				children: [
					{
						name: 'Admin Dashboard',
						show: true,
						path: '/',
					},
					{
						name: 'Sales Dashboard',
						show: true,
						path: '/sales-dashboard',
					},
				],
			},
		],
	},
	{
		title: 'Inventory',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Products',
				show: true,
				path: '/inventory/products',
				icon: 'BarChart2',
			},
			{
				name: 'Create Products',
				show: true,
				path: '/inventory/create-products',
				icon: 'PlusCircle',
			},
			{
				name: 'Expired Products',
				show: true,
				path: '/inventory/expired-products',
				icon: 'Clock',
			},
			{
				name: 'Low Stocks',
				show: true,
				path: '/inventory/low-stocks',
				icon: 'AlertTriangle',
			},
			{
				name: 'Category',
				show: true,
				path: '/inventory/category',
				icon: 'Grid',
			},
			{
				name: 'Sub Category',
				show: true,
				path: '/inventory/sub-category',
				icon: 'List',
			},
			{
				name: 'Brand',
				show: true,
				path: '/inventory/brand',
				icon: 'Anchor',
			},
			{
				name: 'Units',
				show: true,
				path: '/inventory/units',
				icon: 'Ruler',
			},
			{
				name: 'Variant Attributes',
				show: true,
				path: '/inventory/variant-attributes',
				icon: 'Layers',
			},
			{
				name: 'Warranties',
				show: true,
				path: '/inventory/warranties',
				icon: 'Shield',
			},
			{
				name: 'Print Barcode',
				show: true,
				path: '/inventory/print-barcode',
				icon: 'Printer',
			},
			{
				name: 'Print QR Code',
				show: true,
				path: '/inventory/print-qr-code',
				icon: 'QrCode',
			},
		],
	},
	{
		title: 'Stock',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Manage Stock',
				show: true,
				path: '/stock/manage-stock',
				icon: 'PackageCheck',
			},
			{
				name: 'Stock Adjustment',
				show: true,
				path: '/stock/stock-adjustment',
				icon: 'PackageOpen',
			},
			{
				name: 'Stock Transfer',
				show: true,
				path: '/stock/stock-transfer',
				icon: 'Truck',
			},
		],
	},
	{
		title: 'Sales',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Sales',
				show: true,
				path: '/sales/sales',
				icon: 'ShoppingCart',
			},
			{
				name: 'Invoices',
				show: true,
				path: '/sales/invoices',
				icon: 'BarChart2',
			},
			{
				name: 'Sales Return',
				show: true,
				path: '/sales/sales-return',
				icon: 'GitPullRequestCreateArrow',
			},
			{
				name: 'Quotation',
				show: true,
				path: '/sales/quotation',
				icon: 'BarChart2',
			},
		],
	},
	{
		title: 'Promo',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Coupons',
				show: true,
				path: '/promo/coupons',
				icon: 'BarChart2',
			},
		],
	},
	{
		title: 'Purchases',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Purchases',
				show: true,
				path: '/purchases/purchases',
				icon: 'BarChart2',
			},
			{
				name: 'Purchase Order',
				show: true,
				path: '/purchases/purchase-order',
				icon: 'BarChart2',
			},
			{
				name: 'Purchase Return',
				show: true,
				path: '/purchases/purchase-return',
				icon: 'BarChart2',
			},
		],
	},
	{
		title: 'Finance & Accounts',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Expenses',
				icon: 'DollarSign',
				show: true,
				children: [
					{
						name: 'Expenses',
						show: true,
						path: '/expenses',
						icon: 'DollarSign',
					},
					{
						name: 'Expense Category',
						show: true,
						path: '/expense-category',
						icon: 'Archive',
					},
				],
			},
		],
	},
	{
		title: 'Peoples',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Customers',
				show: true,
				path: '/peoples/customers',
				icon: 'User',
			},
			{
				name: 'Suppliers',
				show: true,
				path: '/peoples/suppliers',
				icon: 'Truck',
			},
			{
				name: 'Stores',
				show: true,
				path: '/peoples/stores',
				icon: 'ShoppingBag',
			},
			{
				name: 'Warehouses',
				show: true,
				path: '/peoples/warehouses',
				icon: 'Warehouse',
			},
		],
	},
	{
		title: 'HRM',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Employees',
				show: true,
				path: '/employees',
				icon: 'Users',
			},
		],
	},
	{
		title: 'Reports',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Reports & Analytics',
				icon: 'TrendingUp',
				show: true,
				children: [
					{
						name: 'Sales Report',
						show: true,
						path: '/reports/sales',
						icon: 'TrendingUp',
					},
					{
						name: 'Purchase Report',
						show: true,
						path: '/reports/purchase',
						icon: 'TrendingDown',
					},
					{
						name: 'Inventory Report',
						show: true,
						path: '/reports/inventory',
						icon: 'Package',
					},
					{
						name: 'Invoice Report',
						show: true,
						path: '/reports/invoice',
						icon: 'FileText',
					},
					{
						name: 'Supplier Report',
						show: true,
						path: '/reports/supplier',
						icon: 'Users',
					},
					{
						name: 'Customer Report',
						show: true,
						path: '/reports/customer',
						icon: 'User',
					},
					{
						name: 'Expense Report',
						show: true,
						path: '/reports/expense',
						icon: 'DollarSign',
					},
					{
						name: 'Income Report',
						show: true,
						path: '/reports/income',
						icon: 'DollarSign',
					},
					{
						name: 'Tax Report',
						show: true,
						path: '/reports/tax',
						icon: 'Percent',
					},
					{
						name: 'Profit & Loss',
						show: true,
						path: '/reports/profit-loss',
						icon: 'DollarSign',
					},
				],
			},
		],
	},
	{
		title: 'User Management',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Users',
				show: true,
				path: '/user-management/users',
				icon: 'Users',
			},
			{
				name: 'Roles & Permissions',
				show: true,
				path: '/user-management/roles-permissions',
				icon: 'Key',
			},
			{
				name: 'Delete Account Request',
				show: true,
				path: '/user-management/delete-account-request',
				icon: 'Trash',
			},
		],
	},
	{
		title: 'Settings',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'General Settings',
				show: true,
				path: '/settings/general',
				icon: 'Settings',
			},
			{
				name: 'Website Settings',
				show: true,
				path: '/settings/website',
				icon: 'Globe',
			},

			{
				name: 'System Settings',
				show: true,
				path: '/settings/system',
				icon: 'Wrench',
			},
			{
				name: 'Financial Settings',
				show: true,
				path: '/settings/financial',
				icon: 'DollarSign',
			},
			{
				name: 'Other Settings',
				show: true,
				path: '/settings/other',
				icon: 'SlidersHorizontal',
			},
		],
	},
	{
		title: 'Help',
		hr: true,
		show: true,
		sidebarChildren: [
			{
				name: 'Documentation',
				show: true,
				path: '/help/documentation',
				icon: 'Book',
			},
		],
	},
];
