import { ApiResponse, ProductType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPOS: builder.query<ApiResponse<any[]>, string>({
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

		getPosSellHistory: builder.query<ApiResponse<any>, undefined>({
			query: (): string => `pos/sell-history`,
			providesTags: () => {
				return ['POS'];
			},
		}),

		storePosSell: builder.mutation<any, any>({
			query: (payload) => ({
				url: `pos/sell-store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['POS', 'DashboardAdminStatistics'];
			},
		}),
	}),
});

export const {
	useGetPOSQuery,
	useGetInventoryProductQuery,
	useGetPosSellHistoryQuery,
	useStorePosSellMutation,
} = api;
