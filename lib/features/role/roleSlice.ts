import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PermissionState {
	[key: string]: {
		checked: boolean;
		children: { [key: string]: boolean };
	};
}

const initialState: PermissionState = {};

const roleSlice = createSlice({
	name: 'role-create',
	initialState,
	reducers: {
		toggleParent(state, action: PayloadAction<string>) {
			const parentId = action.payload;
			const parent = state[parentId];
			if (parent) {
				parent.checked = !parent.checked;
				Object.keys(parent.children).forEach(
					(childId) => (parent.children[childId] = parent.checked)
				);
			}
		},
		toggleChild(
			state,
			action: PayloadAction<{ parentId: string; childId: string }>
		) {
			const { parentId, childId } = action.payload;
			const parent = state[parentId];
			if (parent) {
				parent.children[childId] = !parent.children[childId];
			}
		},
		setPermissions(state, action: PayloadAction<PermissionState>) {
			return action.payload;
		},
	},
});

export const { toggleParent, toggleChild, setPermissions } = roleSlice.actions;
export default roleSlice;
