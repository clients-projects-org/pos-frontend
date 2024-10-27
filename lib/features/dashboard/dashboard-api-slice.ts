'use client';
import { ApiResponse } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';
import { AllSettingsType } from './dashboard.interface';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		dashboardAdminStatistics: builder.query<ApiResponse<AllSettingsType>, void>(
			{
				query: () => `/dashboard/admin-statistics`,
				providesTags: () => ['DashboardAdminStatistics'],
			}
		),
	}),
});

export const { useDashboardAdminStatisticsQuery } = userApi;
