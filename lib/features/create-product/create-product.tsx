'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MultiSelector2, RFrom } from '@/components/custom/form';
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
import {
	CheckNecessaryData,
	CloseAlert,
	CustomAlert,
} from './check-necessary-data';
import { DynamicIcon } from '@/components/actions';
import { useFieldArray } from 'react-hook-form';

export function CreateProduct() {
	const router = useRouter();
	const { methods } = createZodFrom();
	const { fields, append, remove } = useFieldArray({
		control: methods.control,
		name: 'variants',
	});
	const addVariant = () => {
		append({ unit_id: '', variant_id: '', quantity: 0 });
	};

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
	const product_type = methods.watch('product_type');
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
					<form
						className="mb-44 select-none"
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						<div className="grid w-full items-start gap-6">
							<div className="grid gap-6 rounded-lg border p-4 grid-cols-12">
								<div className="col-span-5 rounded-lg border p-4">
									<div className="grid gap-2">
										<RFrom.RFProductImage
											methods={methods}
											imageInfo={userStoreImageInfo}
										/>

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
													<div className="col-span-8">
														<RFrom.RFInput
															label="Product Name"
															methods={methods}
															name="name"
														/>
													</div>
													<div className="col-span-4">
														<RFrom.RFInput
															label="Product SKU"
															methods={methods}
															name="sku"
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
												<div className="mb-5 ">
													<RFrom.RadioVariantType methods={methods} />
												</div>

												{/* single product section  */}
												{product_type === 'single' && (
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

														<RFrom.RFInput
															label="Alert Quantity"
															methods={methods}
															name="alert_quantity"
															type="number"
														/>
													</div>
												)}
												{product_type === 'variant' && (
													<div className="space-y-4 relative pb-4">
														{data?.data?.unit.length === 0 && (
															<CustomAlert
																item={{
																	link: '/inventory/units',
																	message: 'Please add a unit',
																}}
															/>
														)}
														{data?.data?.variant.length === 0 && (
															<CustomAlert
																item={{
																	link: '/inventory/variant-attributes',
																	message: 'Please add a variant',
																}}
															/>
														)}

														{fields.map((field, index) => (
															<div
																key={field.id}
																className="grid grid-cols-3 gap-x-4 gap-y-6 border p-2 rounded relative"
															>
																{/* Unit Selection */}
																<RFrom.RFSelect
																	methods={methods}
																	data={data?.data?.unit}
																	label="Unit"
																	name={`variants[${index}].unit_id`}
																>
																	<SelectGroup>
																		<SelectLabel>Unit All List</SelectLabel>
																		{data?.data?.unit?.map(
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

																{/* Variant Selection */}
																<RFrom.RFSelect
																	methods={methods}
																	data={data?.data?.variant}
																	label="Variant"
																	name={`variants[${index}].variant_id`}
																>
																	<SelectGroup>
																		<SelectLabel>Variant All List</SelectLabel>
																		{data?.data?.variant?.map(
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

																{/* Quantity Input */}
																<RFrom.RFInput
																	label="Sell Price"
																	methods={methods}
																	name={`variants[${index}].quantity`}
																	type="number"
																/>

																{/* Remove Variant Button */}
																{fields.length > 1 && (
																	<Button
																		variant="destructive"
																		size="icon"
																		className="absolute top-0 right-0 h-6 w-6"
																		onClick={() => remove(index)}
																		type="button"
																	>
																		<DynamicIcon icon="Minus" className="" />
																	</Button>
																)}
															</div>
														))}

														{/* Add Variant Button */}
														{fields.length < 5 && (
															<Button
																variant="secondary"
																size="icon"
																className="absolute -bottom-4 right-0 h-6 w-6"
																onClick={addVariant}
																type="button"
															>
																<DynamicIcon icon="Plus" className="" />
															</Button>
														)}
													</div>
												)}
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
													<div className="col-span-4">
														<RFrom.RFCalender
															label="Manufacture Date"
															methods={methods}
															name="manufacture_date"
														/>
													</div>
													<div className="col-span-4">
														<RFrom.RFCalender
															label="Expire Date"
															methods={methods}
															name="expire_date"
														/>
													</div>

													<div className="col-span-4">
														<RFrom.RFSelect
															methods={methods}
															data={data?.data?.supplier}
															label="Warranty"
															name="warranty_id"
														>
															<SelectGroup>
																<SelectLabel>Warranty All List</SelectLabel>
																{data?.data?.warranty?.map(
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

													<div className="col-span-6">
														{/* <FancyMultiSelect label="Tags" /> */}
														{/* <MultiSelector label="Tags" creatable /> */}
														<MultiSelector2
															label="Tags"
															methods={methods}
															name="tags"
															creatable
														/>
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
									<Button disabled={isLoading} type="submit">
										Create Product
									</Button>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</Motion>
		</PageDetailsApiHOC>
	);
}
