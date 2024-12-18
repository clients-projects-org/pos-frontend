import { ApiResponse, ProductType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';
import { InvoiceType } from '@/lib/type/invoice-type';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPOS: builder.query<
			ApiResponse<any[]>,
			{
				search?: string;
				brand?: string;
				category?: string;
				subCategory?: string;
			}
		>({
			query: ({
				search = '',
				brand = '',
				category = '',
				subCategory = '',
			}): string => {
				let queryParams = `pos?`;
				if (search) queryParams += `&search=${search}`;
				if (brand) queryParams += `&brand=${brand}`;
				if (category) queryParams += `&category=${category}`;
				if (subCategory) queryParams += `&subCategory=${subCategory}`;
				return queryParams;
			},
			providesTags: () => {
				return ['POS'];
			},
		}),

		getInventoryProduct: builder.query<ApiResponse<ProductType>, string>({
			query: (payload): string => `inventory/${payload}`,
			providesTags: () => {
				return ['POS'];
			},
		}),
		getSellInvoice: builder.query<ApiResponse<InvoiceType>, string>({
			query: (payload): string => `pos/sell-invoice/${payload}`,
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
		addPaymentSell: builder.mutation<ReturnType<any>, any>({
			query: (payload) => {
				return {
					url: `/pos/add-payment/${payload._id}`,
					method: 'POST',
					body: payload,
				};
			},
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
	useGetSellInvoiceQuery,
	useAddPaymentSellMutation,
} = api;
