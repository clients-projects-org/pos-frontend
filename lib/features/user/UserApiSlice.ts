import { ApiResponse, StatusTypeApi, UserType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<any, StatusTypeApi>({
			query: (payload: StatusTypeApi) => `user?status=${payload}`,
			providesTags: () => {
				return ['User'];
			},
		}),

		storeUser: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/user/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['User'];
			},
		}),

		// update user
		updateUser: builder.mutation<any, { id: string; data: any }>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload.data).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/user/update/${payload.id}`,
					method: 'PUT',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['User'];
			},
		}),

		deleteUser: builder.mutation<any, any>({
			query: ({ id, type }: any) => ({
				url: `user/${id}`,
				method: 'DELETE',
				body: { type },
			}),
			invalidatesTags: ['User'],
		}),

		getUserById: builder.query<ApiResponse<UserType>, any>({
			query: (id) => `user/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'User', id: id }];
			},
		}),

		updateUserStatus: builder.mutation<any, any>({
			query: ({ id, status, type }) => ({
				url: `user/status/${id}`,
				method: 'PUT',
				body: { status, type },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['User'];
			},
		}),
	}),
});

export const {
	useGetUserQuery,
	useStoreUserMutation,
	useDeleteUserMutation,
	useUpdateUserStatusMutation,
	useGetUserByIdQuery,
	useUpdateUserMutation,
} = userApi;
