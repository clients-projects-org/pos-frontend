import { apiSlice } from '../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<any, string>({
			query: (payload): string => `product?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Products'];
			},
		}),

		getCreateDataPurchase: builder.query<any, void>({
			query: (): string => `purchase/create-data`,

			providesTags: (result, error, arg) => {
				return ['PurchasesCreateData'];
			},
		}),

		storeProducts: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					if (key === 'store_id') {
						value?.forEach((item: any) => {
							body.append('store_id[]', item);
						});
					} else if (key === 'gallery_images') {
						value?.forEach((item: any) => {
							body.append('gallery_images', item);
						});
					} else {
						body.append(key, value);
					}
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

		deleteProducts: builder.mutation<any, any>({
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
	useGetCreateDataPurchaseQuery,
	useStoreProductsMutation,
	useUpdateProductsMutation,
	useUpdateProductsStatusMutation,
	useDeleteProductsMutation,
} = productApi;
