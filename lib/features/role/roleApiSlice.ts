import { StatusTypeApi } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const roleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<any, StatusTypeApi>({
			query: (payload) => `user-role?status=${payload}`,
			providesTags: (_result, _error, _arg) => {
				return ['Role'];
			},
		}),

		getRoleById: builder.query<any, any>({
			query: (id) => `user-role/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'Role', id: id }];
			},
		}),

		storeRole: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/user-role/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Role'];
			},
		}),

		updateRole: builder.mutation<any, { id: string; payload: any }>({
			query: ({ id, payload }) => ({
				url: `/user-role/update/${id}`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Role', 'Sidebar'];
			},
		}),

		deleteRole: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `user-role/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Role'],
		}),

		updateRoleStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `user-role/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: () => {
				return ['Role'];
			},
		}),
	}),
});

export const {
	useGetRolesQuery,
	useGetRoleByIdQuery,
	useStoreRoleMutation,
	useDeleteRoleMutation,
	useUpdateRoleStatusMutation,
	useUpdateRoleMutation,
} = roleApi;
