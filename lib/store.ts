'use client';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './features/counter/counterSlice';
import { quotesApiSlice } from './features/quotes/quotesApiSlice';
import { apiSlice } from './features/api/apiSlice';
import createSlice from './features/dev-permission/createSlice';
import roleSlice from './features/role/roleSlice';
import purchaseSlice from './features/purchases/purchaseSlice';
import posSlice from './features/pos-sell/posSlice';
import purchaseSliceV3 from './features/purchases/v3/actions-slice';

// const rootReducer = combineSlices(counterSlice, quotesApiSlice);
const rootReducer = combineReducers({
	counter: counterSlice.reducer,
	form: createSlice.reducer,
	quotesApi: quotesApiSlice.reducer,
	role: roleSlice.reducer,
	variantPos: posSlice.reducer,
	purchase: purchaseSliceV3.reducer,
	purchaseProductsSelect: purchaseSlice.reducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

//   export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',

		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(apiSlice.middleware);
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;
