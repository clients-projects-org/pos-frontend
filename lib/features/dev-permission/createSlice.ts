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
			image: '',
			image_type: 'icon',
			status: 'active',
			actions: [
				{
					id: nanoid(),
					image: '',
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
				image: '',
				image_type: 'icon',
				status: 'active',
				actions: [
					{
						id: nanoid(),
						image: '',
						image_type: 'icon',
						name: '',
						status: 'active',
						value: false,
					},
				],
				value: false,
			});
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
					image: '',
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
	},
});

export const { addRoute, removeRoute, addAction, removeAction } =
	formSlice.actions;
export default formSlice;
