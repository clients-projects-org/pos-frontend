import { StatusType } from '@/lib/type';
import { createSlice, nanoid } from '@reduxjs/toolkit';
export type formType = {
	errors?: {
		routes?: {
			name?: {
				_errors?: string[] | undefined;
			};
		}[];
	};

	routes: {
		id: string;
		name: string;
		status: StatusType;
		value: boolean;
		errors?: {};
	}[];
};
// Initial state
const initialState: formType = {
	routes: [
		{
			id: nanoid(),
			name: '',
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
				status: 'active',

				value: false,
			});
		},

		updateRoute: (state, action) => {
			const { routeId, updates } = action.payload;
			const route = state.routes.find((route) => route.id === routeId);

			if (action.payload?.index !== undefined) {
				const index = action.payload.index;
				const routeErrors = state.errors?.routes?.[index];
				if (routeErrors?.name?._errors) {
					routeErrors.name._errors = [];
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
			return (state.routes = action.payload);
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
	updateRoute,
	reset,
	clearErrors,
	setErrors,
	editValueSet,
} = formSlice.actions;
export default formSlice;
