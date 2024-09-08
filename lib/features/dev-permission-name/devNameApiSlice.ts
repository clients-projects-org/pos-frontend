import { apiSlice } from '../api/apiSlice';

export const devNameApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevName: builder.query<any, void>({
			query: (payload): string => `dev-name?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['DevName'];
			},
		}),

		getDevNameById: builder.query<any, string>({
			query: (id) => `dev-name/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'DevName', id: id }];
			},
		}),

		storeDevName: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/dev-name/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['DevName'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteDevName: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `dev-name/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DevName'],
		}),

		updateDevNameStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `dev-name/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['DevName', { type: 'DevName', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteDevNameMutation,
	useGetDevNameQuery,
	useStoreDevNameMutation,
	useUpdateDevNameStatusMutation,
	useGetDevNameByIdQuery,
} = devNameApi;
