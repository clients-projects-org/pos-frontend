import { apiSlice } from '../api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategory: builder.query<any, void>({
			query: (payload): string => `category?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Category'];
			},
		}),

		getCategoryById: builder.query<any, string>({
			query: (id) => `category/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Category', id: id }];
			},
		}),

		storeCategory: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/category/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Category'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteCategory: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Category'],
		}),

		updateCategoryStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `category/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Category', { type: 'Category', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteCategoryMutation,
	useGetCategoryQuery,
	useStoreCategoryMutation,
	useUpdateCategoryStatusMutation,
	useGetCategoryByIdQuery,
} = categoryApi;
