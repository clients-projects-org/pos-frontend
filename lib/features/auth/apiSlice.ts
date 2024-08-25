import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		authLogin: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/auth/login`,
				method: 'POST',
				body: payload,
			}),
		}),
	}),
});

export const { useAuthLoginMutation } = api;
