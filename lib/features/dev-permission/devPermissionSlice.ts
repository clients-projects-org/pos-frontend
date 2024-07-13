import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevPermission: builder.query<any, void>({
			query: () => `dev-permission`,
		}),
	}),
});

export const { useGetDevPermissionQuery } = authApi;
