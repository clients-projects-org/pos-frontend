import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSupplier: builder.query<any, void>({
			query: (payload): string => `supplier?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Supplier'];
			},
		}),

		getSupplierById: builder.query<any, string>({
			query: (id) => `supplier/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Supplier', id: id }];
			},
		}),

		storeSupplier: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/supplier/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Supplier'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteSupplier: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `supplier/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Supplier'],
		}),

		updateSupplierStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `supplier/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Supplier', { type: 'Supplier', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteSupplierMutation,
	useGetSupplierQuery,
	useStoreSupplierMutation,
	useUpdateSupplierStatusMutation,
	useGetSupplierByIdQuery,
} = api;
