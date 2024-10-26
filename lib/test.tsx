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
import { BadgeVariantType } from './type';
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

export const categoryColumn: ColumnDef<any>[] = [
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
				<Badge variant={status(row.getValue('status')) as BadgeVariantType}>
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
									variant={
										status(row.original.created_by.role) as BadgeVariantType
									}
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
