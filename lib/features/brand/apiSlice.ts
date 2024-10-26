'use client';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrand: builder.query<any, string>({
			query: (payload): string => `brand?status=${payload}`,
			providesTags: () => {
				return ['Brand'];
			},
		}),

		getBrandById: builder.query<any, string>({
			query: (id) => `brand/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'Brand', id: id }];
			},
		}),

		storeBrand: builder.mutation<any, any>({
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value as string);
				});
				return {
					url: `/brand/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},

			invalidatesTags: () => {
				return ['Brand', 'ProductsStoreData'];
			},
		}),

		updateBrand: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/brand/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Brand', 'ProductsStoreData'];
			},
		}),

		deleteBrand: builder.mutation<any, any>({
			query: ({ id }: any) => ({
				url: `brand/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Brand', 'ProductsStoreData'],
		}),

		updateBrandStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `brand/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (_result, _error, arg) => {
				return ['Brand', 'ProductsStoreData', { type: 'Brand', id: arg.id }];
			},
		}),
	}),
});

export const {
	useGetBrandQuery,
	useGetBrandByIdQuery,
	useStoreBrandMutation,
	useUpdateBrandMutation,
	useUpdateBrandStatusMutation,
	useDeleteBrandMutation,
} = api;
