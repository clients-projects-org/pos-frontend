import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPaymentMethod: builder.query<any, string>({
			query: (payload): string => `payment-method?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['PaymentMethod'];
			},
		}),

		getPaymentMethodById: builder.query<any, any>({
			query: (id) => `payment-method/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'PaymentMethod', id: id }];
			},
		}),

		storePaymentMethod: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/payment-method/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['PaymentMethod'];
			},
		}),

		updatePaymentMethod: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/payment-method/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['PaymentMethod'];
			},
		}),

		deletePaymentMethod: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `payment-method/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['PaymentMethod'],
		}),

		updatePaymentMethodStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `payment-method/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['PaymentMethod', { type: 'PaymentMethod', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetPaymentMethodQuery,
	useGetPaymentMethodByIdQuery,
	useStorePaymentMethodMutation,
	useUpdatePaymentMethodMutation,
	useUpdatePaymentMethodStatusMutation,
	useDeletePaymentMethodMutation,
} = api;
