import { ApiResponse, ProductType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPOS: builder.query<ApiResponse<ProductType[]>, string>({
			query: (payload): string => `pos?status=${payload}`,
			// providesTags: () => {
			// 	return ['POS'];
			// },
		}),

		getInventoryProduct: builder.query<ApiResponse<ProductType>, string>({
			query: (payload): string => `inventory/${payload}`,
			// providesTags: () => {
			// 	return ['POS'];
			// },
		}),
	}),
});

export const { useGetPOSQuery, useGetInventoryProductQuery } = api;
