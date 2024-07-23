'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { CategoryType } from '@/lib/type';
import { DynamicIcon, status } from '@/components/actions';
import { Badge } from '@/components/ui/badge';

export const categoryData: CategoryType[] = [
	{
		id: 'm5gr84i9',
		image: {
			image_type: 'image',
			image: 'https://ui.shadcn.com/placeholder.svg',
		},
		name: 'Cotton Sweater',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'active',
		code: 'cpxiw1',
		created_by: {
			name: 'Shadcn',
			id: 'm5gr84i9',
			role: 'supper admin',
		},
	},
	{
		id: 'm5gr84i2',
		image: {
			image_type: 'icon',
			image: 'Apple',
		},
		name: 'Cotton Sweater 1',
		created_at: '2022-11-01T00:00:00.000Z',
		status: 'deactivate',
		code: 'cpxiwq',
		created_by: {
			name: 'Shadcn',
			id: 'm5gr84i9',
			role: 'user',
		},
	},
];

// const SelectedIcon = icon && (Ic as unknown as IconType)[icon];
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
