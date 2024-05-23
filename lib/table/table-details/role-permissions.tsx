'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { RoleType } from '@/lib/type';
import { DynamicIcon, status } from '@/components/actions';
import { Badge } from '@/components/ui/badge';

export const roleData: RoleType[] = [
	{
		_id: '66482b8dbc443ad6b1ec88693',
		name: 'adminsasd423da4',
		slug: 'adminsasd423da4',
		status: 'active',
		image: {
			image: 'https://ui.shadcn.com/placeholder.svg',
			image_type: 'image',
			_id: '66482ab8dbc443d6b1ec88694',
		},
		created_by: {
			name: 'Admin',
			role: 'admin',
			id: 'id-x',
		},
		createdAt: '2024-05-18T04:16:13.111Z',
		updatedAt: '2024-05-18T04:16:13.111Z',
		__v: 0,
		id: '66482b8dbc443d6b1aec88693',
	},
	{
		_id: '6648cdbffca601d92e18fac34',
		name: 'sdsd',
		slug: 'sdsd',
		status: 'active',
		image: {
			image: 'https://ui.shadcn.com/placeholder.svg',
			image_type: 'image',
			_id: '6648cdbffc601d9a2e18fac35',
		},
		created_by: {
			name: 'Admin',
			role: 'admin',
			id: 'id-x',
		},
		createdAt: '2024-05-18T15:48:15.469Z',
		updatedAt: '2024-05-18T15:48:15.469Z',
		__v: 0,
		id: '6648cdbffc601sd92e18fac34',
	},
	{
		_id: '6648ce792s65a2e61a5988d58b',
		name: 'asd',
		slug: 'asd',
		status: 'active',
		image: {
			image: 'https://ui.shadcn.com/placeholder.svg',
			image_type: 'image',
			_id: '6648ce792652e61a5988d5d8c',
		},
		created_by: {
			name: 'Admin',
			role: 'admin',
			id: 'id-x',
		},
		createdAt: '2024-05-18T15:51:21.068Z',
		updatedAt: '2024-05-18T15:51:21.068Z',
		__v: 0,
		id: '6648ce792652e6ds1a5988d58b',
	},
	{
		_id: '6648dcdc98a9467109ab2064a',
		name: 'asdzxz',
		slug: 'asdzxz',
		status: 'active',
		image: {
			image: 'https://ui.shadcn.com/placeholder.svg',
			image_type: 'image',
			_id: '6648dcdc98a9467109ab2065d',
		},
		created_by: {
			name: 'Admin',
			role: 'admin',
			id: 'id-x',
		},
		createdAt: '2024-05-18T16:52:44.111Z',
		updatedAt: '2024-05-18T16:52:44.111Z',
		__v: 0,
		id: '6648dcdc98a9467109ab2064d',
	},
	{
		_id: '6648dd64718b9984c08b852a',
		name: 'asdzxasz',
		slug: 'asdzxasz',
		status: 'active',
		image: {
			image: 'https://ui.shadcn.com/placeholder.svg',
			image_type: 'image',
			_id: '6648dd64718b9984c08b852ba',
		},
		created_by: {
			name: 'Admin',
			role: 'admin',
			id: 'id-x',
		},
		createdAt: '2024-05-18T16:55:00.732Z',
		updatedAt: '2024-05-18T16:55:00.732Z',
		__v: 0,
		id: '6648dd64718b9984c08b852aa',
	},
];

// const SelectedIcon = icon && (Ic as unknown as IconType)[icon];
export const roleColumn: ColumnDef<RoleType>[] = [
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
				{row.original.image && row.original.image.image_type === 'image' ? (
					<Image
						alt="Product image"
						className="aspect-square rounded-md object-cover"
						height="40"
						src={row.original.image.image as string}
						width="40"
					/>
				) : (
					<div className="icon">
						{row.original.image && (
							<DynamicIcon
								className="w-10 h-10"
								icon={row.original.image.image as string}
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
		accessorKey: 'crated_by',
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
