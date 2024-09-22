import { env } from '@/lib/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
	baseUrl: env.baseApi,
	prepareHeaders: async (headers) => {
		const session = await getSession(); // Get session from NextAuth

		if (session?.accessToken) {
			headers.set('Authorization', `Bearer ${session.accessToken}`);
		}

		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,

	tagTypes: [
		'DevPermission',
		'DevName',
		'Role',
		'User',
		'Category',
		'SubCategory',
		'Brand',
		'Unit',
		'Variant',
		'Warranty',
		'Customer',
		'Supplier',
		'Store',
		'Warehouse',
		'Coupon',
		'Sidebar',
		'Products',
		'ProductsStoreData',
	],
	keepUnusedDataFor: 50000,
});
