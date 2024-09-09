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
	useUpdateStatusMutation,
} from './devPermissionSlice';
import { badge, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { DevPermissionEditModal } from './DevPermissionStore';

type typeProps = {
	type: 'routes' | 'main' | 'actions';
	mainId?: string;
	actionsId?: string;
	routesId?: string;
};
const Actions = ({
	data,
	isFor,
	type = {
		type: 'main',
	},
}: {
	data: DevPermissionType;
	isFor?: 'child';
	type?: typeProps;
}) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();

	const [deleteDevPermission, { isLoading }] = useDeleteDevPermissionMutation();

	const [updateStatus, { isLoading: updateStatusLoading }] =
		useUpdateStatusMutation();

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
				await deleteDevPermission({ id, type }).unwrap();
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
			await updateStatus({ id: data._id, status, type }).unwrap();
		} catch (err) {
			console.error('Failed to update the status: ', err);
		}
	};

	return (
		<div className="ml-auto flex items-center gap-2">
			<Badge
				variant={badge(data.status)}
				style={{ fontSize: isFor === 'child' ? '10px' : '12px' }}
				className={`text-xs capitalize ${isFor === 'child' ? 'py-0' : 'py-1'}`}
			>
				{data.status}
			</Badge>

			{/* custom dropdown component  */}
			<DropDownThreeDot isLoading={isLoading || updateStatusLoading}>
				{/* <DropDownDotItem
					icon="SquarePen"
					name="Edit"
					onChange={() => {
						router.push(
							`/user-management/roles-permissions/edit_permission-${data._id}`
						);
					}}
					disabled={loading}
				/> */}
				<DevPermissionEditModal data={data} />
				<DropDownDotItem
					icon="ScanEye"
					name="View"
					onChange={() => {
						router.push(
							`/user-management/roles-permissions/permission-${data._id}`
						);
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

export const DevPermission = { Actions, Filter };
