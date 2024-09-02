import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSidebar: builder.query<any, void>({
			query: (): string => `sidebar`,
			providesTags: (_result, _error, arg) => {
				return ['Sidebar', { type: 'Sidebar', status: arg }];
			},
		}),

		getSidebarById: builder.query<any, string>({
			query: (id) => `sidebar/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'Sidebar', id: id }];
			},
		}),

		storeSidebar: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/sidebar/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return [
					'Sidebar',
					{ type: 'Sidebar', status: 'all' },
					{ type: 'Sidebar', status: 'active' },
					{ type: 'Sidebar', status: 'deactivated' },
					{ type: 'Sidebar', status: 'draft' },
				];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteSidebar: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `sidebar/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Sidebar'],
		}),

		updateSidebarStatus: builder.mutation<any, any>({
			query: ({ id, status, type }) => ({
				url: `sidebar/status/${id}`,
				method: 'PUT',
				body: { status, type },
			}),

			invalidatesTags: (_result, _error, arg) => {
				return ['Sidebar', { type: 'Sidebar', id: arg.type.mainId }];
			},
		}),
	}),
});

export const {
	useDeleteSidebarMutation,
	useGetSidebarQuery,
	useStoreSidebarMutation,
	useUpdateSidebarStatusMutation,
	useGetSidebarByIdQuery,
} = api;