'use client';
import { z } from 'zod';
import { RFrom } from '@/components/custom/form';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { DynamicIcon } from '@/components/actions';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import {
	useGetCreateDataPurchaseQuery,
	useStoreProductsMutation,
} from './purchaseApiSlice';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import { useGetProductsByIdQuery } from '../create-product';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { createZodFromNew, FormSchema } from './new-zod';
type FormValues = z.infer<typeof FormSchema>;

interface FormProps {
	methods: UseFormReturn<FormValues>;
	onSubmit: (data: FormValues) => void;
	isLoading: boolean;
	setOpen: Function;
}
export function PurchaseStoreModalNew() {
	const [open, setOpen] = React.useState(false);
	const { methods } = createZodFromNew();
	const [store, { isLoading }] = useStoreProductsMutation();

	async function onSubmit(data: FormValues) {
		const storeData = {
			name: data.name,
			code: data.code?.toLocaleLowerCase(),
			status: data.status,
		};
		try {
			const response = await store({
				...storeData,
			} as any).unwrap();
			apiReqResponse(response);
			methods.reset();
			setOpen(false);
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="gap-1 flex items-center border px-3 py-2 text-sm rounded-sm hover:bg-slate-800"
				>
					<DynamicIcon icon="PlusCircle" className="h-4 w-4 sm:mr-2" />
					<span className="sr-only sm:not-sr-only capitalize !whitespace-nowrap">
						Add Purchase
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-full ">
				<DialogHeader>
					<DialogTitle className="text-center">Create Purchase New</DialogTitle>
					<DialogDescription className="text-center">
						Purchase is a transaction of goods from supplier
					</DialogDescription>
				</DialogHeader>
				{/* form  */}
				<FormMutation
					isLoading={isLoading}
					methods={methods}
					onSubmit={onSubmit}
					setOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
}

const FormMutation: React.FC<FormProps> = ({
	methods,
	onSubmit,
	setOpen,
}: FormProps) => {
	const [id, setId] = useState<string | null>(null);
	const supplier_id = methods.watch('supplier_id');
	const product_ids = methods.watch('product_ids');
	const [productState, setProductState] = useState([]);
	const prevSupplierId = useRef(supplier_id);
	const {
		fields: productFields,
		append: appendProduct,
		remove: removeProduct,
	} = useFieldArray({
		control: methods.control,
		name: 'products',
	});
	const { data, isLoading } = useGetCreateDataPurchaseQuery();
	const { data: product } = useGetProductsByIdQuery(id || '', {
		skip: !id,
	});

	useEffect(() => {
		if (product?.data?.product && id) {
			setProductState((prevState) => {
				const isProductAlreadyAdded = prevState.some(
					(existingProduct) =>
						existingProduct._id === product?.data?.product._id
				);

				// Only add the new product if it's not already in the state
				if (!isProductAlreadyAdded) {
					return [...prevState, product?.data?.product]; // Add the new product
				}
				return prevState; // Return previous state if product is already added
			});
		}
	}, [id, product?.data]);

	/*
	useEffect(() => {
		if (product && id) {
			const newProduct = {
				...product?.data?.product,
				variants: [
					{
						unit: '',
						variant_id: '',
						quantity: '',
					},
				],
			};

			const isProductAlreadyAdded = productFields.some(
				(field) => field._id === newProduct._id
			);


			if (!isProductAlreadyAdded) {
				appendProduct(newProduct);
			}
		}
	}, [product, id]);
	
	*/

	useEffect(() => {
		if (id) {
			// Find the product in productState by id
			const selectedProduct = productState.find((prod) => prod._id === id);
			if (selectedProduct) {
				const newProduct = {
					...selectedProduct,
					variants: [
						{
							unit: '',
							variant_id: '',
							quantity: '',
						},
					],
				};

				// Check if the product is already in the productFields array
				const isProductAlreadyAdded = productFields.some(
					(field) => field._id === newProduct._id
				);

				// Only append the product if it's not already in the fields array
				if (!isProductAlreadyAdded) {
					appendProduct(newProduct);
				}
			}
		}
	}, [productState, id, setId]); // Run this effect when productState or id changes

	useEffect(() => {
		const filteredProductFields = productFields?.filter((productField) =>
			product_ids.includes(productField._id)
		);
		methods.setValue('products', filteredProductFields);
	}, [product_ids]);

	useEffect(() => {
		// Only trigger this when the supplier_id changes
		if (supplier_id && supplier_id !== prevSupplierId.current) {
			// Check if there are any products already added
			if (productFields.length > 0) {
				const confirmed = window.confirm(
					'You have already added products for the previous supplier. Selecting a new supplier will remove all selected products. Do you want to continue?'
				);

				if (confirmed) {
					// Remove all existing products at once
					removeProduct([...Array(productFields.length).keys()]);
					methods.setValue('product_ids', []);
				} else {
					// Revert back to the previous supplier_id if the user cancels
					methods.setValue('supplier_id', prevSupplierId.current);
				}
			}

			// Update the previous supplier_id reference after checking
			prevSupplierId.current = supplier_id;
		}
	}, [supplier_id]);

	const discount_type = methods.watch('discount_type');
	const getTargetValue = (e: string) => {
		setId(e);
	};
	const watch1 = methods.watch();
	// Add a new variant to a specific product by index
	const addVariant = (productIndex: number) => {
		methods.setValue(`products.${productIndex}.variants`, [
			...methods.getValues(`products.${productIndex}.variants`),
			{ unit_id: '', variant_id: '', quantity: 0 }, // New variant structure
		]);
	};

	// Remove a variant from a specific product by index
	const removeVariant = (productIndex: number, variantIndex: number) => {
		// Get the current variants for the selected product
		const currentVariants = methods.getValues(
			`products.${productIndex}.variants`
		);

		// Filter out the variant by its index
		const updatedVariants = currentVariants.filter(
			(_, idx) => idx !== variantIndex
		);

		// Update the variants array for the specific product
		methods.setValue(`products.${productIndex}.variants`, updatedVariants);
	};

	/* for remove can be helpful 
    // Add variant to a product at a specific index
const addVariant = (productIndex: number) => {
  methods.setValue(`products.${productIndex}.variants`, [
    ...methods.getValues(`products.${productIndex}.variants`),
    { unit_id: '', variant_id: '', quantity: 0 },
  ]);
};

// Remove variant at a specific index from the product's variants
const removeVariant = (productIndex: number, variantIndex: number) => {
  const currentVariants = methods.getValues(`products.${productIndex}.variants`);

  // Remove the variant at the specified index
  const updatedVariants = currentVariants.filter(
    (variant: any, index: number) => index !== variantIndex
  );

  // Update the variants for the product at productIndex
  methods.setValue(`products.${productIndex}.variants`, updatedVariants);
};

    */
	const getVariantFieldArray = (productIndex: number) =>
		useFieldArray({
			control: methods.control,
			name: `products.${productIndex}.variants`,
		});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid gap-4  max-h-[80vh] overflow-y-auto p-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 ">
						<RFrom.SearchAbleSelect
							methods={methods}
							label="Supplier Select"
							name="supplier_id"
							OPTIONS={data?.data?.supplier}
						/>

						<RFrom.SearchSelectMultiple
							methods={methods}
							label="Product Select"
							name="product_ids"
							OPTIONS={data?.data?.product?.filter(
								(e: any) => e.supplier_id === supplier_id
							)}
							getTargetValue={getTargetValue}
						/>

						<RFrom.RFCalender
							label="Purchase Date"
							methods={methods}
							name="purchase_date"
						/>
						<RFrom.RFInput
							label="Reference Number"
							methods={methods}
							name="reference_number"
						/>
						<RFrom.RFStatus
							methods={methods}
							items="orderReceived"
							name="purchase_status"
						/>
					</div>
					<div className="space-y-4">
						{/* product  */}
						{productFields?.map((productField, productIndex) => (
							<div key={productField.id} className="product-section">
								<div className="relative overflow-x-auto">
									<table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
										<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
											<tr>
												<th scope="col" className="px-6 py-2">
													Image
												</th>
												<th scope="col" className="px-6 py-2">
													Product Name
												</th>
												<th scope="col" className="px-6 py-2">
													Select Type
												</th>
												<th scope="col" className="px-6 py-2">
													Select Rate Type
												</th>
												<th scope="col" className="px-6 py-2">
													Select Warehouse
												</th>
												<th scope="col" className="px-6 py-2">
													Select Store
												</th>
												<th scope="col" className="px-6 py-2">
													Previous Qty
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
												<th
													scope="row"
													className="px-6  py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													<Image
														className="rounded-md h-10 w-10 object-cover mx-auto"
														alt="Product image"
														src={productField?.image}
														width={40}
														height={40}
													/>
												</th>
												<td className="px-6 py-2 ">{productField?.name}</td>
												<td className="px-6 py-2">
													<RFrom.RFStatus
														methods={methods}
														items="singleVariant"
														name="status"
														label=""
													/>
												</td>
												<td className="px-6 py-2">
													<RFrom.RFStatus
														methods={methods}
														items="saleRateType"
														name="sale_rate_type"
														label=""
													/>
												</td>
												<td className="px-6 py-2">
													<RFrom.RFSelect
														methods={methods}
														data={productField?.warehouse_data}
														name="warehouse_id"
													>
														<SelectGroup>
															{productField?.warehouse_data?.map((dev) => (
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
												</td>
												<td className="px-6 py-2">
													<RFrom.RFSelect
														methods={methods}
														data={productField?.store_data}
														name="warehouse_id"
													>
														<SelectGroup>
															{productField?.store_data?.map((dev) => (
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
												</td>
												<td className="px-6 py-2">{productField?.quantity}</td>
											</tr>
										</tbody>
									</table>

									<div className="relative">
										{/* Variants for the product */}
										{methods
											.watch(`products.${productIndex}.variants`)
											?.map((variant, variantIndex) => (
												<div
													key={variantIndex}
													className="grid grid-cols-5 gap-x-4 gap-y-6 border p-2 rounded relative bg-gray-50 dark:bg-gray-900"
												>
													<RFrom.RFSelect
														methods={methods}
														data={data?.units}
														label="Unit"
														name={`products.${productIndex}.variants.${variantIndex}.unit_id`}
													>
														<SelectGroup>
															<SelectLabel>Units</SelectLabel>
															{data?.units?.map((unit) => (
																<SelectItem key={unit._id} value={unit._id}>
																	{unit.name}
																</SelectItem>
															))}
														</SelectGroup>
													</RFrom.RFSelect>

													<RFrom.RFSelect
														methods={methods}
														data={data?.variants}
														label="Variant"
														name={`products.${productIndex}.variants.${variantIndex}.variant_id`}
													>
														<SelectGroup>
															<SelectLabel>Variants</SelectLabel>
															{data?.variants?.map((variant) => (
																<SelectItem
																	key={variant._id}
																	value={variant._id}
																>
																	{variant.name}
																</SelectItem>
															))}
														</SelectGroup>
													</RFrom.RFSelect>

													<RFrom.RFInput
														label="Quantity"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.quantity`}
														type="number"
													/>
													<RFrom.RFInput
														label="Rate"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.rate`}
														type="number"
													/>

													<RFrom.RFInput
														label="Total"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.total`}
														type="number"
														disabled
														placeholder="0.00"
													/>

													{methods.watch(`products.${productIndex}.variants`)
														.length > 1 && (
														<Button
															variant="destructive"
															size="icon"
															className="absolute -top-3 right-0 h-6 w-6"
															type="button"
															onClick={() =>
																removeVariant(productIndex, variantIndex)
															}
														>
															<DynamicIcon icon="Minus" />
														</Button>
													)}
												</div>
											))}

										{/* Add Variant Button */}
										{methods.watch(`products.${productIndex}.variants`).length <
											7 && (
											<Button
												variant="secondary"
												className="absolute bottom-0 right-0 h-6 w-6"
												size="icon"
												onClick={() => addVariant(productIndex)}
												type="button"
											>
												<DynamicIcon icon="Plus" />
											</Button>
										)}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-end mt-8">
						<RFrom.RFInput
							label="Tax"
							methods={methods}
							name="tax"
							type="number"
						/>

						<RFrom.RFInput
							label="Shipping Cost"
							methods={methods}
							name="shipping_cost"
							type="number"
						/>
						<RFrom.SearchAbleSelect
							methods={methods}
							label="Payment Method"
							name="payment_method"
							OPTIONS={data?.data?.paymentMethod}
						/>
					</div>

					<div className="flex justify-end mt-3">
						<div className="max-w-xl  ">
							<table>
								<tr>
									<td className="px-6 py-2">Sub Total</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">100</td>
								</tr>
								<tr>
									<td className="px-6 py-2">Discount Type</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<RFrom.RFStatus
											methods={methods}
											items="flatPercent"
											name={`discount_type`}
											placeholder="Discount Type"
											label=""
										/>
									</td>
								</tr>
								{(discount_type === 'fixed' ||
									discount_type === 'percentage') && (
									<tr>
										<td className="px-6 py-2">Discount Value</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<RFrom.RFInput
												methods={methods}
												name={`discount_value`}
												type="number"
												placeholder="Discount Value"
											/>
										</td>
									</tr>
								)}
								<tr>
									<td className="px-6 py-2">Paid</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<RFrom.RFInput
											methods={methods}
											name={`paid_amount`}
											type="number"
											placeholder="Paid Value"
										/>
									</td>
								</tr>
								<tr>
									<td className="px-6 py-4">Due</td>
									<td className="px-6 py-2">:</td>
									<td className="px-8 py-4">100</td>
								</tr>
								<tr className="border-t text-center font-bold">
									<td className="px-6 py-2">Grand Total</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">100</td>
								</tr>
							</table>
						</div>
					</div>

					<div>
						<RFrom.RFTextarea
							methods={methods}
							label="Description"
							name="description"
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						onClick={() => setOpen(false)}
						type="button"
						variant="destructive"
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Creating...' : 'Create'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
