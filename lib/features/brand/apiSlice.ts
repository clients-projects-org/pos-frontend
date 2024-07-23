import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrand: builder.query<any, void>({
			query: (payload): string => `brand?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Brand'];
			},
		}),

		getBrandById: builder.query<any, string>({
			query: (id) => `brand/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Brand', id: id }];
			},
		}),

		storeBrand: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/brand/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Brand'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteBrand: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `brand/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Brand'],
		}),

		updateBrandStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `brand/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Brand', { type: 'Brand', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteBrandMutation,
	useGetBrandQuery,
	useStoreBrandMutation,
	useUpdateBrandStatusMutation,
	useGetBrandByIdQuery,
} = api;
