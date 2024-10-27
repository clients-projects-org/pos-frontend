import { apiSlice } from '../api/apiSlice';
import { ProductTypeView, ProductVariant } from './product.type';
type ResponseByIdType = {
	message: string;
	statusCode: number;
	success: boolean;
	data: {
		product: ProductTypeView;
		variants: ProductVariant[] | null;
	};
};
export const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<any, string>({
			query: (payload): string => `product?status=${payload}`,
			providesTags: () => {
				return ['Products'];
			},
		}),

		getStoreProduct: builder.query<any, any>({
			query: (): string => `product/store-data`,

			providesTags: () => {
				return ['ProductsStoreData'];
			},
		}),

		getProductsById: builder.query<ResponseByIdType, string>({
			query: (id) => `product/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'Products', id: id }];
			},
		}),

		getProductsSupplierById: builder.query<any, string>({
			query: (id) => `product/by-supplier/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'Products', id: id }];
			},
		}),

		storeProducts: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					if (key === 'store_id') {
						(value as any[])?.forEach((item: any) => {
							body.append('store_id[]', item);
						});
					} else if (key === 'warehouse_id') {
						(value as any[])?.forEach((item: any) => {
							body.append('warehouse_id[]', item);
						});
					} else if (key === 'gallery_images') {
						(value as any[])?.forEach((item: any) => {
							body.append('gallery_images', item);
						});
					} else if (key === 'tags') {
						(value as any[])?.forEach((item: any) => {
							body.append('tags[]', item);
						});
					} else if (key === 'variants') {
						body.append('variants', JSON.stringify(value));
					} else if (key === 'image') {
						body.append('image', value ? value : (null as any));
					} else {
						body.append(key, value as any);
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

			invalidatesTags: (_result, _error, arg) => {
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
	useGetProductsSupplierByIdQuery,
} = productApi;
