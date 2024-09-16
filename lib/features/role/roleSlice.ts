import {
	DevNameType,
	MenuType,
	MenuTypeRoleState,
	RoleDetailsType,
} from '@/lib/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface actionType {
	permissionData: DevNameType[];
	roleData: RoleDetailsType[];
}
interface PermissionState {
	data: DevNameType[];
	sidebarData: MenuTypeRoleState[];
}

const initialState: PermissionState = {
	data: [],
	sidebarData: [],
};

const roleSlice = createSlice({
	name: 'role-create',
	initialState,
	reducers: {
		setPermissions(state, action: PayloadAction<PermissionState>) {
			const modifiedData = action.payload.data?.map((main) => {
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

			const modifiedSidebarData = action.payload.sidebarData
				?.filter((item) => item.show)
				?.map((main) => {
					return {
						_id: main._id,
						title: main.title,
						checked: false,
						show: main.show,
						sidebarChildren: main.sidebarChildren
							?.filter((status) => status.show)
							?.map((route) => {
								return {
									_id: route._id,
									parent_id: main._id,
									name: route.name,
									checked: false,
									show: route.show,
									children: route.children
										?.filter((status) => status.show)
										?.map((child) => {
											return {
												_id: child._id,
												parent_id: route._id,
												name: child.name,
												show: child.show,
												checked: false,
											};
										}),
								};
							}),
					};
				});
			state.data = modifiedData;
			state.sidebarData = modifiedSidebarData;
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

		toggleParentSidebar(state, action: PayloadAction<string>) {
			const devId = action.payload;
			console.log(action, 'devId');

			const parent = state.sidebarData.find((dev) => dev._id === devId);
			if (parent) {
				// Toggle the parent's checked state
				parent.checked = !parent.checked;

				// Toggle all child routes to match the parent's state
				parent.sidebarChildren?.forEach((route) => {
					route.checked = parent.checked;

					route.children?.forEach((child) => {
						child.checked = parent.checked;
					});
				});
			}
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

		toggleChildSidebar(
			state,
			action: PayloadAction<{ devId: string; routeId: string }>
		) {
			const { devId, routeId } = action.payload;
			const parent = state.sidebarData.find((dev) => dev._id === devId);
			if (parent) {
				const route = parent.sidebarChildren?.find(
					(route) => route._id === routeId
				);
				if (route) {
					// Toggle only the child's checked state
					route.checked = !route.checked;
				}
			}
		},
		toggleChildChildrenSidebar(
			state,
			action: PayloadAction<{ devId: string; routeId: string; childId: string }>
		) {
			const { devId, routeId, childId } = action.payload;
			console.log(action, 'devId');
			const parent = state.sidebarData.find((dev) => dev._id === devId);
			if (parent) {
				const route = parent.sidebarChildren?.find(
					(route) => route._id === routeId
				);
				if (route) {
					// Toggle only the child's checked state
					const child = route.children?.find((child) => child._id === childId);
					// route.checked = !route.checked;
					if (child) {
						// Toggle only the child's checked state
						child.checked = !child.checked;
					}
				}
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

export const {
	setPermissions,
	toggleParent,
	toggleChild,
	setEditPermissions,
	toggleParentSidebar,
	toggleChildSidebar,
	toggleChildChildrenSidebar,
} = roleSlice.actions;
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
