import { StatusType } from '@/lib/type';
import { createSlice, nanoid } from '@reduxjs/toolkit';
export type formType = {
	name: string;
	errors?: {
		name?: {
			_errors?: string[] | undefined;
		};
		routes?: {
			name?: {
				_errors?: string[] | undefined;
			};
		}[];
	};
	status: StatusType;
	routes: {
		id: string;
		name: string;
		image: string;
		image_type: 'icon';
		status: StatusType;
		value: boolean;
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
			image: 'BoxSelect',
			image_type: 'icon',
			status: 'active',

			value: false,
			errors: {},
		},
	],
	errors: {},
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		addRoute(state) {
			state.routes.push({
				id: nanoid(),
				name: '',
				image: 'BoxSelect',
				image_type: 'icon',
				status: 'active',

				value: false,
			});
		},
		updateField: (state, action) => {
			const { key, value } = action.payload;
			state[key as 'name' | 'status'] = value;
			if (state.errors && state.errors.name) {
				state.errors.name._errors = [];
			}
		},

		updateRoute: (state, action) => {
			const { routeId, updates } = action.payload;
			const route = state.routes.find((route) => route.id === routeId);
			if (action.payload?.index !== undefined) {
				const index = action.payload.index;
				if (
					state.errors &&
					state.errors.routes &&
					state.errors.routes[index] &&
					state.errors.routes[index].name
				) {
					state.errors.routes[index].name._errors = [];
				}
			}

			if (route) {
				Object.assign(route, updates);
			}
		},

		removeRoute(state, action) {
			const { routeId } = action.payload;
			state.routes = state.routes.filter((route) => route.id !== routeId);
		},

		editValueSet(state, action) {
			return (state = action.payload);
		},

		setErrors(state, action) {
			state.errors = action.payload;
		},
		clearErrors(state) {
			state.errors = {};
		},

		reset: () => initialState,
	},
});

export const {
	addRoute,
	removeRoute,
	updateField,
	updateRoute,
	reset,
	clearErrors,
	setErrors,
	editValueSet,
} = formSlice.actions;
export default formSlice;
