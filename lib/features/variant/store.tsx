'use client';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { RFrom } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { useStoreVariantMutation } from './apiSlice';
import { createZodFrom, FormSchema, FormValues } from './variant.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DynamicIcon } from '@/components/actions';

export function Store() {
	const router = useRouter();
	const { methods } = createZodFrom();
	const [store, { isLoading }] = useStoreVariantMutation();

	// Use useFieldArray to manage attributes
	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: 'attributes', // This should match the name in your form data
	});

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap(); // You can pass the data directly since attributes are managed by useFieldArray

			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/variant-attributes');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}

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

							{/* Dynamic Attributes */}
							<div className="col-span-6 flex flex-col gap-2">
								{fields.map((field, index) => (
									<div key={field.id} className="flex gap-2 flex-1">
										<div className="flex-1">
											<RFrom.RFInput
												label={`Attribute ${index + 1}`}
												methods={methods}
												name={`attributes[${index}].name`}
											/>
										</div>
										{fields.length > 1 && (
											<Button
												variant="destructive"
												size="icon"
												type="button"
												className="w-5 h-5"
												onClick={() => remove(index)}
											>
												<DynamicIcon icon="Minus" />
											</Button>
										)}
									</div>
								))}
								{fields.length < 15 && (
									<div className="text-end">
										<Button
											variant="secondary"
											size="icon"
											type="button"
											className="w-5 h-5"
											onClick={() => append({ name: '' })}
										>
											<DynamicIcon icon="Plus" />
										</Button>
									</div>
								)}
							</div>
						</div>

						<RFrom.RFTextarea methods={methods} />

						<div className="flex justify-end gap-3">
							<Link href="/inventory/variant-attributes/">
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
