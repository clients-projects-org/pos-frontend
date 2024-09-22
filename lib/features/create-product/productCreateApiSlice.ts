import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<any, string>({
			query: (payload): string => `product?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Products'];
			},
		}),

		getStoreProduct: builder.query<any, string>({
			query: (): string => `product/store-data`,

			providesTags: (result, error, arg) => {
				return ['ProductsStoreData'];
			},
		}),

		getProductsById: builder.query<any, string>({
			query: (id) => `product/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Products', id: id }];
			},
		}),

		storeProducts: builder.mutation<any, string>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value);
				});
				return {
					url: `/product/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: () => {
				return ['Products'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateProducts: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/product/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Products'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteProducts: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `product/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Products'],
		}),

		updateProductsStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `product/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Products', { type: 'Products', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetStoreProductQuery,
	useGetProductsByIdQuery,
	useStoreProductsMutation,
	useUpdateProductsMutation,
	useUpdateProductsStatusMutation,
	useDeleteProductsMutation,
} = productApi;
