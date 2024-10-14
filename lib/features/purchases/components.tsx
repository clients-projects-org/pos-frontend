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
import { ProductType, PurchaseType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { badge, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import {
	useDeletePurchaseMutation,
	useUpdatePurchaseStatusMutation,
} from './purchaseApiSlice';
import { PurchaseStoreModal } from './store';
import { PurchaseStoreModalNew } from './new-create';
import { Badge } from '@/components/ui/badge';

const Column: ColumnDef<PurchaseType>[] = [
	TableItem.SelectBox(),
	{
		accessorKey: 'reference_number',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Reference Number
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => <div>#{row.getValue('reference_number')}</div>,
	},
	TableItem.SupplierName(),
	{
		accessorKey: 'purchase_status',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Purchase Status
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},

		cell: ({ row }: any) => (
			<div className="capitalize  text-center">
				<Badge
					variant={
						row.getValue('purchase_status') === 'ordered'
							? 'default'
							: 'secondary'
					}
				>
					{row.getValue('purchase_status')}
				</Badge>
			</div>
		),
	},

	TableItem.Date('purchase_date', 'Purchase Date'),

	{
		accessorKey: 'payment_status',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Payment Status
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},

		cell: ({ row }: any) => (
			<div className="capitalize  text-center">
				<Badge
					variant={
						row.getValue('payment_status') === 'due'
							? 'destructive'
							: 'secondary'
					}
				>
					{row.getValue('payment_status')}
				</Badge>
			</div>
		),
	},

	TableItem.Text('quantity', 'Purchase Qty'),
	TableItem.Text('quantity', 'Return Qty'),
	TableItem.Text('grand_total', 'Amount'),

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
		</>
	);
};
const Actions = ({ data }: { data: PurchaseType }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleting, { isLoading }] = useDeletePurchaseMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdatePurchaseStatusMutation();

	const loading = isLoading || updateStatusLoading;

	const handleDelete = async (id: string) => {
		try {
			const confirmed = await confirm({
				message:
					'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				title: 'Delete Account',
			});

			if (confirmed) {
				// Perform the delete action here
				await deleting({ id }).unwrap();
				const options: ToastOptions = {
					title: 'Successfully Deleted',
					description: 'Item delete is done, You can not find it, Thanks',
					autoClose: true,
					autoCloseDelay: 5000,
				};
				showToast(options);
				if (params.slug.startsWith('permission')) {
					console.log('first');
					router.push('/user-management/roles-permissions');
				}
			} else {
				console.log('Delete action cancelled');
			}
		} catch (err) {
			console.error('Failed to delete the permission: ', err);
		}
	};

	/*
		if main id ok fine only [main id] 
		if routes need [main id] and [routes id] 
		if actions need [main id] and [routes id] and [actions id]
	*/

	const handleStatusChange = async (status: StatusType) => {
		try {
			await updateStatus({ id: data._id, status }).unwrap();
		} catch (err) {
			console.error('Failed to update the status: ', err);
		}
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
					router.push(`/inventory/category/edit-${data._id}`);
				}}
				disabled={loading}
			/>
			<DropDownDotItem
				icon="ScanEye"
				name="View"
				onChange={() => {
					router.push(`/inventory/category/${data._id}`);
				}}
				disabled={loading}
			/>
			<DropdownMenuSeparator />
			{data.status !== 'active' && data.status !== 'new' && (
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Active"
					onChange={() => data._id && handleStatusChange('active')}
					disabled={loading}
				/>
			)}

			{data.status !== 'deactivated' && data.status !== 'new' && (
				<DropDownDotItem
					icon="CircleSlash2"
					name="Deactivated"
					onChange={() => data._id && handleStatusChange('deactivated')}
					disabled={loading}
				/>
			)}

			{data.status !== 'draft' && data.status !== 'new' && (
				<DropDownDotItem
					icon="PackageX"
					name="Draft"
					onChange={() => data._id && handleStatusChange('draft')}
					disabled={loading}
				/>
			)}
			{(data.status === 'draft' || data.status === 'new') && (
				<DropDownDotItem
					icon="Trash2"
					name="Delete"
					onChange={() => data._id && handleDelete(data._id)}
					disabled={loading}
				/>
			)}
		</DropDownThreeDot>
	);
};

const Add = () => {
	return <PurchaseStoreModalNew />;
	// return <PurchaseStoreModal />;
};

export const PurchaseComponents = { Filter, Add, Column };
