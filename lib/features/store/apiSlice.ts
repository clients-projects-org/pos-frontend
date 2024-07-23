import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStore: builder.query<any, void>({
			query: (payload): string => `store?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Store'];
			},
		}),

		getStoreById: builder.query<any, string>({
			query: (id) => `store/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Store', id: id }];
			},
		}),

		storeStore: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/store/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Store'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteStore: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `store/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Store'],
		}),

		updateStoreStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `store/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Store', { type: 'Store', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteStoreMutation,
	useGetStoreQuery,
	useStoreStoreMutation,
	useUpdateStoreStatusMutation,
	useGetStoreByIdQuery,
} = api;
