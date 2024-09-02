import { apiSlice } from '../api/apiSlice';

export const devPermissionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevPermission: builder.query<any, void>({
			query: (payload) => `dev-permission?status=${payload}`,
			providesTags: (result, error, arg) => {
				console.log({ result, error, arg });
				return ['DevPermission', { type: 'DevPermission', status: arg }];
			},
		}),

		deleteDevPermission: builder.mutation<any, string>({
			query: ({ id, type }: any) => ({
				url: `dev-permission/${id}`,
				method: 'DELETE',
				body: { type },
			}),
			invalidatesTags: ['DevPermission'],
		}),

		storeDevPermission: builder.mutation<any, string>({
			query: (payload) => ({
				url: `dev-permission/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return [
					'DevPermission',
					{ type: 'DevPermission', status: 'all' },
					{ type: 'DevPermission', status: 'active' },
					{ type: 'DevPermission', status: 'deactivated' },
					{ type: 'DevPermission', status: 'draft' },
				];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateStatus: builder.mutation<any, any>({
			query: ({ id, status, type }) => ({
				url: `dev-permission/status/${id}`,
				method: 'PUT',
				body: { status, type },
			}),

			invalidatesTags: (result, error, arg) => {
				return [
					'DevPermission',
					{ type: 'DevPermission', id: arg.type.mainId },
					{ type: 'DevPermission', status: 'all' },
					{ type: 'DevPermission', status: 'active' },
					{ type: 'DevPermission', status: 'deactivated' },
					{ type: 'DevPermission', status: 'draft' },
				];
			},
		}),

		getById: builder.query<any, string>({
			query: (id) => `dev-permission/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'DevPermission', id: id }];
			},
		}),
	}),
});

export const {
	useGetDevPermissionQuery,
	useDeleteDevPermissionMutation,
	useStoreDevPermissionMutation,
	useUpdateStatusMutation,
	useGetByIdQuery,
} = devPermissionApi;
