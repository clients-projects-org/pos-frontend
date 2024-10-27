'use client';
import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authLogin: builder.mutation<any, any>({
			query: (payload) => ({
				url: `/auth/login`,
				method: 'POST',
				body: payload,
			}),
		}),
	}),
});

export const { useAuthLoginMutation } = api;
