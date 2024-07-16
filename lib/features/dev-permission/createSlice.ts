import { StatusType } from '@/lib/type';
import { createSlice, nanoid } from '@reduxjs/toolkit';
export type formType = {
	name: string;
	status: StatusType;
	routes: {
		id: string;
		name: string;
		image: string;
		image_type: 'icon';
		status: StatusType;
		value: boolean;
		actions: {
			id: string;
			image: string;
			image_type: 'icon';
			name: string;
			status: StatusType;
			value: boolean;
		}[];
	}[];
};
// Initial state
const initialState: formType = {
	name: '',
	status: 'active',
	routes: [
		{
			id: nanoid(),
			name: '',
			image: 'BadgeAlert',
			image_type: 'icon',
			status: 'active',
			actions: [
				{
					id: nanoid(),
					image: 'Atom',
					image_type: 'icon',
					name: '',
					status: 'active',
					value: false,
				},
			],
			value: false,
		},
	],
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		addRoute(state) {
			state.routes.push({
				id: nanoid(),
				name: '',
				image: 'BadgeAlert',
				image_type: 'icon',
				status: 'active',
				actions: [
					{
						id: nanoid(),
						image: 'Atom',
						image_type: 'icon',
						name: '',
						status: 'active',
						value: false,
					},
				],
				value: false,
			});
		},
		updateField: (state, action) => {
			const { key, value } = action.payload;
			state[key as 'name' | 'status'] = value;
		},

		updateRoute: (state, action) => {
			const { routeId, updates } = action.payload;
			const route = state.routes.find((route) => route.id === routeId);
			if (route) {
				Object.assign(route, updates);
			}
		},
		updateAction: (state, action) => {
			const { routeId, actionId, updates } = action.payload;
			const route = state.routes.find((route) => route.id === routeId);
			if (route) {
				const action = route.actions.find((action) => action.id === actionId);
				if (action) {
					Object.assign(action, updates);
				}
			}
		},
		removeRoute(state, action) {
			const { routeId } = action.payload;
			state.routes = state.routes.filter((route) => route.id !== routeId);
		},
		addAction(state, action) {
			const { routeId } = action.payload;
			const route = state.routes.find((r) => r.id === routeId);
			if (route) {
				route.actions.push({
					id: nanoid(),
					image: 'Atom',
					image_type: 'icon',
					name: '',
					status: 'active',
					value: false,
				});
			}
		},
		removeAction(state, action) {
			const { routeId, actionId } = action.payload;
			const route = state.routes.find((r) => r.id === routeId);
			if (route) {
				route.actions = route.actions.filter(
					(action) => action.id !== actionId
				);
			}
		},

		reset: () => initialState,
	},
});

export const {
	addRoute,
	removeRoute,
	addAction,
	removeAction,
	updateAction,
	updateField,
	updateRoute,
	reset,
} = formSlice.actions;
export default formSlice;
