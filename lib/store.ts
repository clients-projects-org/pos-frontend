import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './features/counter/counterSlice';
import { quotesApiSlice } from './features/quotes/quotesApiSlice';
import { apiSlice } from './features/api/apiSlice';

// const rootReducer = combineSlices(counterSlice, quotesApiSlice);
const rootReducer = combineReducers({
	counter: counterSlice.reducer,
	quotesApi: quotesApiSlice.reducer,
	[apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice.reducerPath
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
