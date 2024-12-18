'use client';
import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { Badge } from '@/components/ui/badge';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { RoleType, StatusType } from '@/lib/type';

import { badge, confirm, handleDelete } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
	useDeleteRoleMutation,
	useUpdateRoleStatusMutation,
} from './roleApiSlice';

const Actions = ({ data }: { data: RoleType }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleting, { isLoading }] = useDeleteRoleMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateRoleStatusMutation();

	const loading = isLoading || updateStatusLoading;

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
				variant={data.status !== undefined ? badge(data.status) : undefined}
				className={`text-xs capitalize py-1`}
			>
				{data.status}
			</Badge>

			{/* custom dropdown component  */}
			<DropDownThreeDot isLoading={isLoading || updateStatusLoading}>
				<DropDownDotItem
					icon="SquarePen"
					name="Edit"
					onChange={() => {
						router.push(
							`/user-management/roles-permissions/edit_role-${data._id}`
						);
					}}
					disabled={loading}
				/>
				<DropDownDotItem
					icon="ScanEye"
					name="View"
					onChange={() => {
						router.push(`/user-management/roles-permissions/role-${data._id}`);
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
						onChange={() => data._id && handleDelete(data._id, deleting)}
						disabled={loading}
					/>
				)}
			</DropDownThreeDot>
		</div>
	);
};

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

export const RoleComponents = { Actions, Filter };
