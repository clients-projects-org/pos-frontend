import { ApiResponse } from '@/lib/type';
import { apiSlice } from '../../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSellPaymentHistory: builder.query<ApiResponse<any>, undefined>({
			query: (): string => `/payment-history/sell`,
		}),
	}),
});

export const { useGetSellPaymentHistoryQuery } = api;
