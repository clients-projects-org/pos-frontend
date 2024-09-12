'use client';
import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DevNameType, StatusType } from '@/lib/type';
import {
	useDeleteDevNameMutation,
	useUpdateDevNameStatusMutation,
} from './devNameApiSlice';
import { badge, handleDelete, handleStatusChange } from '@/lib/actions';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { DevNameEditModal } from './DevNameStore';

// tab list Filter
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

// actions
const Actions = ({ data, isFor }: { data: DevNameType; isFor?: string }) => {
	// api call
	const [deleting, { isLoading }] = useDeleteDevNameMutation();
	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateDevNameStatusMutation();

	// loading
	const loading = isLoading || updateStatusLoading;

	// status change
	const statusHandler = async (id: string, status: StatusType) => {
		handleStatusChange(id, status, updateStatus);
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
		</div>
	);
};

export const DevNameComponents = {
	Filter,
	Actions,
};
