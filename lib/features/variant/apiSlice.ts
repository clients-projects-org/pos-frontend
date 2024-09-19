import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getVariant: builder.query<any, string>({
			query: (payload): string => `variant?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Variant'];
			},
		}),

		getVariantById: builder.query<any, string>({
			query: (id) => `variant/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Variant', id: id }];
			},
		}),

		storeVariant: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/variant/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Variant'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateVariant: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/variant/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Variant'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteVariant: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `variant/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Variant'],
		}),

		updateVariantStatus: builder.mutation<any, any>({
			query: ({ id, status }) => {
				console.log(id, status, 'fire');
				return {
					url: `variant/status/${id}`,
					method: 'PUT',
					body: { status },
				};
			},

			invalidatesTags: (result, error, arg) => {
				return ['Variant', { type: 'Variant', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetVariantQuery,
	useGetVariantByIdQuery,
	useStoreVariantMutation,
	useUpdateVariantMutation,
	useUpdateVariantStatusMutation,
	useDeleteVariantMutation,
} = api;
