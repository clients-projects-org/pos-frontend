import { DevNameType, RoleDetailsType } from '@/lib/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface actionType {
	permissionData: DevNameType[];
	roleData: RoleDetailsType[];
}
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
								code: route.code,
								name: route.name,
								status: route.status,
								checked: false,
							};
						}),
				};
			});
			state.data = modifiedData;
		},
		setEditPermissions(state, action: PayloadAction<actionType>) {
			const roleData = action.payload.roleData;
			const permissionData = action.payload.permissionData;

			const modifiedData = permissionData?.map((main) => {
				// Find matching role data for the current permission
				const matchingRole = roleData.find((role) => role._id === main._id);

				// Map over routes and check if they match the permissions in roleData
				const routes = main.routes
					?.filter((route) => route.status === 'active')
					?.map((route) => {
						// Find if the route in permission matches the role's child permissions
						const matchingChild = matchingRole?.children.find(
							(child) => child.permission_id === route._id
						);

						return {
							_id: route._id,
							parent_id: main._id,
							name: route.name,
							code: route.code,
							status: route.status,
							checked: matchingChild ? true : false, // Set checked if matching
						};
					});

				// Check if all routes are checked
				const allRoutesChecked = routes?.every((route) => route.checked);

				return {
					_id: main._id,
					name: main.name,
					checked: allRoutesChecked || false, // Set parent checked if all routes are checked
					routes,
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

export const { setPermissions, toggleParent, toggleChild, setEditPermissions } =
	roleSlice.actions;
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
