import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useState } from 'react';
import {
	decrementQuantity,
	incrementQuantity,
	removeVariant,
	updateQuantity,
	Variant,
} from './posSlice';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RFrom, SelectSearch } from '@/components/custom/form';
import { useGetCustomerQuery } from '../customer';
import { createZodFromPos, FormValuesPos } from './pos-zod';
import { Form } from '@/components/ui/form';

export function SellItems() {
	const [customer, setCustomer] = useState('');
	const { methods, resetForm } = createZodFromPos();
	const discount_type = methods.watch('discount_type');
	const discount_value = methods.watch('discount_value');

	// get all customer
	const {
		data: customers,
		isLoading: customerLoading,
		isFetching: customerFetching,
		isError: customerError,
	} = useGetCustomerQuery('active');

	const dispatch = useAppDispatch();
	const items = useAppSelector((state) => state.variantPos.variants);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		variant: Variant
	) => {
		const value = Math.max(1, Number(e.target.value)); // Prevent quantity from being less than 1

		dispatch(updateQuantity({ _id: variant._id, quantity: value }));
	};

	// total quantity
	const totalQuantity = items.reduce(
		(pre, cur) => pre + cur.select_quantity,
		0
	);

	// total price * quantity
	const totalPriceAndQuantity = items.reduce(
		(pre, cur) => pre + cur.select_quantity * cur.sell_price,
		0
	);

	async function onSubmit(data: FormValuesPos) {
		console.log(data, 'data');

		try {
		} catch (error: unknown) {}
	}

	// Calculate discount based on discount_type and discount_value
	const calculateDiscount = () => {
		let finalTotal = totalPriceAndQuantity;

		if (discount_type === 'fixed') {
			// Apply fixed discount (subtract fixed value)
			finalTotal = totalPriceAndQuantity - discount_value;
		} else if (discount_type === 'percentage') {
			// Apply percentage discount (subtract percentage from subtotal)
			const percentageDiscount = (totalPriceAndQuantity * discount_value) / 100;
			finalTotal = totalPriceAndQuantity - percentageDiscount;
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

	return (
		<>
			<Form {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-3 ">
						<div className="flex items-center">
							<SelectSearch
								placeholder="Customer"
								frameworks={customers?.data}
								onChange={(e) => setCustomer(e)}
								value={customer}
							/>
							<Button type="button" size="icon" variant="secondary">
								<DynamicIcon icon="Plus" className="h-4 w-4" />
							</Button>
						</div>
						<RFrom.RFInput label="" methods={methods} name="invoice_number" />
						<Input placeholder="Scan Barcode" />
						<Input placeholder="Scan Barcode" />
					</div>

					{items.length === 0 ? (
						<div className="border  flex items-center justify-center py-2">
							<div className="text-center flex flex-col items-center gap-2">
								<DynamicIcon icon="Box" className="h-6 w-6" />
								<p className="text-gray-500 dark:text-gray-400 text-center">
									Please Select Product
								</p>
							</div>
						</div>
					) : (
						<div className="">
							<div className="relative overflow-x-auto h-[420px] overflow-y-auto">
								<table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3">
												Product name
											</th>
											<th scope="col" className="px-6 py-3">
												Quantity ({totalQuantity})
											</th>
											<th scope="col" className="px-6 py-3">
												Price
											</th>
											<th scope="col" className="px-6 py-3">
												Total
											</th>
										</tr>
									</thead>
									<tbody className="">
										{items?.map((variant, index) => (
											<tr
												key={index}
												className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
											>
												<th
													scope="row"
													className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													<p>{variant?.product_name}</p>
													<p className="text-xs font-thin">
														{
															variant?.variant_id?.attributes?.find(
																(v) => v._id === variant?.attribute_id
															)?.name
														}
													</p>
												</th>
												<td className="px-0 py-3 flex justify-center">
													<Button
														variant="outline"
														type="button"
														size="icon"
														onClick={() =>
															dispatch(decrementQuantity(variant._id))
														}
														aria-label="Decrease quantity"
													>
														<Minus className="h-4 w-4" />
													</Button>

													<div className="w-20">
														<Input
															type="number"
															id="quantity"
															value={variant.select_quantity}
															onChange={(e) => handleInputChange(e, variant)}
															min="1"
															className="text-center"
														/>
													</div>

													<Button
														variant="outline"
														type="button"
														size="icon"
														onClick={() =>
															dispatch(incrementQuantity(variant._id))
														}
														aria-label="Increase quantity"
													>
														<Plus className="h-4 w-4" />
													</Button>
												</td>
												<td className="px-6 py-3">{variant.sell_price}</td>

												<td className="px-0 py-3 relative  ">
													<Button
														onClick={() => dispatch(removeVariant(variant._id))}
														variant="link"
														size="icon"
														type="button"
														className="p-0 h-6 w-6 absolute right-0 top-0 text-red-500"
													>
														<DynamicIcon icon="CircleX" className="h-4 w-4" />
													</Button>
													{variant.sell_price * variant.select_quantity}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className="flex justify-end mt-3">
								<div className="max-w-xl ">
									<table className="text-sm">
										<tbody>
											<tr>
												<td className="px-6 py-2">Sub Total</td>
												<td className="px-6 py-2">:</td>
												<td className="px-6 py-2">{totalPriceAndQuantity}</td>
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
													{' '}
													<RFrom.RFInput
														label=""
														methods={methods}
														name="tax"
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
												<td className="px-6 py-2">Due</td>
												<td className="px-6 py-2">:</td>
												<td className="px-8 py-2">{dueAmount.toFixed(2)}</td>
											</tr>
											{exchangeAmount > 0 && (
												<tr>
													<td className="px-6 py-2">Exchange</td>
													<td className="px-6 py-2">:</td>
													<td className="px-8 py-2">
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
								</div>
							</div>
						</div>
					)}
				</form>
			</Form>
		</>
	);
}
