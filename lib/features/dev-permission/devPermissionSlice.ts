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

		storeDevPermission: builder.mutation<any, string>({
			query: (payload) => ({
				url: `dev-permission/store`,
				method: 'POST',
				body: payload,
			}),
		}),
	}),
});

export const {
	useGetDevPermissionQuery,
	useDeleteDevPermissionMutation,
	useStoreDevPermissionMutation,
} = devPermissionApi;
