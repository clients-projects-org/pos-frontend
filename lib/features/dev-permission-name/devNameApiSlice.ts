import { StatusTypeApi } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const devNameApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevName: builder.query<any, StatusTypeApi>({
			query: (payload: StatusTypeApi) => `dev-name?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['DevName'];
			},
		}),

		getDevNameById: builder.query<any, string>({
			query: (id) => `dev-name/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'DevName', id: id }];
			},
		}),

		storeDevName: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/dev-name/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['DevName'];
			},
		}),

		// update DevName
		updateDevName: builder.mutation<any, { id: string; data: any }>({
			query: ({ id, data }: { id: string; data: any }) => ({
				url: `/dev-name/update/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: () => {
				return ['DevName'];
			},
		}),

		deleteDevName: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `dev-name/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DevName'],
		}),

		updateDevNameStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `dev-name/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['DevName', { type: 'DevName', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteDevNameMutation,
	useGetDevNameQuery,
	useStoreDevNameMutation,
	useUpdateDevNameStatusMutation,
	useGetDevNameByIdQuery,
	useUpdateDevNameMutation,
} = devNameApi;
