import { apiSlice } from '../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<any, void>({
			query: () => `user-role`,
		}),
	}),
});

export const { useGetRolesQuery } = authApi;
