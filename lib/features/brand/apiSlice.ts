import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrand: builder.query<any, void>({
			query: (payload): string => `brand?status=${payload}`,
			providesTags: (_result, _error, arg) => {
				return ['Brand', { type: 'Brand', status: arg }];
			},
		}),

		getBrandById: builder.query<any, string>({
			query: (id) => `brand/${id}`,
			providesTags: (_result, _error, id) => {
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
				return [
					'Brand',
					{ type: 'Brand', status: 'all' },
					{ type: 'Brand', status: 'active' },
					{ type: 'Brand', status: 'deactivated' },
					{ type: 'Brand', status: 'draft' },
				];
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

			invalidatesTags: (_result, _error, arg) => {
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
