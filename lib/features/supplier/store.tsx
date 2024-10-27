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
import { useStoreSupplierMutation } from './apiSlice';
import { customerStoreImageInfo } from '@/lib/image-size';
import { createZodFrom, FormSchema, FormValues } from './supplier.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export function Store() {
	const router = useRouter();

	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreSupplierMutation();

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/peoples/suppliers');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	const watching = methods.watch();
	// const methods = useForm();
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
									label="Supplier Name"
									methods={methods}
									name="name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFrom.RFStatus methods={methods} name="status" />
							</div>
						</div>

						<div className="grid grid-cols-12 gap-3">
							{/* email  */}
							<div className="col-span-12">
								<RFrom.RFInput
									label="Business Name"
									methods={methods}
									name="business_name"
								/>
							</div>

							{/* email  */}
							<div className="col-span-6">
								<RFrom.RFInput label="Email" methods={methods} name="email" />
							</div>

							{/* phone  */}
							<div className="col-span-6">
								<RFrom.RFInput label="Phone" methods={methods} name="phone" />
							</div>
						</div>

						<RFrom.RFTextarea
							methods={methods}
							label="Address"
							name="address"
						/>
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
								{isLoading ? 'Creating...' : 'Create Supplier'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
