'use client';
import { FormProvider } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ImageIcoRadio, RFrom } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { customerStoreImageInfo } from '@/lib/image-size';
import { createZodFrom, FormSchema, FormValues } from './category.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStoreCategoryMutation } from './categoryApiSlice';
export function Store() {
	const router = useRouter();

	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreCategoryMutation();

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/category');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	const watching = methods.watch();
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={methods.control}
							name="image_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image or Icon</FormLabel>
									<FormControl>
										<ImageIcoRadio {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{watching.image_type === 'image' ? (
							<RFrom.RFImage<FormValues>
								methods={methods}
								imageInfo={customerStoreImageInfo}
							/>
						) : (
							<div className="space-y-2   ">
								<RFrom.RFIcon methods={methods} label={false} />
							</div>
						)}
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFrom.RFInput
									label="Category Name"
									methods={methods}
									name="name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFrom.RFStatus methods={methods} name="status" />
							</div>
						</div>

						<RFrom.RFTextarea methods={methods} />

						<div className="flex justify-end gap-3">
							<Link href="/peoples/customers">
								<Button
									disabled={isLoading}
									variant="destructive"
									type="button"
								>
									Cancel
								</Button>
							</Link>
							<Button disabled={isLoading} variant="default" type="submit">
								{isLoading ? 'Creating...' : 'Create Category'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
