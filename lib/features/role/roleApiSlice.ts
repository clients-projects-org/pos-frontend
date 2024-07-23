import { apiSlice } from '../api/apiSlice';

export const roleApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query<any, void>({
			query: (payload): string => `user-role?status=${payload}`,
			providesTags: (result, error, arg) => {
 				return ['Role'];
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
	useStoreRoleMutation,
	useDeleteRoleMutation,
	useUpdateRoleStatusMutation,
} = roleApi;
