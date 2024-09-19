'use client';
import { FormProvider } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { RFrom } from '@/components/custom/form';
import { useParams, useRouter } from 'next/navigation';
import { useUpdateBrandMutation, useGetBrandByIdQuery } from './apiSlice';
import { editZodFrom, FormSchemaEdit, FormValuesEdit } from './brand.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageDetailsApiHOC } from '@/components/hoc';
export function Edit() {
	const router = useRouter();
	const { slug } = useParams();

	const { data, isError, isFetching, error, isLoading } = useGetBrandByIdQuery(
		(slug as string).split('-')[1]
	);
	console.log(data);
	const { methods } = editZodFrom(data?.data);

	const [update, { isLoading: isLoadingUpdate }] = useUpdateBrandMutation();

	async function onSubmit(data: FormValuesEdit) {
		try {
			const response = await update({
				...data,
				_id: (slug as string).split('-')[1],
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/peoples/suppliers');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchemaEdit);
		}
	}
	// const methods = useForm();
	// const onSubmit = (data) => console.log(data);
	return (
		<PageDetailsApiHOC
			data={{ data: true, success: true }}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching || isLoading || isLoadingUpdate}
			error={error}
		>
			<div className="max-w-5xl mx-auto w-full border p-4 rounded">
				<FormProvider {...methods}>
					<Form {...methods}>
						<form
							onSubmit={methods.handleSubmit(onSubmit)}
							className="space-y-3"
						>
							<div className="grid grid-cols-12 gap-3">
								{/* Name */}
								<div className="col-span-8">
									<RFrom.RFInput
										label="Customer Name"
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
										disabled={isLoadingUpdate}
										variant="destructive"
										type="button"
									>
										Cancel
									</Button>
								</Link>
								<Button
									disabled={isLoadingUpdate}
									variant="default"
									type="submit"
								>
									{isLoadingUpdate ? 'Updating...' : 'Update Customer'}
								</Button>
							</div>
						</form>
					</Form>
				</FormProvider>
			</div>
		</PageDetailsApiHOC>
	);
}
