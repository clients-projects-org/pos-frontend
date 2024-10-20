import { ApiResponse } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPOS: builder.query<ApiResponse<any>, string>({
			query: (payload): string => `pos?status=${payload}`,
			// providesTags: () => {
			// 	return ['POS'];
			// },
		}),
	}),
});

export const { useGetPOSQuery } = api;
