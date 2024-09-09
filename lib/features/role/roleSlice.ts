import { DevNameType } from '@/lib/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PermissionState {
	data: DevNameType[];
}

const initialState: PermissionState = {
	data: [],
};

const roleSlice = createSlice({
	name: 'role-create',
	initialState,
	reducers: {
		setPermissions(state, action: PayloadAction<DevNameType[]>) {
			const modifiedData = action.payload?.map((main) => {
				return {
					_id: main._id,
					name: main.name,
					checked: false,
					routes: main.routes
						?.filter((status) => status.status === 'active')
						?.map((route) => {
							return {
								_id: route._id,
								parent_id: main._id,
								name: route.name,
								status: route.status,
								checked: false,
							};
						}),
				};
			});
			state.data = modifiedData;
		},

		toggleParent(state, action: PayloadAction<string>) {
			const devId = action.payload;

			const parent = state.data.find((dev) => dev._id === devId);
			if (parent) {
				// Toggle the parent's checked state
				parent.checked = !parent.checked;

				// Toggle all child routes to match the parent's state
				parent.routes?.forEach((route) => {
					route.checked = parent.checked;
				});
			}
		},

		toggleChild(
			state,
			action: PayloadAction<{ devId: string; routeId: string }>
		) {
			const { devId, routeId } = action.payload;
			const parent = state.data.find((dev) => dev._id === devId);
			if (parent) {
				const route = parent.routes?.find((route) => route._id === routeId);
				if (route) {
					// Toggle only the child's checked state
					route.checked = !route.checked;

					// Check if all children are checked or not to update parent
					const allChecked = parent.routes?.every((route) => route.checked);

					// Update parent's checked state based on children
					parent.checked = allChecked ? true : false;
				}
			}
		},
	},
});

export const { setPermissions, toggleParent, toggleChild } = roleSlice.actions;
export default roleSlice;

export const getCheckedRoutes = (permissions: DevNameType[]) => {
	// Flatten all routes from all permissions, filter by checked status and active status
	return permissions.flatMap(
		(permission) =>
			permission.routes?.filter(
				(route) => route.checked && route.status === 'active'
			) || []
	);
};
