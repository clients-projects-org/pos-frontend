import { apiSlice } from '../api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSubCategory: builder.query<any, string>({
			query: (payload): string => `sub-category?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['SubCategory'];
			},
		}),

		getSubCategoryById: builder.query<any, string>({
			query: (id) => `sub-category/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'SubCategory', id: id }];
			},
		}),

		storeSubCategory: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/sub-category/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['SubCategory', 'ProductsStoreData'];
			},
		}),
		updateSubCategory: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/sub-category/update${payload._id}`,
				method: 'PUT',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['SubCategory', 'ProductsStoreData'];
			},
		}),

		deleteSubCategory: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `sub-category/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['SubCategory', 'ProductsStoreData'],
		}),

		updateSubCategoryStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `sub-category/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return [
					'SubCategory',
					'ProductsStoreData',
					{ type: 'SubCategory', id: arg.id },
				];
			},
		}),
	}),
});

export const {
	useDeleteSubCategoryMutation,
	useGetSubCategoryQuery,
	useStoreSubCategoryMutation,
	useUpdateSubCategoryStatusMutation,
	useGetSubCategoryByIdQuery,
	useUpdateSubCategoryMutation,
} = categoryApi;
