import { StatusTypeApi } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const devPermissionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevPermission: builder.query<any, StatusTypeApi>({
			query: (payload: StatusTypeApi) => `dev-permission?status=${payload}`,
			providesTags: () => {
				return ['DevPermission', 'DevName'];
			},
		}),

		deleteDevPermission: builder.mutation<any, { id: string }>({
			query: ({ id }) => ({
				url: `dev-permission/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DevPermission', 'DevName'],
		}),

		storeDevPermission: builder.mutation<any, string>({
			query: (payload) => ({
				url: `dev-permission/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['DevPermission', 'DevName'];
			},
		}),

		editDevPermission: builder.mutation<any, string>({
			query: (payload) => ({
				url: `dev-permission/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['DevPermission', 'DevName'];
			},
		}),

		updateStatus: builder.mutation<any, { id: string; status: StatusTypeApi }>({
			query: ({ id, status }) => ({
				url: `dev-permission/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: () => {
				return ['DevPermission', 'DevName'];
			},
		}),
		// update DevPermission
		updateDevPermission: builder.mutation<any, { id: string; data: any }>({
			query: ({ id, data }: { id: string; data: any }) => ({
				url: `dev-permission/update/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: () => {
				return ['DevPermission', 'DevName'];
			},
		}),

		getById: builder.query<any, string>({
			query: (id) => `dev-permission/${id}`,
			providesTags: (_result, _error, id) => {
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
	useEditDevPermissionMutation,
	useUpdateDevPermissionMutation,
} = devPermissionApi;
