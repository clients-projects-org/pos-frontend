import { ApiResponse, PurchaseType, ReturnType } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

type GetCreateData = {
	statusCode: number;
	success: boolean;
	message: string;
	data: {
		supplier: {
			_id: string;
			name: string;
			business_name: string;
		}[];
		paymentMethod: {
			_id: string;
			name: string;
		}[];
		product: {
			_id: string;
			supplier_id: {
				_id: string;
				name: string;
				business_name: string;
			};
			warehouse_id: {
				_id: string;
				name: string;
			}[];
			store_id: {
				_id: string;
				name: string;
			}[];
			name: string;
			sell_price: number;
		}[];
		variant: {
			_id: string;
			name: string;
			attributes: {
				name: string;
				_id: string;
			}[];
		}[];
		unit: {
			_id: string;
			name: string;
		}[];
		warranty: {
			_id: string;
			name: string;
		}[];
	};
};
export const purchaseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPurchase: builder.query<ApiResponse<any>, string>({
			query: (payload): string => `purchase?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Purchase'];
			},
		}),

		getCreateDataPurchase: builder.query<GetCreateData, any>({
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
				return ['Purchase', 'DashboardAdminStatistics'];
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
				return ['Purchase', 'DashboardAdminStatistics'];
			},
		}),

		addPaymentPurchase: builder.mutation<ReturnType<any>, any>({
			query: (payload) => {
				return {
					url: `/purchase/add-payment/${payload._id}`,
					method: 'POST',
					body: payload,
				};
			},
			invalidatesTags: () => {
				return ['Purchase', 'DashboardAdminStatistics'];
			},
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
