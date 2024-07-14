import { apiSlice } from '../api/apiSlice';

export const devPermissionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevPermission: builder.query<any, void>({
			query: () => `dev-permission`,
		}),

		deleteDevPermission: builder.mutation<any, string>({
			query: (id) => ({
				url: `dev-permission/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useGetDevPermissionQuery, useDeleteDevPermissionMutation } =
	devPermissionApi;
