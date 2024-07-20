import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<any, void>({
			query: (payload) => `user?status=${payload}`,
			providesTags: (result, error, arg) => {
				console.log({ result, error, arg });
				return ['User'];
			},
		}),

		storeUser: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/user/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['User'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteUser: builder.mutation<any, string>({
			query: ({ id, type }: any) => ({
				url: `user/${id}`,
				method: 'DELETE',
				body: { type },
			}),
			invalidatesTags: ['User'],
		}),

		updateUserStatus: builder.mutation<any, any>({
			query: ({ id, status, type }) => ({
				url: `user/status/${id}`,
				method: 'PUT',
				body: { status, type },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['User', { type: 'User', id: arg.type.mainId }];
			},
		}),
	}),
});

export const {
	useGetUserQuery,
	useStoreUserMutation,
	useDeleteUserMutation,
	useUpdateUserStatusMutation,
} = userApi;
