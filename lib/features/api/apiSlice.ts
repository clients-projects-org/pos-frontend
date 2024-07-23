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
	tagTypes: [
		'DevPermission',
		'Role',
		'User',
		'Category',
		'SubCategory',
		'Brand',
		'Unit',
		'Warranty',
		'Customer',
		'Supplier',
		'Store',
		'Warehouse',
		'Coupon',
	],
	keepUnusedDataFor: 50000,
});
