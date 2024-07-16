import { apiSlice } from '../api/apiSlice';

export const devPermissionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevPermission: builder.query<any, void>({
			query: (payload) => `dev-permission?status=${payload ? payload : ''}`,
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

		updateStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `dev-permission/status/${id}`,
				method: 'PUT',
				body: { status },
			}),
		}),
	}),
});

export const {
	useGetDevPermissionQuery,
	useDeleteDevPermissionMutation,
	useStoreDevPermissionMutation,
	useUpdateStatusMutation,
} = devPermissionApi;
