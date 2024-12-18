import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getStore: builder.query<any, any>({
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

		storeStore: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/store/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: () => {
				return ['Store', 'ProductsStoreData'];
			},
		}),

		updateStore: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/store/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},
			invalidatesTags: () => {
				return ['Store', 'ProductsStoreData'];
			},
		}),

		deleteStore: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `store/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: () => {
				return ['Store', 'ProductsStoreData'];
			},
		}),

		updateStoreStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `store/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Store', 'ProductsStoreData', { type: 'Store', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetStoreQuery,
	useGetStoreByIdQuery,
	useStoreStoreMutation,
	useUpdateStoreMutation,
	useUpdateStoreStatusMutation,
	useDeleteStoreMutation,
} = api;
