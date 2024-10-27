'use client';
import { FormProvider } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { RFrom, RFSelect } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { createZodFrom, FormSchema, FormValues } from './variant.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { CategoryType } from '@/lib/type';
import { useGetCategoryQuery } from '../category';
import { useStoreSubCategoryMutation } from './subCategoryApiSlice';
export function Store() {
	const router = useRouter();
	const category = useGetCategoryQuery('active');

	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreSubCategoryMutation();

	async function onSubmit(data: FormValues) {
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/sub-category');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	// const methods = useForm();
	return (
		<div className="max-w-5xl mx-auto w-full border p-4 rounded">
			<FormProvider {...methods}>
				<Form {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
						<div className="grid grid-cols-12 gap-3">
							{/* Name */}
							<div className="col-span-8">
								<RFrom.RFInput
									label="Sub Category Name"
									methods={methods}
									name="name"
								/>
							</div>

							{/* Status */}
							<div className="col-span-4">
								<RFrom.RFStatus methods={methods} name="status" />
							</div>

							{/* Status */}
							<div className="col-span-6">
								<RFSelect
									methods={methods}
									data={category.data?.data}
									label="Category"
									name="category_id"
								>
									<SelectGroup>
										<SelectLabel>Category All List</SelectLabel>
										{category.data?.data?.map((dev: CategoryType) => (
											<SelectItem
												key={dev._id}
												className="capitalize"
												value={dev._id ? dev._id : ''}
											>
												{dev.name}
											</SelectItem>
										))}
									</SelectGroup>
								</RFSelect>
							</div>
						</div>

						<RFrom.RFTextarea methods={methods} />

						<div className="flex justify-end gap-3">
							<Link href="/inventory/sub-category/create">
								<Button
									disabled={isLoading}
									variant="destructive"
									type="button"
								>
									Cancel
								</Button>
							</Link>
							<Button disabled={isLoading} variant="default" type="submit">
								{isLoading ? 'Creating...' : 'Create Sub Category'}
							</Button>
						</div>
					</form>
				</Form>
			</FormProvider>
		</div>
	);
}
