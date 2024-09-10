import { StatusType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const roleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<any, StatusType>({
			query: (payload: StatusType) => `user-role?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Role'];
			},
		}),

		getRoleById: builder.query<any, string>({
			query: (id) => `user-role/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Role', id: id }];
			},
		}),

		storeRole: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/user-role/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Role'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateRole: builder.mutation<any, { id: string; payload: any }>({
			query: ({ id, payload }) => ({
				url: `/user-role/update/${id}`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Role'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteRole: builder.mutation<any, string>({
			query: ({ id, type }: any) => ({
				url: `user-role/${id}`,
				method: 'DELETE',
				body: { type },
			}),
			invalidatesTags: ['Role'],
		}),

		updateRoleStatus: builder.mutation<any, any>({
			query: ({ id, status, type }) => ({
				url: `user-role/status/${id}`,
				method: 'PUT',
				body: { status, type },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Role', { type: 'Role', id: arg.type.mainId }];
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
