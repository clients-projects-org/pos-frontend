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
import { CouponType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';
import { useParams, useRouter } from 'next/navigation';
import {
	useDeleteCouponMutation,
	useUpdateCouponStatusMutation,
} from './apiSlice';
import { confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';

const Column: ColumnDef<CouponType>[] = [
	TableItem.SelectBox(),
	TableItem.ImageIcon(),
	TableItem.Text('name', 'Name'),
	TableItem.Status(),
	TableItem.Text('code', 'Code'),
	TableItem.Text('created_by', 'Created by'),
	TableItem.Date('createdAt', 'Created at'),

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
			<DropdownMenu>
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
			</DropdownMenu>
		</>
	);
};
const Actions = ({ data }: { data: CouponType }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleting, { isLoading }] = useDeleteCouponMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateCouponStatusMutation();

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
					router.push('/user-management/roles-permissions');
				}
			} else {
				//
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
					router.push(`/promo/coupons/edit-${data._id}`);
				}}
				disabled={loading}
			/>
			<DropDownDotItem
				icon="ScanEye"
				name="View"
				onChange={() => {
					router.push(`/promo/coupons/${data._id}`);
				}}
				disabled={loading}
			/>
			<DropdownMenuSeparator />
			{data.status !== 'active' && (
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Active"
					onChange={() => data._id && handleStatusChange('active')}
					disabled={loading}
				/>
			)}

			{data.status !== 'deactivated' && (
				<DropDownDotItem
					icon="CircleSlash2"
					name="Deactivated"
					onChange={() => data._id && handleStatusChange('deactivated')}
					disabled={loading}
				/>
			)}

			{data.status !== 'draft' && (
				<DropDownDotItem
					icon="PackageX"
					name="Draft"
					onChange={() => data._id && handleStatusChange('draft')}
					disabled={loading}
				/>
			)}
			{data.status === 'draft' && (
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
	return (
		<TableItem.AddLink
			href="/promo/coupons/create"
			icon="PlusCircle"
			text="Add Coupon"
		/>
	);
};

export const Components = { Filter, Add, Column };
