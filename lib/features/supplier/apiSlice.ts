import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSupplier: builder.query<any, string>({
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

		storeSupplier: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/supplier/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['Supplier', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateSupplier: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/supplier/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Supplier', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteSupplier: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `supplier/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Supplier', 'ProductsStoreData'],
		}),

		updateSupplierStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `supplier/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return [
					'Supplier',
					'ProductsStoreData',
					{ type: 'Supplier', id: arg.id },
				];
			},
		}),
	}),
});

export const {
	useGetSupplierQuery,
	useGetSupplierByIdQuery,
	useStoreSupplierMutation,
	useUpdateSupplierMutation,
	useUpdateSupplierStatusMutation,
	useDeleteSupplierMutation,
} = api;
