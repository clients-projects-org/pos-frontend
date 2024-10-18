import { ApiResponse, PurchaseType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const purchaseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPurchase: builder.query<ApiResponse<PurchaseType>, string>({
			query: (payload): string => `purchase?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Purchase'];
			},
		}),

		getCreateDataPurchase: builder.query<any, void>({
			query: (): string => `purchase/create-data`,

			providesTags: (result, error, arg) => {
				return ['PurchasesCreateData'];
			},
		}),

		storePurchase: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/purchase/store`,
					method: 'POST',
					body: payload,
					formData: true,
				};
			},
			invalidatesTags: () => {
				return ['Purchase'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		receivePurchase: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/purchase/receive/${payload}`,
					method: 'GET',
				};
			},
			invalidatesTags: () => {
				return ['Purchase'];
			},
		}),

		addPaymentPurchase: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/purchase/add-payment/${payload._id}`,
					method: 'POST',
					body: payload,
				};
			},
			invalidatesTags: () => {
				return ['Purchase'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		// .....................................

		updatePurchase: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/purchase/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Purchase'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deletePurchase: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `purchase/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Purchase'],
		}),

		updatePurchaseStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `purchase/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Purchase', { type: 'Purchase', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetPurchaseQuery,
	useReceivePurchaseMutation,
	useGetCreateDataPurchaseQuery,
	useStorePurchaseMutation,
	useUpdatePurchaseMutation,
	useUpdatePurchaseStatusMutation,
	useDeletePurchaseMutation,
	useAddPaymentPurchaseMutation,
} = purchaseApi;
