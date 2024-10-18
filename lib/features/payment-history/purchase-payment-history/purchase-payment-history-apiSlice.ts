import { ApiResponse, PurchasePaymentHistoryType } from '@/lib/type';
import { apiSlice } from '../../api/apiSlice';

export const purchasePaymentHistoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPurchasePaymentHistory: builder.query<
			ApiResponse<PurchasePaymentHistoryType>,
			undefined
		>({
			query: (): string => `/payment-history/purchase`,
		}),
	}),
});

export const { useGetPurchasePaymentHistoryQuery } = purchasePaymentHistoryApi;
