'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { ProductType } from '@/lib/type';

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
		accessorKey: 'selling_price',
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
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('selling_price')}</div>
		),
	},
	{
		accessorKey: 'qty',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Quantity
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue('qty')}</div>,
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
export const ProductData: ProductType[] = [
	{
		id: 'm5gr84i9',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i2',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 2',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 50,
		qty: 10,
		total_sells: 30,
	},
	{
		id: 'm5gr84i3',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 3',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i4',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 4',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i5',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 5',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i6',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 6',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i7',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 7',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i8',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 8',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i91',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i21',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 2',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 50,
		qty: 10,
		total_sells: 30,
	},
	{
		id: 'm5gr84i31',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 3',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i41',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 4',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i15',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 5',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i61',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 6',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i71',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 7',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
	{
		id: 'm5gr84i81',
		image: 'https://ui.shadcn.com/placeholder.svg',
		name: 'Cotton Sweater 8',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		selling_price: 100,
		qty: 10,
		total_sells: 100,
	},
];
