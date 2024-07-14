import {
	DropDownDotItem,
	DropDownThreeDot,
	TabList,
	TabListItem,
} from '@/components/custom/list-item';
import { Badge } from '@/components/ui/badge';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DevPermissionType } from '@/lib/type';
import {
	useDeleteDevPermissionMutation,
	useGetDevPermissionQuery,
} from './devPermissionSlice';
import { badge, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';
import { ToastAction } from '@/components/ui/toast';

const Actions = ({ data }: { data: DevPermissionType }) => {
	const { refetch } = useGetDevPermissionQuery();
	const [deleteDevPermission, { isLoading }] = useDeleteDevPermissionMutation();

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
	return (
		<div className="ml-auto flex items-center gap-2">
			<Badge variant={badge(data.status)} className="text-xs capitalize">
				{data.status}
			</Badge>

			<DropDownThreeDot isLoading={isLoading}>
				<DropDownDotItem
					icon="SquarePen"
					name="Edit"
					onChange={() => {
						alert('edit');
					}}
					disabled={isLoading}
				/>
				<DropDownDotItem
					icon="ScanEye"
					name="View"
					onChange={() => {}}
					disabled={isLoading}
				/>
				<DropdownMenuSeparator />
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Active"
					onChange={() => {}}
					disabled={isLoading}
				/>
				<DropDownDotItem
					icon="CircleSlash2"
					name="Disable"
					onChange={() => {}}
					disabled={isLoading}
				/>
				<DropDownDotItem
					icon="Trash2"
					name="Delete"
					onChange={() => data.id && handleDelete(data.id)}
					disabled={isLoading}
				/>
			</DropDownThreeDot>
		</div>
	);
};

const Filter = () => {
	return (
		<div className="mt-2">
			<TabList>
				<TabListItem
					name="All"
					onClick={() => {
						alert('all');
					}}
					active
				/>
				<TabListItem name="Active" onClick={() => {}} />
				<TabListItem name="Deactivated" onClick={() => {}} />
				<TabListItem name="Draft" onClick={() => {}} />
			</TabList>
		</div>
	);
};

export const DevPermission = { Actions, Filter };
