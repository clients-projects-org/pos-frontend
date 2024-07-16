'use client';
import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { Badge } from '@/components/ui/badge';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DevPermissionType, StatusType } from '@/lib/type';
import {
	useDeleteDevPermissionMutation,
	useGetDevPermissionQuery,
	useUpdateStatusMutation,
} from './devPermissionSlice';
import { badge, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import { ToastAction } from '@/components/ui/toast';
import { useState } from 'react';

const Actions = ({ data, refetch }: { data: DevPermissionType }) => {
	const [deleteDevPermission, { isLoading }] = useDeleteDevPermissionMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateStatusMutation();

	const loading = isLoading || updateStatusLoading;

	const handleDelete = async (payload: string) => {
		try {
			const confirmed = await confirm({
				message:
					'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				title: 'Delete Account',
			});

			if (confirmed) {
				// Perform the delete action here
				await deleteDevPermission(payload).unwrap();
				refetch(); // Assuming refetch is a function to refresh data
				const options: ToastOptions = {
					title: 'Scheduled: Catch up',
					description: 'Friday, February 10, 2023 at 5:57 PM',
					action: (
						<ToastAction altText="Goto schedule to undo">Undo</ToastAction>
					),
					autoClose: true,
					autoCloseDelay: 5000,
				};
				showToast(options);
			} else {
				console.log('Delete action cancelled');
			}
		} catch (err) {
			console.error('Failed to delete the permission: ', err);
		}
	};

	const handleStatusChange = async (status: StatusType) => {
		try {
			await updateStatus({ id: data.id, status }).unwrap();
			refetch();
		} catch (err) {
			console.error('Failed to update the status: ', err);
		}
	};

	return (
		<div className="ml-auto flex items-center gap-2">
			<Badge variant={badge(data.status)} className="text-xs capitalize">
				{data.status}
			</Badge>

			{/* custom dropdown component  */}
			<DropDownThreeDot isLoading={isLoading || updateStatusLoading}>
				<DropDownDotItem
					icon="SquarePen"
					name="Edit"
					onChange={() => {
						alert('edit');
					}}
					disabled={loading}
				/>
				<DropDownDotItem
					icon="ScanEye"
					name="View"
					onChange={() => {}}
					disabled={loading}
				/>
				<DropdownMenuSeparator />
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Active"
					onChange={() => data.id && handleStatusChange('active')}
					disabled={loading}
				/>
				<DropDownDotItem
					icon="CircleSlash2"
					name="Deactivated"
					onChange={() => data.id && handleStatusChange('deactivated')}
					disabled={loading}
				/>
				<DropDownDotItem
					icon="CircleSlash2"
					name="Draft"
					onChange={() => data.id && handleStatusChange('draft')}
					disabled={loading}
				/>
				<DropDownDotItem
					icon="Trash2"
					name="Delete"
					onChange={() => data.id && handleDelete(data.id)}
					disabled={loading}
				/>
			</DropDownThreeDot>
		</div>
	);
};

type ExtendedStatusType = StatusType | 'all';
const Filter = ({
	value,
	setValue,
}: {
	value: ExtendedStatusType;
	setValue: Function;
}) => {
	const statusHandler = (status: ExtendedStatusType) => {
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

export const DevPermission = { Actions, Filter };
