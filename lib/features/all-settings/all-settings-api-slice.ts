import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allSettings: builder.query<any, void>({
			query: () => `all-settings`,
		}),
	}),
});

export const { useAllSettingsQuery } = userApi;
