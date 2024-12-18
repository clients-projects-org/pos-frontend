import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUnit: builder.query<any, string>({
			query: (payload): string => `unit?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Unit'];
			},
		}),

		getUnitById: builder.query<any, string>({
			query: (id) => `unit/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Unit', id: id }];
			},
		}),

		storeUnit: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/unit/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Unit', 'ProductsStoreData'];
			},
		}),

		updateUnit: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/unit/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Unit', 'ProductsStoreData'];
			},
		}),

		deleteUnit: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `unit/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Unit', 'ProductsStoreData'],
		}),

		updateUnitStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `unit/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Unit', { type: 'Unit', id: arg.id }, 'ProductsStoreData'];
			},
		}),
	}),
});

export const {
	useGetUnitQuery,
	useGetUnitByIdQuery,
	useStoreUnitMutation,
	useUpdateUnitMutation,
	useUpdateUnitStatusMutation,
	useDeleteUnitMutation,
} = api;
