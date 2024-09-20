'use client';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCustomer: builder.query<any, void>({
			query: (payload): string => `customer?status=${payload}`,
			providesTags: () => {
				return ['Customer'];
			},
		}),

		getCustomerById: builder.query<any, string>({
			query: (id) => `customer/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Customer', id: id }];
			},
		}),

		storeCustomer: builder.mutation<any, string>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value);
				});
				return {
					url: `/customer/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['Customer'];
			},
		}),
		updateCustomer: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/customer/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Customer'];
			},
		}),

		deleteCustomer: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `customer/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Customer'],
		}),

		updateCustomerStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `customer/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Customer', { type: 'Customer', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteCustomerMutation,
	useGetCustomerQuery,
	useStoreCustomerMutation,
	useUpdateCustomerStatusMutation,
	useGetCustomerByIdQuery,
	useUpdateCustomerMutation,
} = api;
