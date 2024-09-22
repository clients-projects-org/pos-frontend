import { apiSlice } from '../api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategory: builder.query<any, string>({
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
			query: (payload) => {
				const body = new FormData();
				Object.entries(payload).forEach(([key, value]) => {
					body.append(key, value);
				});
				return {
					url: `/category/store`,
					method: 'POST',
					body,
					formData: true,
				};
			},
			invalidatesTags: () => {
				return ['Category', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		updateCategory: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: `/category/update/${payload._id}`,
					method: 'PUT',
					body: payload,
				};
			},

			invalidatesTags: () => {
				return ['Category', 'ProductsStoreData'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteCategory: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Category', 'ProductsStoreData'],
		}),

		updateCategoryStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `category/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return [
					'Category',
					'ProductsStoreData',
					{ type: 'Category', id: arg.id },
				];
			},
		}),
	}),
});

export const {
	useGetCategoryQuery,
	useGetCategoryByIdQuery,
	useStoreCategoryMutation,
	useUpdateCategoryMutation,
	useUpdateCategoryStatusMutation,
	useDeleteCategoryMutation,
} = categoryApi;
