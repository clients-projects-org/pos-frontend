'use client';
import { DynamicIcon } from '@/components/actions';
import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
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
import { DevNameType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
	useDeleteDevNameMutation,
	useUpdateDevNameStatusMutation,
} from './devNameApiSlice';
import { badge, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { DevNameEditModal } from './DevNameStore';

const categoryColumn: ColumnDef<DevNameType>[] = [
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
	const statusHandler = (status: StatusType | 'all') => {
		setValue(status);
	};
	return (
		<div className="mt-2">
			<TabList>
				<TabListItem
					name="All"
					onClick={() => statusHandler('all')}
					active={value === 'all'}
				/>

				<TabListItem
					name="Active"
					onClick={() => statusHandler('active')}
					active={value === 'active'}
				/>
				<TabListItem
					name="Deactivated"
					onClick={() => statusHandler('deactivated')}
					active={value === 'deactivated'}
				/>
				<TabListItem
					name="Draft"
					onClick={() => statusHandler('draft')}
					active={value === 'draft'}
				/>
			</TabList>
		</div>
	);
};

const Actions = ({ data, isFor }: { data: DevNameType; isFor?: string }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleting, { isLoading }] = useDeleteDevNameMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateDevNameStatusMutation();

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
		<div className="ml-auto flex items-center gap-2">
			<Badge
				variant={data?.status && badge(data?.status && data?.status)}
				style={{ fontSize: isFor === 'child' ? '10px' : '12px' }}
				className={`text-xs capitalize `}
			>
				{data.status}
			</Badge>
			<DropDownThreeDot
				isLoading={isLoading || updateStatusLoading}
				icon="MoreHorizontal"
			>
				{/* edit modal */}
				<DevNameEditModal data={data} />
				{/* view is off now need to add a modal for view all  */}
				{/* <DropDownDotItem
					icon="ScanEye"
					name="View"
					onChange={() => {
						router.push(`/inventory/category/${data._id}`);
					}}
					disabled={loading}
				/> */}
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
		</div>
	);
};

const AddCategory = () => {
	return (
		<Link
			href={'/inventory/category/create'}
			className="gap-1 flex items-center border px-3 py-2 text-sm rounded-sm hover:bg-slate-800"
		>
			<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
			<span className="sr-only sm:not-sr-only !whitespace-nowrap">
				Add Category
			</span>
		</Link>
	);
};

export const DevNameComponents = {
	Filter,
	AddCategory,
	categoryColumn,
	Actions,
};
