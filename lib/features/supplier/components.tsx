'use client';
import { DynamicIcon } from '@/components/actions';
import {
	DropDownDotItem,
	DropDownThreeDot,
} from '@/components/custom/list-item';
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
import { SupplierType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';
import { useParams, useRouter } from 'next/navigation';
import {
	useDeleteSupplierMutation,
	useUpdateSupplierStatusMutation,
} from './apiSlice';
import { handleDelete, handleStatusChange } from '@/lib/actions';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Column: ColumnDef<SupplierType>[] = [
	TableItem.SelectBox(),
	TableItem.ImageIcon(),
	TableItem.Text('name', 'Name'),
	TableItem.Text('business_name', 'Business Name'),
	TableItem.Text('email', 'Email'),
	TableItem.Text('phone', 'Phone'),
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
		cell: ({ row }: any) => {
			return (
				<div className="capitalize whitespace-nowrap">
					{row.original.createdBy?.name ? (
						<>
							{row.original.createdBy?.name && (
								<Badge className="capitalize" variant="outline">
									{row.original.createdBy.name}
								</Badge>
							)}
						</>
					) : (
						'N/A'
					)}
				</div>
			);
		},
	},
	TableItem.Date('createdAt', 'Created at'),
	TableItem.Status(),

	{
		id: 'actions',
		header: () => 'Actions',
		cell: ({ row }) => {
			return <Actions data={row.original} />;
		},
	},
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
			{/* <DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className=" ">
						<DynamicIcon icon="File" className="h-4 w-4 sm:mr-2" />
						<span className="sr-only sm:not-sr-only">Export</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Filter by</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu> */}
		</>
	);
};
const Actions = ({ data }: { data: SupplierType }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleting, { isLoading }] = useDeleteSupplierMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateSupplierStatusMutation();

	const loading = isLoading || updateStatusLoading;

	/*
		if main id ok fine only [main id] 
		if routes need [main id] and [routes id] 
		if actions need [main id] and [routes id] and [actions id]
	*/
	const statusHandler = async (id: string, status: StatusType) => {
		handleStatusChange(id, status, updateStatus);
	};

	return (
		<DropDownThreeDot
			isLoading={isLoading || updateStatusLoading}
			icon="MoreHorizontal"
		>
			<DropDownDotItem
				icon="SquarePen"
				name="Edit"
				onChange={() => {
					router.push(`/peoples/suppliers/edit-${data._id}`);
				}}
				disabled={loading}
			/>
			<DropDownDotItem
				icon="ScanEye"
				name="View"
				onChange={() => {
					router.push(`/peoples/suppliers/${data._id}`);
				}}
				disabled={loading}
			/>
			<DropdownMenuSeparator />
			{data.status !== 'active' && (
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Active"
					onChange={() => data._id && statusHandler(data._id, 'active')}
					disabled={loading}
				/>
			)}

			{data.status !== 'deactivated' && (
				<DropDownDotItem
					icon="CircleSlash2"
					name="Deactivated"
					onChange={() => data._id && statusHandler(data._id, 'deactivated')}
					disabled={loading}
				/>
			)}

			{data.status !== 'draft' && (
				<DropDownDotItem
					icon="PackageX"
					name="Draft"
					onChange={() => data._id && statusHandler(data._id, 'draft')}
					disabled={loading}
				/>
			)}
			{data.status === 'draft' && (
				<DropDownDotItem
					icon="Trash2"
					name="Delete"
					onChange={() => data._id && handleDelete(data._id, deleting)}
					disabled={loading}
				/>
			)}
		</DropDownThreeDot>
	);
};

const Add = () => {
	return (
		<TableItem.AddLink
			href="/peoples/suppliers/create"
			icon="PlusCircle"
			text="Add Supplier"
		/>
	);
};

export const Components = { Filter, Add, Column };
