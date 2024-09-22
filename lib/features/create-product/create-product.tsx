'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MultiSelector, MultiSelector2, RFrom } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { createZodFrom, FormSchema, FormValues } from './product.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import {
	useGetStoreProductQuery,
	useStoreProductsMutation,
} from './productCreateApiSlice';
import React, { useEffect } from 'react';
import { userStoreImageInfo } from '@/lib/image-size';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { StoreType, SupplierType } from '@/lib/type';
import { PageDetailsApiHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { CheckNecessaryData } from './check-necessary-data';
export function CreateProduct() {
	const router = useRouter();
	const { methods } = createZodFrom();

	const {
		data,
		isLoading: isLoadingData,
		isError,
		error,
	} = useGetStoreProductQuery();

	const [store, { isLoading }] = useStoreProductsMutation();

	async function onSubmit(eventData: FormValues) {
		try {
			const response = await store(eventData as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/products');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	const category = methods.watch('category_id');
	const checkError = methods.formState.errors;
	const testWatch = methods.watch();
	console.log(testWatch, 'firstName');
	console.log(checkError, 'checkError');

	useEffect(() => {
		// Whenever category_id changes, clear the sub_category_id
		if (category) {
			methods.resetField('sub_category_id'); // Clear sub_category_id field
		}
	}, [category, methods.resetField]);

	return (
		<PageDetailsApiHOC
			data={data}
			isFetching={isLoading}
			isLoading={isLoadingData}
			isError={isError}
			error={error}
		>
			<Motion>
				<CheckNecessaryData data={data?.data} />
				<Form {...methods}>
					<form className="mb-44 " onSubmit={methods.handleSubmit(onSubmit)}>
						<div className="grid w-full items-start gap-6">
							<div className="grid gap-6 rounded-lg border p-4 grid-cols-12">
								<div className="col-span-5 rounded-lg border p-4">
									<div className="grid gap-2">
										<RFrom.RFProductImage
											methods={methods}
											imageInfo={userStoreImageInfo}
										/>

										{/* <Image
									alt="Product image"
									className="aspect-square w-full rounded-md object-cover"
									height="300"
									src={imageSrc}
									// src={'https://ui.shadcn.com/placeholder.svg'}
									// src={
									// 	uploadedImage && uploadedImage.length > 0
									// 		? URL.createObjectURL(uploadedImage[0])
									// 		: 'https://ui.shadcn.com/placeholder.svg'
									// }
									width="300"
								/> */}
										<div className="grid grid-cols-2 gap-2">
											<RFrom.RFProductGalleryImage
												methods={methods}
												imageInfo={userStoreImageInfo}
											/>
										</div>
									</div>
								</div>
								<div className="col-span-7 rounded-lg border">
									<Accordion
										type="multiple"
										defaultValue={[
											'item-1',
											'item-2',
											'item-3',
											'item-4',
											'item-5',
										]}
										className="w-full"
									>
										<AccordionItem
											value="item-1"
											className="hover:bg-background border-b-0   w-full rounded-lg px-3 py-2 create_product_overflow_problem_select  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
										>
											<AccordionTrigger className="hover:no-underline text-xl bg-gray-200 dark:bg-gray-900 px-2 rounded-lg">
												Product From
											</AccordionTrigger>
											<AccordionContent className="p-5">
												<div className=" grid grid-cols-12 gap-x-4 gap-y-6">
													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.supplier}
															label="Supplier"
															name="supplier_id"
														>
															<SelectGroup>
																<SelectLabel>Supplier All List</SelectLabel>
																{data?.data?.supplier?.map(
																	(dev: SupplierType) => (
																		<SelectItem
																			key={dev._id}
																			className="capitalize"
																			value={dev._id}
																		>
																			{dev.name}
																		</SelectItem>
																	)
																)}
															</SelectGroup>
														</RFrom.RFSelect>
													</div>
													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.supplier}
															label="Warehouse"
															name="warehouse_id"
														>
															<SelectGroup>
																<SelectLabel>Warehouse All List</SelectLabel>
																{data?.data?.warehouse?.map(
																	(dev: SupplierType) => (
																		<SelectItem
																			key={dev._id}
																			className="capitalize"
																			value={dev._id}
																		>
																			{dev.name}
																		</SelectItem>
																	)
																)}
															</SelectGroup>
														</RFrom.RFSelect>
													</div>

													<div className="col-span-4">
														<MultiSelector2
															label="Store"
															methods={methods}
															name="store_id"
															OPTIONS={data?.data?.store?.map(
																(e: StoreType) => ({
																	label: e.name,
																	value: e._id,
																})
															)}
														/>
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem
											value="item-2"
											className="hover:bg-background border-b-0   w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
										>
											<AccordionTrigger className="hover:no-underline text-xl bg-gray-200 dark:bg-gray-900 px-2 rounded-lg">
												Product Info
											</AccordionTrigger>
											<AccordionContent className="p-5">
												<div className=" grid grid-cols-12 gap-x-4 gap-y-6">
													<div className="col-span-12">
														<RFrom.RFInput
															label="Product Name"
															methods={methods}
															name="name"
														/>
													</div>
													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.supplier}
															label="Category"
															name="category_id"
														>
															<SelectGroup>
																<SelectLabel>Category All List</SelectLabel>
																{data?.data?.category?.map(
																	(dev: SupplierType) => (
																		<SelectItem
																			key={dev._id}
																			className="capitalize"
																			value={dev._id}
																		>
																			{dev.name}
																		</SelectItem>
																	)
																)}
															</SelectGroup>
														</RFrom.RFSelect>
													</div>
													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.subCategory}
															label="Sub Category"
															name="sub_category_id"
														>
															<SelectGroup>
																<SelectLabel>Sub Category All List</SelectLabel>
																{data?.data?.subCategory
																	?.filter(
																		(e: any) => e.category_id === category
																	)
																	?.map((dev: SupplierType) => (
																		<SelectItem
																			key={dev._id}
																			className="capitalize"
																			value={dev._id}
																		>
																			{dev.name}
																		</SelectItem>
																	))}
															</SelectGroup>
														</RFrom.RFSelect>
													</div>
													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.Brand}
															label="Brand"
															name="brand_id"
														>
															<SelectGroup>
																<SelectLabel>Brand All List</SelectLabel>
																{data?.data?.brand?.map((dev: SupplierType) => (
																	<SelectItem
																		key={dev._id}
																		className="capitalize"
																		value={dev._id}
																	>
																		{dev.name}
																	</SelectItem>
																))}
															</SelectGroup>
														</RFrom.RFSelect>
													</div>

													<div className="col-span-12">
														<RFrom.RFTextarea
															methods={methods}
															label="Short Description"
															name="sort_description"
														/>
													</div>

													<div className="col-span-12">
														<RFrom.RFTextarea
															methods={methods}
															label="Long Description"
															name="long_description"
														/>
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>

										<AccordionItem
											value="item-3"
											className="hover:bg-background border-b-0   w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
										>
											<AccordionTrigger className="hover:no-underline text-xl bg-gray-200 dark:bg-gray-900 px-2 rounded-lg">
												Pricing & Stocks
											</AccordionTrigger>
											<AccordionContent className="p-5">
												<div className=" grid grid-cols-3 gap-x-4 gap-y-6">
													<RFrom.RFInput
														label="Quantity"
														methods={methods}
														name="quantity"
														type="number"
													/>

													<RFrom.RFInput
														label="Buy Price"
														methods={methods}
														name="buy_price"
														type="number"
													/>

													<RFrom.RFInput
														label="Sell Price"
														methods={methods}
														name="sell_price"
														type="number"
													/>

													<RFrom.RFStatus
														methods={methods}
														name="discount_type"
														placeholder="Select"
														items="flatPercent"
														label="Discount Type"
													/>

													<RFrom.RFInput
														label="Discount Value"
														methods={methods}
														name="discount_value"
														type="number"
													/>
												</div>
											</AccordionContent>
										</AccordionItem>

										<AccordionItem
											value="item-5"
											className="hover:bg-background border-b-0 create_product_overflow_problem_select   w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
										>
											<AccordionTrigger className="hover:no-underline text-xl bg-gray-200 dark:bg-gray-900 px-2 rounded-lg">
												Others
											</AccordionTrigger>
											<AccordionContent className="p-5">
												<div className=" grid grid-cols-12 gap-x-4 gap-y-6">
													{/* <div className="col-span-4">
							<RFrom.RFInput
								label="Alert Quantity"
								methods={methods}
								name="name"
							/>
						</div> */}

													{/* <div className="col-span-4">
							<RFrom.RFCalender
								label="Manufacture Date"
								methods={methods}
								name="expire_date"
							/>
						</div>
						<div className="col-span-4">
							<RFrom.RFCalender
								label="Expire Date"
								methods={methods}
								name="expire_date"
							/>
						</div> */}
													{/* <div className="col-span-4">
							<RFrom.RFStatus
								methods={methods}
								name="Discount Type"
								placeholder="Select"
								items="flatPercent"
								label="Tags"
							/>
						</div>
						<div className="col-span-4">
							<RFrom.RFISelectHasIcon form={form} label={'Warranty'} />
						</div>
						<div className="col-span-4">
							<RFrom.RFStatus
								methods={methods}
								name="Discount Type"
								placeholder="Select"
								items="flatPercent"
								label="status"
							/>
						</div> */}
													<div className="col-span-6">
														{/* <FancyMultiSelect label="Tags" /> */}
														<MultiSelector label="Tags" creatable />
													</div>
													<div className="col-span-4">
														<RFrom.RFCheck methods={methods} name="isFeature" />
													</div>
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
								<div className="col-span-12 flex justify-end">
									<Button type="submit">Create Product</Button>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</Motion>
		</PageDetailsApiHOC>
	);
}
