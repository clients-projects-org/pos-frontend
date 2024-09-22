import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWarehouse: builder.query<any, string>({
			query: (payload): string => `warehouse?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Warehouse'];
			},
		}),

		getWarehouseById: builder.query<any, string>({
			query: (id) => `warehouse/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Warehouse', id: id }];
			},
		}),

		storeWarehouse: builder.mutation<any, string>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value);
				});
				return {
					url: `/warehouse/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['Warehouse', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateWarehouse: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/warehouse/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Warehouse', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteWarehouse: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `warehouse/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Warehouse', 'ProductsStoreData'],
		}),

		updateWarehouseStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `warehouse/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return [
					'Warehouse',
					'ProductsStoreData',
					{ type: 'Warehouse', id: arg.id },
				];
			},
		}),
	}),
});

export const {
	useGetWarehouseQuery,
	useGetWarehouseByIdQuery,
	useStoreWarehouseMutation,
	useUpdateWarehouseMutation,
	useUpdateWarehouseStatusMutation,
	useDeleteWarehouseMutation,
} = api;
