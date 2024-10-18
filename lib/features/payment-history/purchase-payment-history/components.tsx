'use client';
import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableItem } from '@/lib/table/table-items/t-item';
import { PurchaseType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';

const Column: ColumnDef<PurchaseType>[] = [
	{
		accessorKey: 'supplier_id',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Supplier
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => (
			<div>
				{row.original.supplier_id?.name}{' '}
				{row.original.supplier_id?.business_name &&
					`(${row.original.supplier_id?.business_name})`}
			</div>
		),
	},
	{
		accessorKey: 'payment_method',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					payment_method
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => <div>{row.original.payment_method?.name}</div>,
	},

	TableItem.Text('paid_amount', 'Paid Amount'),
	TableItem.Added_by(),
	TableItem.Date('createdAt', 'Created at'),
];

const Filter = ({
	value,
	setValue,
}: {
	value: StatusType | 'all';
	setValue: Function;
}) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className=" ">
						<DynamicIcon icon="ListFilter" className="h-4 w-4 sm:mr-2" />
						<span className="sr-only sm:not-sr-only capitalize">{value}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Filter by</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('all')}
						checked={value === 'all'}
					>
						All
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('active')}
						checked={value === 'active'}
					>
						Active
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('deactivated')}
						checked={value === 'deactivated'}
					>
						Deactivated
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('draft')}
						checked={value === 'draft'}
					>
						Draft
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export const PurchasePaymentComponents = { Filter, Column };
