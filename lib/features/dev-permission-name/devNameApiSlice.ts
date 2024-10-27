'use client';

import { ApiResponse, DevNameType, StatusTypeApi } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const devNameApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDevName: builder.query<ApiResponse<DevNameType[]>, StatusTypeApi>({
			query: (payload: StatusTypeApi) => `dev-name?status=${payload}`,
			providesTags: (_result, _error, _arg) => {
				return ['DevName'];
			},
		}),

		getDevNameById: builder.query<ApiResponse<DevNameType>, string>({
			query: (id) => `dev-name/${id}`,
			providesTags: (_result, _error, id) => {
				return [{ type: 'DevName', id: id }];
			},
		}),

		storeDevName: builder.mutation<ApiResponse<DevNameType>, DevNameType>({
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
		updateDevName: builder.mutation<
			ApiResponse<DevNameType>,
			{ id: string; data: any }
		>({
			query: ({ id, data }: { id: string; data: any }) => ({
				url: `/dev-name/update/${id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: () => {
				return ['DevName'];
			},
		}),

		deleteDevName: builder.mutation<ApiResponse<DevNameType>, { id: string }>({
			query: ({ id }: { id: string }) => ({
				url: `dev-name/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['DevName'],
		}),

		updateDevNameStatus: builder.mutation<ApiResponse<DevNameType>, any>({
			query: ({ id, status }) => ({
				url: `dev-name/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (_result, _error, arg) => {
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
