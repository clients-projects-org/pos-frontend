'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MultiSelector, RFrom } from '@/components/custom/form';
import { useRouter } from 'next/navigation';
import { createZodFrom, FormSchema, FormValues } from './product.zod';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import { useStoreProductsMutation } from './productCreateApiSlice';
import React from 'react';
import { userStoreImageInfo } from '@/lib/image-size';
export function CreateProduct() {
	const router = useRouter();
	const [img, setImg] = React.useState('');
	console.log(img, 'img');
	const { methods } = createZodFrom();

	const [store, { isLoading }] = useStoreProductsMutation();

	async function onSubmit(data: FormValues) {
		console.log(data, 'data');
		try {
			const response = await store(data as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			router.push('/inventory/products');
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}
	const uploadedImage = methods.watch('image');
	console.log(uploadedImage, 'uploadedImage');

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.files, 'log');
		const fileList = e.target.files;
		if (fileList && fileList.length > 0) {
			// Set the value of the file in the form
			methods.setValue('image', fileList);
		}
	};

	// Use uploadedImage as FileList to generate URL
	const imageSrc =
		uploadedImage && uploadedImage.length > 0
			? URL.createObjectURL(uploadedImage[0]) // Generate image preview URL
			: 'https://ui.shadcn.com/placeholder.svg';

	return (
		<Form {...methods}>
			<form className="mb-44" onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="grid w-full items-start gap-6">
					<div className="grid gap-6 rounded-lg border p-4 grid-cols-12">
						<div className="col-span-5 rounded-lg border p-4">
							<div className="grid gap-2">
								<label htmlFor="imageUpload">ImageUP</label>
								<RFrom.RFImage
									methods={methods}
									imageInfo={userStoreImageInfo}
								/>
								<Image
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
								/>
								<div className="grid grid-cols-3 gap-2">
									<button type="button">
										<Image
											alt="Product image"
											className="aspect-square w-full rounded-md object-cover"
											height="84"
											src="https://ui.shadcn.com/placeholder.svg"
											width="84"
										/>
									</button>
									<button type="button">
										<Image
											alt="Product image"
											className="aspect-square w-full rounded-md object-cover"
											height="84"
											src="https://ui.shadcn.com/placeholder.svg"
											width="84"
										/>
									</button>
									<button
										type="button"
										className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
									>
										<Upload className="h-4 w-4 text-muted-foreground" />
										<span className="sr-only">Upload</span>
									</button>
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
												<RFrom.RFISelectHasIcon
													form={methods}
													label={'Supplier'}
												/>
											</div>
											<div className="col-span-4">
												<RFrom.RFISelectHasIcon
													form={methods}
													label={'Warehouse'}
												/>
											</div>

											<div className="col-span-4">
												<MultiSelector label="Store" />
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
												<RFrom.RFISelectHasIcon
													form={methods}
													label={'Category'}
												/>
											</div>
											<div className="col-span-4">
												<RFrom.RFStatus
													methods={methods}
													name="Sub Category"
													placeholder="Select"
													label="Sub Category"
												/>
											</div>
											<div className="col-span-4">
												<RFrom.RFISelectHasIcon
													form={methods}
													label={'Brand'}
												/>
											</div>

											<div className="col-span-12">
												<RFrom.RFTextarea
													methods={methods}
													label="Short Description"
												/>
											</div>

											<div className="col-span-12">
												<RFrom.RFTextarea
													methods={methods}
													label="Long Description"
												/>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>

								{/* <AccordionItem
				value="item-3"
				className="hover:bg-background border-b-0   w-full rounded-lg px-3 py-2  text-muted-foreground transition-all hover:text-primary my-1 sm:my-3 "
			>
				<AccordionTrigger className="hover:no-underline text-xl bg-gray-200 dark:bg-gray-900 px-2 rounded-lg">
					Pricing & Stocks
				</AccordionTrigger>
				<AccordionContent className="p-5">
					<div className=" grid grid-cols-12 gap-x-4 gap-y-6">
						<div className="col-span-4">
							<RFrom.RFInput label="Sell Price" methods={methods} name="name" />
						</div>

						<div className="col-span-4">
							<RFrom.RFStatus
								methods={methods}
								name="Discount Type"
								placeholder="Select"
								items="flatPercent"
								label="Discount Type"
							/>
						</div>
						<div className="col-span-4">
							<RFrom.RFInput
								label="Discount Value"
								methods={methods}
								name="name"
							/>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem> */}

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
												<RFrom.RFCheck />
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
	);
}
