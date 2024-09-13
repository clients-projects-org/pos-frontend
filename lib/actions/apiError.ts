import { z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';
import { ApiErrorResponseType } from '../type';
import { showToast } from './tost';
import { env } from '../env';

// Define your ApiErrorResponse type

// Generic error handling function
export function apiErrorResponse<T extends z.ZodTypeAny>(
	error: unknown,
	methods: UseFormReturn<z.infer<T>>,
	FormSchema: T
) {
	if (error && typeof error === 'object' && 'data' in error) {
		const { data } = error as { data: ApiErrorResponseType };

		if (data.statusCode === 422 && !data.success) {
			data.errorMessages &&
				data.errorMessages.forEach((err) => {
					methods.setError(err.path as Path<z.infer<typeof FormSchema>>, {
						type: 'manual',
						message: err.message,
					});
				});
			showToast({
				title: 'Wait!',
				variant: 'destructive',
				description: data.message,
			});
		}
	} else {
		showToast({
			title: 'Error',
			variant: 'destructive',
			description: 'An error occurred, please try later',
		});
	}

	env.env === 'development' && console.error(error);
}
