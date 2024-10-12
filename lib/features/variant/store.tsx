'use client';
import { FormProvider } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { MultiSelector2, RFrom } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { useStoreVariantMutation } from './apiSlice';
import { createZodFrom, FormSchema, FormValues } from './unit.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export function Store() {
	const router = useRouter();

	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreVariantMutation();

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/variant-attributes');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFrom.RFInput
									label="Variant Name"
									methods={methods}
									name="name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFrom.RFStatus methods={methods} name="status" />
							</div>
						</div>
						<div className="col-span-6">
							<MultiSelector2
								label="Attributes"
								methods={methods}
								name="attributes"
								creatable
							/>
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
								{isLoading ? 'Creating...' : 'Create Variant'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
