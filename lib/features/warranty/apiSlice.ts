import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getWarranty: builder.query<any, void>({
			query: (payload): string => `warranty?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Warranty'];
			},
		}),

		getWarrantyById: builder.query<any, string>({
			query: (id) => `warranty/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Warranty', id: id }];
			},
		}),

		storeWarranty: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/warranty/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Warranty'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateWarranty: builder.mutation<any, any>({
			query: (payload) => ({
				url: `warranty/update/${payload._id}`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Warranty'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteWarranty: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `warranty/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Warranty'],
		}),

		updateWarrantyStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `warranty/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Warranty', { type: 'Warranty', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteWarrantyMutation,
	useGetWarrantyQuery,
	useStoreWarrantyMutation,
	useUpdateWarrantyStatusMutation,
	useGetWarrantyByIdQuery,
	useUpdateWarrantyMutation,
} = api;
