'use client';

import * as React from 'react';
import { ColumnDef, Table as TanTable } from '@tanstack/react-table';
import {
	ArrowUpDown,
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ColumnFIlter } from '../t-components';

export const ProductData: ProductType[] = [
	{
		id: 'm5gr84i9',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		price: 100,
		total_sells: 100,
	},
	{
		id: 'm5gr84i2',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 2',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		price: 50,
		total_sells: 30,
	},
];

export type ProductType = {
	id: string;
	image: string;
	name: string;
	status: 'draft' | 'active' | 'pending' | 'hold' | 'canceled';
	price: number;
	total_sells: number;
	created_at: string;
};
export const ProductColumns: ColumnDef<ProductType>[] = [
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
				<Image
					alt="Product image"
					className="aspect-square rounded-md object-cover"
					height="64"
					src={row.getValue('image')}
					width="64"
				/>
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
			<div className="capitalize">{row.getValue('status')}</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Price
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('price')}</div>,
	},
	{
		accessorKey: 'total_sells',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Total Sells
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('total_sells')}</div>
		),
	},
	{
		accessorKey: 'created_at',
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
			<div className="lowercase">{row.getValue('created_at')}</div>
		),
	},
	{
		id: 'actions',
		header: () => 'Actions',
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export const SearchFilter = ({ table }: { table: TanTable<ProductType> }) => {
	return (
		<div className="flex items-center py-4">
			<Input
				placeholder="Filter emails..."
				value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
				onChange={(event) =>
					table.getColumn('name')?.setFilterValue(event.target.value)
				}
				className="max-w-sm"
			/>
			<div className="ml-auto flex items-center gap-3">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<ListFilter className="ml-2 h-4 w-4" /> Filter
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<File className="ml-2 h-4 w-4" /> Export
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* column filter  */}
				<ColumnFIlter<ProductType> table={table} />

				<Button size="sm" className="gap-1">
					<PlusCircle className="ml-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Product
					</span>
				</Button>
			</div>
		</div>
	);
};
