'use client';

import { z } from 'zod';
import { RFrom, SelectSearchMultiple } from '@/components/custom/form';
import React, { useEffect, useRef } from 'react';
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
import { apiErrorResponse, apiReqResponse, confirm } from '@/lib/actions';
import {
	useGetCreateDataPurchaseQuery,
	useStorePurchaseMutation,
} from './purchaseApiSlice';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createZodFromNew2, FormSchema2 } from './new-zod2';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
type FormValues = z.infer<typeof FormSchema2>;

interface FormProps {
	methods: UseFormReturn<FormValues>;
	setOpen: Function;
	resetForm: () => void;
}

export function PurchaseStoreModalNew2() {
	const [open, setOpen] = React.useState(false);
	const { methods, resetForm } = createZodFromNew2();

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) {
					resetForm();
				}
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="gap-1 flex items-center border px-3 py-2 text-sm rounded-sm  "
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
					methods={methods}
					setOpen={setOpen}
					resetForm={resetForm}
				/>
			</DialogContent>
		</Dialog>
	);
}

const FormMutation: React.FC<FormProps> = ({
	methods,
	setOpen,
	resetForm,
}: FormProps) => {
	const products = methods.watch('products');
	const supplier_id = methods.watch('supplier_id');
	const product_ids = methods.watch('product_ids');
	const discount_type = methods.watch('discount_type');
	const discount_value = methods.watch('discount_value');
	const payment_system = methods.watch('payment_system');
	const total_price_auto_rate = methods.watch('total_price_auto_rate');

	console.log({ product_ids });
	console.log({ products });

	const prevSupplierId = useRef(supplier_id);
	const {
		fields: productFields,
		append: appendProduct,
		remove: removeProduct,
	} = useFieldArray({
		control: methods.control,
		name: 'products',
	});
	const { data, isLoading } = useGetCreateDataPurchaseQuery(undefined);
	console.log(data?.data?.product);

	useEffect(() => {
		if (total_price_auto_rate && discount_value) {
			const calculateDiscountedTotal = () => {
				if (total_price_auto_rate && discount_value) {
					return (
						total_price_auto_rate -
						(total_price_auto_rate * discount_value) / 100
					);
				} else {
					return total_price_auto_rate;
				}
			};
			// Step 1: Calculate the total discounted amount
			const discountedTotal = calculateDiscountedTotal();

			// Step 2: Calculate the total base cost of all products and their variants
			const totalBaseCost = productFields.reduce((acc, product) => {
				const productCost =
					product.sell_price *
					product.variants.reduce((sum, variant) => {
						return sum + Number(variant.quantity);
					}, 0);
				return acc + productCost;
			}, 0);

			// Step 3: Calculate each variant's rate based on its share of the discounted total
			productFields.forEach((product, productIndex) => {
				product.variants.forEach((variant, variantIndex) => {
					// Determine each variant's base cost as a share of the total base cost
					const variantBaseCost = product.sell_price * Number(variant.quantity);
					const variantShareOfDiscountedTotal =
						(variantBaseCost / totalBaseCost) * discountedTotal;

					// Calculate the rate per item for this variant
					const ratePerItem =
						variantShareOfDiscountedTotal / Number(variant.quantity);

					// Set the calculated rate for this variant in the form
					methods.setValue(
						`products.${productIndex}.variants.${variantIndex}.rate`,
						ratePerItem
					);
				});
			});
		}
	}, [total_price_auto_rate, discount_value, productFields, products, methods]);

	useEffect(() => {
		if (product_ids) {
			// Iterate over the product_ids to find corresponding products in data
			product_ids.forEach((id) => {
				const selectedProduct = data?.data?.product?.find(
					(prod: any) => prod._id === id
				);
				if (selectedProduct) {
					const newProduct = {
						...selectedProduct,
						product_type: 'single',
						store_data: selectedProduct.store_id,
						warehouse_data: selectedProduct.warehouse_id,
						warehouse_id: '',
						store_id: '',
						variants: [
							{
								variant_id: '',
								attribute_id: '',
								expire_date: '',
								manufacture_date: '',
								quantity: 0,
								rate: 0,
							},
						],
					};

					// Check if the product is already in the productFields array
					const isProductAlreadyAdded = productFields.some(
						(field) => field._id === newProduct._id
					);

					// Only append the product if it's not already in the fields array
					if (!isProductAlreadyAdded) {
						appendProduct(newProduct as any);
					}
				}
			});

			// Remove products that are no longer selected
			productFields.forEach((field, index) => {
				if (!product_ids.includes(field?._id)) {
					removeProduct(index);
				}
			});
		}
	}, [product_ids, data, productFields]);

	useEffect(() => {
		// Only trigger this when the supplier_id changes

		async function changeSupplier() {
			if (supplier_id && supplier_id !== prevSupplierId.current) {
				// Check if there are any products already added
				if (productFields.length > 0) {
					const confirmed = await confirm({
						message:
							'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
						title: 'Delete Account',
					});

					if (confirmed) {
						// Remove all existing products at once
						removeProduct(Array.from(Array(productFields.length).keys()));
						methods.setValue('product_ids', []);
					} else {
						// Revert back to the previous supplier_id if the user cancels
						methods.setValue('supplier_id', prevSupplierId.current);
					}
				}
			}

			// Update the previous supplier_id reference after checking
			prevSupplierId.current = supplier_id;
		}
		changeSupplier();
	}, [supplier_id]);

	// Add a new variant to a specific product by index
	const addVariant = (productIndex: number) => {
		methods.setValue(`products.${productIndex}.variants`, [
			...methods.getValues(`products.${productIndex}.variants`),
			{ variant_id: '', attribute_id: '', quantity: 0, rate: 0 }, // New variant structure
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

	const removeProductHandler = (productIndex: number, id: string) => {
		removeProduct([productIndex]);
		// remove ids
		const filtered_ids = product_ids.filter((product_id) => product_id !== id);
		methods.setValue('product_ids', filtered_ids);
	};

	// subtotal calculate all variants
	const calculateSubtotal = () => {
		// watch all products
		return products?.reduce((acc, product) => {
			const productSubtotal = product.variants.reduce((variantAcc, variant) => {
				return variantAcc + variant.quantity * variant.rate;
			}, 0); // Calculate subtotal for each product's variants

			return acc + productSubtotal; // Add to the total subtotal
		}, 0); // Initialize total subtotal
	};

	const subtotal = calculateSubtotal();

	// Calculate discount based on discount_type and discount_value
	const calculateDiscount = () => {
		let finalTotal = subtotal;

		if (discount_type === 'fixed') {
			// Apply fixed discount (subtract fixed value)
			finalTotal = subtotal - discount_value;
		} else if (discount_type === 'percentage') {
			// Apply percentage discount (subtract percentage from subtotal)
			const percentageDiscount = (subtotal * discount_value) / 100;
			finalTotal = subtotal - percentageDiscount;
		}

		// Ensure total doesn't drop below zero
		return Math.max(finalTotal, 0);
	};

	const totalAfterDiscount = calculateDiscount();

	// grand total calculate
	const calculateGrandTotal = () => {
		const tax = Math.max(methods.watch('tax') || 0, 0); // Ensure tax is positive or 0
		const shippingCost = Math.max(methods.watch('shipping_cost') || 0, 0); // Ensure shipping cost is positive or 0

		// Calculate the tax amount (assuming it's a percentage)
		const taxAmount = (totalAfterDiscount * tax) / 100;

		// Grand total = (Total after discount) + tax + shipping - paid amount
		const grandTotal = totalAfterDiscount + taxAmount + shippingCost;

		// Ensure grand total doesn't go below zero
		return Math.max(grandTotal, 0);
	};

	const grandTotal = calculateGrandTotal();

	// Function to calculate the due and exchange amounts
	const calculateDueAndExchange = () => {
		const grandTotal = calculateGrandTotal();

		const paidAmount = Math.max(methods.watch('paid_amount') || 0, 0); // Ensure paid amount is positive or 0

		let dueAmount = 0;
		let exchangeAmount = 0;

		if (paidAmount < grandTotal) {
			// If paid amount is less than the grand total, the due amount is the difference
			dueAmount = grandTotal - paidAmount;
		} else {
			// If paid amount is greater than or equal to the grand total, the exchange is the excess amount
			exchangeAmount = paidAmount - grandTotal;
		}

		return {
			dueAmount,
			exchangeAmount,
		};
	};
	const { dueAmount, exchangeAmount } = calculateDueAndExchange();

	const calculatePaidAmount = () => {
		const grandTotal = calculateGrandTotal();
		const paidAmount = Math.max(methods.watch('paid_amount') || 0, 0);

		// Return the lesser of paidAmount or grandTotal
		return Math.min(paidAmount, grandTotal);
	};
	const calculateAutoDiscountRate = () => {
		if (total_price_auto_rate && discount_value) {
			return (
				total_price_auto_rate - (total_price_auto_rate * discount_value) / 100
			);
		} else {
			return 0;
		}
	};

	const [store, { isLoading: isStoreLoading }] = useStorePurchaseMutation();

	async function onSubmit(data: FormValues) {
		const submitData = {
			...data,
			shipping_cost: parseFloat(data.shipping_cost.toFixed(2)),
			discount_value: parseFloat(data.discount_value.toFixed(2)),
			tax: parseFloat(data.tax.toFixed(2)),
			paid_amount: parseFloat(calculatePaidAmount().toFixed(2)),
			quantity: data.products?.reduce((acc, product) => {
				const productSubtotal = product.variants.reduce(
					(variantAcc, variant) => {
						return variantAcc + variant.quantity;
					},
					0
				); // Calculate subtotal for each product's variants

				return acc + productSubtotal; // Add to the total subtotal
			}, 0),

			products: data.products.map((product) => ({
				product_id: product._id,
				warehouse_id: product.warehouse_id,
				store_id: product.store_id,
				product_type: product.product_type,
				quantity: product.variants?.reduce(
					(acc, variant) => acc + variant.quantity,
					0
				),
				variants: product.variants?.map((variant) => ({
					variant_id: variant.variant_id,
					attribute_id: variant.attribute_id,
					quantity: variant.quantity,
					rate: parseFloat(variant.rate.toFixed(2)),
					expire_date: variant.expire_date,
					manufacture_date: variant.manufacture_date,
				})), // Array of variants
			})),
		};

		try {
			const response = await store({
				...submitData,
			} as any).unwrap();
			apiReqResponse(response);
			resetForm();
			setOpen(false);
		} catch (error: unknown) {
			apiErrorResponse(error, methods, FormSchema2);
		}
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={methods.control}
					name="payment_system"
					render={({ field }) => (
						<FormItem className="flex justify-center gap-2 items-center">
							<FormLabel className="text-base">Auto Product Rate</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="grid gap-4  max-h-[80vh] overflow-y-auto p-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 ">
						<RFrom.SearchAbleSelect
							methods={methods}
							label="Supplier Select"
							name="supplier_id"
							OPTIONS={data?.data?.supplier?.map((e: any) => ({
								_id: e._id,
								name: `${e.name} (${e.business_name})`,
							}))}
						/>
						<FormField
							control={methods.control}
							name={'product_ids'}
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel className="inline-block">Product</FormLabel>
									<FormControl>
										{data?.data?.product && (
											<SelectSearchMultiple
												frameworks={data?.data?.product?.filter(
													(e: any) => e.supplier_id?._id === supplier_id
												)}
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* <RFrom.SearchSelectMultiple
							methods={methods}
							label="Product Select"
							name="product_ids"
							OPTIONS={data?.data?.product?.filter(
								(e: any) => e.supplier_id?._id === supplier_id
							)}
							getTargetValue={getTargetValue}
							disabled={productLoading}
						/> */}

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
													Product Type
												</th>

												<th scope="col" className="px-6 py-2">
													Select Warehouse
												</th>
												<th scope="col" className="px-6 py-2">
													Select Store
												</th>
												<th scope="col" className="px-6 py-2">
													Previous Qty{' '}
													{productField?._id &&
														methods.watch(
															`products.${productIndex}.product_type`
														) === 'variant' && (
															<Button
																variant="destructive"
																size="icon"
																className="absolute top-0 right-0 h-6 w-6"
																type="button"
																onClick={() =>
																	removeProductHandler(
																		productIndex,
																		productField?._id as string
																	)
																}
															>
																<DynamicIcon icon="Minus" />
															</Button>
														)}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
												<th
													scope="row"
													className="px-6  py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													{(productField as any).image &&
														(productField as any).image !== 'null' && (
															<Image
																className="rounded-md h-10 w-10 object-cover mx-auto"
																alt="Product image"
																src={(productField as any).image}
																width={40}
																height={40}
															/>
														)}
												</th>
												<td className="px-6 py-2 ">
													{productField.name ?? ''}
												</td>
												<td className="px-6 py-2">
													<RFrom.RFStatus
														methods={methods}
														items="singleVariant"
														name={`products.${productIndex}.product_type`}
														label=""
													/>
												</td>

												<td className="px-6 py-2">
													{productField?.warehouse_data && (
														<RFrom.RFSelect
															methods={methods}
															data={productField?.warehouse_data}
															name={`products.${productIndex}.warehouse_id`}
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
													)}
												</td>
												<td className="px-6 py-2">
													{productField?.store_data && (
														<RFrom.RFSelect
															methods={methods}
															data={productField?.store_data}
															name={`products.${productIndex}.store_id`}
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
													)}
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
													className="grid grid-cols-7 gap-x-4 gap-y-6 border p-2 rounded relative bg-gray-50 dark:bg-gray-900"
												>
													<>
														{methods.watch(
															`products.${productIndex}.product_type`
														) === 'variant' ? (
															<>
																{/* First Select for Variant */}
																<RFrom.RFSelect
																	methods={methods}
																	data={data?.data?.variant}
																	label="Variant"
																	name={`products.${productIndex}.variants.${variantIndex}.variant_id`}
																>
																	<SelectGroup>
																		{data?.data?.variant?.map(
																			(variant: any) => (
																				<SelectItem
																					key={variant._id}
																					value={variant._id}
																				>
																					{variant.name}
																				</SelectItem>
																			)
																		)}
																	</SelectGroup>
																</RFrom.RFSelect>

																{/* Watch the selected variant */}
																{methods.watch(
																	`products.${productIndex}.variants.${variantIndex}.variant_id`
																) ? (
																	<RFrom.RFSelect
																		data={data?.data?.variant?.find(
																			(variant: any) =>
																				variant._id ===
																				methods.watch(
																					`products.${productIndex}.variants.${variantIndex}.variant_id`
																				)
																		)}
																		methods={methods}
																		label="Attribute"
																		name={`products.${productIndex}.variants.${variantIndex}.attribute_id`}
																	>
																		<SelectGroup>
																			{/* Get the selected variant */}
																			{data?.data?.variant
																				?.find(
																					(variant: any) =>
																						variant._id ===
																						methods.watch(
																							`products.${productIndex}.variants.${variantIndex}.variant_id`
																						)
																				)
																				?.attributes?.map((attribute: any) => (
																					<SelectItem
																						key={attribute._id}
																						value={attribute._id}
																					>
																						{attribute.name}
																					</SelectItem>
																				))}
																		</SelectGroup>
																	</RFrom.RFSelect>
																) : (
																	<p className="mt-2">Please Select Variant</p>
																)}
															</>
														) : (
															<div></div>
														)}
													</>

													{/* <RFrom.RFInput
														label="Quantity"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.quantity`}
														type="number"
													/> */}
													<FormField
														control={methods.control}
														name={`products.${productIndex}.variants.${variantIndex}.quantity`}
														render={({ field }) => (
															<FormItem>
																<FormLabel> Quantity</FormLabel>
																<FormControl>
																	<Input
																		placeholder="type..."
																		onWheel={(event) =>
																			event.currentTarget.blur()
																		}
																		type="number"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={methods.control}
														name={`products.${productIndex}.variants.${variantIndex}.rate`}
														render={({ field }) => (
															<FormItem>
																<FormLabel
																	className={
																		productField.sell_price <
																		methods.watch(
																			`products.${productIndex}.variants.${variantIndex}.rate`
																		)
																			? 'text-red-500'
																			: ''
																	}
																>{`Buy Price (Sell=>${
																	productField?.sell_price
																		? `${productField?.sell_price} tk`
																		: ''
																})`}</FormLabel>
																<FormControl>
																	<Input
																		placeholder="type..."
																		onWheel={(event) =>
																			event.currentTarget.blur()
																		}
																		type="number"
																		disabled={payment_system}
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													{/* <RFrom.RFInput
														label={`Buy Price (Sell=>${
															productField?.sell_price
																? `${productField?.sell_price} tk`
																: ''
														})`}
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.rate`}
														type="number"
														disabled={payment_system}
													/> */}

													<RFrom.RFCalender
														label="Manufacture Date"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.manufacture_date`}
													/>

													<RFrom.RFCalender
														label="Expire Date"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.expire_date`}
													/>

													<RFrom.RFInput
														label="Total"
														methods={methods}
														name={`products.${productIndex}.variants.${variantIndex}.total`}
														type="number"
														disabled
														placeholder={`${(variant.rate * variant.quantity).toFixed(2)}`}
													/>

													{methods.watch(`products.${productIndex}.variants`)
														.length > 1 && (
														<Button
															variant="destructive"
															size="icon"
															className="absolute top-3 right-0 h-6 w-6"
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
											7 &&
											methods.watch(`products.${productIndex}.product_type`) ===
												'variant' && (
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

					<div className="flex justify-end mt-3">
						<div className="max-w-xl  ">
							{!payment_system && (
								<table>
									<tbody>
										<tr>
											<td className="px-6 py-2">Sub Total</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">{subtotal.toFixed(2)}</td>
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
										{(discount_type === 'fixed' ||
											discount_type === 'percentage') && (
											<tr className="border-t text-center font-bold">
												<td className="px-6 py-2">After Discount</td>
												<td className="px-6 py-2">:</td>
												<td className="px-6 py-2">
													{totalAfterDiscount.toFixed(2)}
												</td>
											</tr>
										)}

										<tr>
											<td className="px-6 py-2">Tax (%)</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<RFrom.RFInput
													label=""
													methods={methods}
													name="tax"
													type="number"
												/>
											</td>
										</tr>
										<tr>
											<td className="px-6 py-2">Shipping Cost</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<RFrom.RFInput
													label=""
													methods={methods}
													name="shipping_cost"
													type="number"
												/>
											</td>
										</tr>
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
											<td className="px-8 py-4">{dueAmount.toFixed(2)}</td>
										</tr>
										{exchangeAmount > 0 && (
											<tr>
												<td className="px-6 py-4">Exchange</td>
												<td className="px-6 py-2">:</td>
												<td className="px-8 py-4">
													{exchangeAmount.toFixed(2)}
												</td>
											</tr>
										)}
										<tr className="border-t text-center font-bold">
											<td className="px-6 py-2">Grand Total</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">{grandTotal.toFixed(2)}</td>
										</tr>
									</tbody>
								</table>
							)}
							{payment_system && (
								<table>
									<tbody>
										<tr>
											<td className="px-6 py-2">Total Price</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<RFrom.RFInput
													methods={methods}
													name={`total_price_auto_rate`}
													type="number"
													placeholder="Total Price"
												/>
											</td>
										</tr>
										<tr hidden className="">
											<td className="px-6 py-2">Discount Type</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<FormField
													control={methods.control}
													name="discount_type"
													render={({ field }) => (
														<FormItem>
															<Select
																onValueChange={field.onChange}
																defaultValue={'percentage'}
															>
																<FormControl>
																	<SelectTrigger>
																		<SelectValue placeholder="Select a verified email to display" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="percentage">
																		Percentage
																	</SelectItem>
																</SelectContent>
															</Select>

															<FormMessage />
														</FormItem>
													)}
												/>
											</td>
										</tr>

										<tr>
											<td className="px-6 py-2">Discount Value (%)</td>
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

										<tr className="border-t text-center font-bold">
											<td className="px-6 py-2">After Discount</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												{calculateAutoDiscountRate().toFixed(2)}
											</td>
										</tr>

										<tr>
											<td className="px-6 py-2">Tax (%)</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<RFrom.RFInput
													label=""
													methods={methods}
													name="tax"
													type="number"
												/>
											</td>
										</tr>
										<tr>
											<td className="px-6 py-2">Shipping Cost</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<RFrom.RFInput
													label=""
													methods={methods}
													name="shipping_cost"
													type="number"
												/>
											</td>
										</tr>
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
											<td className="px-8 py-4">{dueAmount.toFixed(2)}</td>
										</tr>
										{exchangeAmount > 0 && (
											<tr>
												<td className="px-6 py-4">Exchange</td>
												<td className="px-6 py-2">:</td>
												<td className="px-8 py-4">
													{exchangeAmount.toFixed(2)}
												</td>
											</tr>
										)}
										<tr className="border-t text-center font-bold">
											<td className="px-6 py-2">Grand Total</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">{grandTotal.toFixed(2)}</td>
										</tr>
									</tbody>
								</table>
							)}
						</div>
					</div>

					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-end mt-8">
						<RFrom.SearchAbleSelect
							methods={methods}
							label="Payment Method"
							name="payment_method"
							OPTIONS={data?.data?.paymentMethod}
						/>
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
						onClick={() => {
							setOpen(false);
							resetForm();
						}}
						type="button"
						variant="destructive"
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isStoreLoading}>
						{isStoreLoading ? 'Creating...' : 'Create'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
