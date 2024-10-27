'use client';
import { ApiResponse } from '@/lib/type';
import { apiSlice } from '../api/apiSlice';
import { AllSettingsType } from './all-settings.interface';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		allSettings: builder.query<ApiResponse<AllSettingsType>, void>({
			query: () => `all-settings`,
		}),
	}),
});

export const { useAllSettingsQuery } = userApi;
