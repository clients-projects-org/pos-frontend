'use client';
import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { Badge } from '@/components/ui/badge';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { RouteType, StatusType } from '@/lib/type';
import {
	useDeleteDevPermissionMutation,
	useUpdateStatusMutation,
} from './devPermissionSlice';
import { badge, handleDelete, handleStatusChange } from '@/lib/actions';
import { DevPermissionEditModal } from './DevPermissionStore';

const Actions = ({ data, isFor }: { data: RouteType; isFor?: 'child' }) => {
	const [deleting, { isLoading }] = useDeleteDevPermissionMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateStatusMutation();

	const loading = isLoading || updateStatusLoading;

	const statusHandler = async (id: string, status: StatusType) => {
		handleStatusChange(id, status, updateStatus);
	};

	return (
		<div className="ml-auto flex items-center gap-2">
			<Badge
				variant={data.status && badge(data.status)}
				style={{ fontSize: isFor === 'child' ? '10px' : '12px' }}
				className={`text-xs capitalize ${isFor === 'child' ? 'py-0' : 'py-1'}`}
			>
				{data.status}
			</Badge>

			{/* custom dropdown component  */}
			<DropDownThreeDot isLoading={isLoading || updateStatusLoading}>
				<DevPermissionEditModal data={data} />

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

const Filter = ({
	value,
	setValue,
}: {
	value: StatusType | 'all';
	setValue: Function;
}) => {
	const tabHandler = (status: StatusType | 'all') => {
		setValue(status);
	};
	return (
		<div className="mt-2">
			<TabList>
				<TabListItem
					name="All"
					onClick={() => tabHandler('all')}
					active={value === 'all'}
				/>

				<TabListItem
					name="Active"
					onClick={() => tabHandler('active')}
					active={value === 'active'}
				/>
				<TabListItem
					name="Deactivated"
					onClick={() => tabHandler('deactivated')}
					active={value === 'deactivated'}
				/>
				<TabListItem
					name="Draft"
					onClick={() => tabHandler('draft')}
					active={value === 'draft'}
				/>
			</TabList>
		</div>
	);
};

export const DevPermission = { Actions, Filter };
