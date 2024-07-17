import { env } from '@/lib/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: env.baseApi,
});

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,
	tagTypes: ['DevPermission'],
	keepUnusedDataFor: 50000,
});
