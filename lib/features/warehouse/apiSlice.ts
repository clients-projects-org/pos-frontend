import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWarehouse: builder.query<any, void>({
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
			query: (payload) => ({
				url: `/warehouse/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Warehouse'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteWarehouse: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `warehouse/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Warehouse'],
		}),

		updateWarehouseStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `warehouse/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Warehouse', { type: 'Warehouse', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteWarehouseMutation,
	useGetWarehouseQuery,
	useStoreWarehouseMutation,
	useUpdateWarehouseStatusMutation,
	useGetWarehouseByIdQuery,
} = api;
