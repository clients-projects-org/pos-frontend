import { apiSlice } from '../api/apiSlice';

export const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCoupon: builder.query<any, void>({
			query: (payload): string => `coupon?status=${payload}`,
			providesTags: (result, error, arg) => {
				return ['Coupon'];
			},
		}),

		getCouponById: builder.query<any, string>({
			query: (id) => `coupon/${id}`,
			providesTags: (result, error, id) => {
				return [{ type: 'Coupon', id: id }];
			},
		}),

		storeCoupon: builder.mutation<any, string>({
			query: (payload) => ({
				url: `/coupon/store`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: () => {
				return ['Coupon'];
			},
			// invalidatesTags: ['DevPermission'],
		}),

		deleteCoupon: builder.mutation<any, string>({
			query: ({ id }: any) => ({
				url: `coupon/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Coupon'],
		}),

		updateCouponStatus: builder.mutation<any, any>({
			query: ({ id, status }) => ({
				url: `coupon/status/${id}`,
				method: 'PUT',
				body: { status },
			}),

			invalidatesTags: (result, error, arg) => {
				return ['Coupon', { type: 'Coupon', id: arg.id }];
			},
		}),
	}),
});

export const {
	useDeleteCouponMutation,
	useGetCouponQuery,
	useStoreCouponMutation,
	useUpdateCouponStatusMutation,
	useGetCouponByIdQuery,
} = api;
