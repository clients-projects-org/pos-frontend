import { StatusTypeApi } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<any, StatusTypeApi>({
			query: (payload: StatusTypeApi) => `user?status=${payload}`,
			providesTags: () => {
				return ['User'];
			},
		}),

		storeUser: builder.mutation<any, string>({
			query: (payload) => {
				const body = new FormData();
				// body.append('Content-Type', 'multipart/form-data');
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value);
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

		getUserById: builder.query<any, string>({
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
} = userApi;
