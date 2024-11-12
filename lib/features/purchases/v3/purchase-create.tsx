'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { DynamicIcon, TkSign } from '@/components/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { SupplierSelect } from './supplier-select';
import { format } from 'date-fns';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { image } from '@/assets/image';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	addProduct,
	addVariant,
	calculate,
	removeVariant,
	setField,
	updateVariant,
} from './actions-slice';
import { useGetCreateDataPurchaseQuery } from '../purchaseApiSlice';
import { ProductSelect } from './product-select';

export function PurchaseCreate() {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) {
					// resetForm();
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
			<DialogContent className="max-w-full overflow-hidden">
				<DialogHeader>
					<DialogTitle className="text-center">Create Purchase New</DialogTitle>
					<DialogDescription className="text-center">
						Purchase is a transaction of goods from supplier
					</DialogDescription>
				</DialogHeader>
				{/* form  */}
				<FormMutation />
			</DialogContent>
		</Dialog>
	);
}

const FormMutation = () => {
	const { data, isLoading } = useGetCreateDataPurchaseQuery(undefined);

	const dispatch = useAppDispatch();
	const handleInputChange = (field: any, value: any) => {
		dispatch(setField({ field, value }));
	};

	const state = useAppSelector((state) => state.purchase);
	const { discount, totalPrice, grandTotal, dueAndExchange } = calculate;
	const getTotal = totalPrice(state);
	const getDiscount = discount(state);
	const getGrandTotal = grandTotal(state);
	const { dueAmount, exchangeAmount } = dueAndExchange(state);
	console.log(state);

	return (
		<div className=" h-screen   overflow-y-auto px-4">
			{/* auto product rate  */}
			<div className="flex gap-3 justify-center  mb-2">
				<Label htmlFor="auto_payment_system">Auto Product Rate</Label>
				<Switch
					onCheckedChange={(e) => handleInputChange('auto_payment_system', e)}
					checked={state.auto_payment_system}
					id="auto_payment_system"
				/>
			</div>

			<div className="grid gap-3 grid-cols-5 mb-4">
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Supplier Select</Label>
					<SupplierSelect />
					{state?.errors?.supplier_id && (
						<Label className="text-destructive -mt-1" htmlFor="supplier_id">
							{state?.errors?.supplier_id}
						</Label>
					)}
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="products">Product</Label>
					<ProductSelect />
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Purchase Date</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
									'w-[240px] pl-3 text-left font-normal',
									!state.purchase_date && 'text-muted-foreground'
								)}
							>
								{state.purchase_date ? (
									format(state.purchase_date, 'PPP')
								) : (
									<span>Pick a date</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={state.purchase_date}
								onSelect={(date) => handleInputChange('purchase_date', date)}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="reference_number">Reference Number</Label>
					<Input
						value={state.reference_number}
						onChange={(e) =>
							handleInputChange('reference_number', e.target.value)
						}
						id="reference_number"
						type="text"
						placeholder="Reference Number"
					/>
					{state?.errors?.reference_number && (
						<Label
							className="text-destructive -mt-1"
							htmlFor="reference_number"
						>
							{state?.errors?.reference_number}
						</Label>
					)}
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="purchase_status">Status</Label>
					<Select
						onValueChange={(e) => handleInputChange('purchase_status', e)}
						defaultValue={state.purchase_status}
					>
						<SelectTrigger id="purchase_status" className="w-full">
							<SelectValue placeholder="Select a Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="ordered">Ordered</SelectItem>
								<SelectItem value="received">Received</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					{state?.errors?.purchase_status && (
						<Label className="text-destructive -mt-1" htmlFor="purchase_status">
							{state?.errors?.purchase_status}
						</Label>
					)}
				</div>
			</div>
			<div className="relative">
				<div className="space-y-4 ">
					{state.products?.map((product) => (
						<div className="product-section">
							<div className=" relative overflow-x-auto">
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
												Sell Price
											</th>
											<th scope="col" className="px-6 py-2">
												Product Type
											</th>

											<th scope="col" className="px-6 py-2">
												Select Warehouse
											</th>

											<th scope="col" className="px-6 py-2">
												Select Store
												<Button
													variant="destructive"
													size="icon"
													className="absolute top-0 right-0 h-6 w-6"
													type="button"
													onClick={() => {
														// remove by id
														dispatch(addProduct(product));
													}}
												>
													<DynamicIcon icon="X" />
												</Button>
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
													src={image.placeholder}
													width={40}
													height={40}
												/>
											</th>
											<td className="px-6 py-2 ">{product.name}</td>
											<td className="px-6 py-2 ">
												<TkSign value={product.sell_price} position="right" />
											</td>
											<td className="px-6 py-2">
												<Select>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a type" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem value="single">Single</SelectItem>
															<SelectItem value="variant">Variable</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</td>

											<td className="px-6 py-2">
												<Select>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a warehouse" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{product.warehouse_id?.map((warehouse) => (
																<SelectItem
																	key={warehouse._id}
																	value={warehouse._id}
																>
																	{warehouse.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</td>
											<td className="px-6 py-2">
												<Select>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a store" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{product.store_id?.map((store) => (
																<SelectItem key={store._id} value={store._id}>
																	{store.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											</td>
										</tr>
									</tbody>
								</table>

								{product.variants?.map((variant) => (
									<div key={variant.id} className="relative">
										<div className="grid grid-cols-7 gap-x-4 gap-y-6 border p-2 rounded relative bg-gray-50 dark:bg-gray-900">
											<div className="flex flex-col gap-3 ">
												<Label htmlFor="terms">Select Variant</Label>
												<Select
													onValueChange={(e) =>
														dispatch(
															updateVariant({
																key: 'variant_id',
																value: e,
																product_id: product._id,
																variant_id: variant.id,
															})
														)
													}
													defaultValue={variant.variant_id}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a variant" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{data?.data.variant?.map((variant) => (
																<SelectItem
																	key={variant._id}
																	value={variant._id}
																>
																	{variant.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
												<Label
													className="text-destructive -mt-1"
													htmlFor="terms"
												>
													Accept terms and conditions
												</Label>
											</div>
											<div className="flex flex-col gap-3 ">
												<Label htmlFor="terms">Select Attribute</Label>
												<Select
													onValueChange={(e) =>
														dispatch(
															updateVariant({
																key: 'attribute_id',
																value: e,
																product_id: product._id,
																variant_id: variant.id,
															})
														)
													}
													defaultValue={variant.attribute_id}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a attribute" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{data?.data?.variant
																?.find((v) => v._id === variant.variant_id)
																?.attributes?.map((att) => (
																	<SelectItem key={att._id} value={att._id}>
																		{att.name}
																	</SelectItem>
																))}
														</SelectGroup>
													</SelectContent>
												</Select>
												<Label
													className="text-destructive -mt-1"
													htmlFor="terms"
												>
													Accept terms and conditions
												</Label>
											</div>

											<div className="flex flex-col gap-3 ">
												<Label htmlFor={`quantity` + variant.id}>
													Quantity
												</Label>
												<Input
													onChange={(e) =>
														dispatch(
															updateVariant({
																key: 'quantity',
																value: Number(e.target.value),
																product_id: product._id,
																variant_id: variant.id,
															})
														)
													}
													defaultValue={state.purchase_status}
													type="number"
													id={`quantity` + variant.id}
													onWheel={(event) => event.currentTarget.blur()}
												/>
												<Label
													className="text-destructive -mt-1"
													htmlFor={`quantity` + variant.id}
												>
													Accept terms and conditions
												</Label>
											</div>

											<div className="flex flex-col gap-3 ">
												<Label htmlFor={`rate` + variant.id}>Rate</Label>
												<Input
													onChange={(e) =>
														dispatch(
															updateVariant({
																key: 'rate',
																value: Number(e.target.value),
																product_id: product._id,
																variant_id: variant.id,
															})
														)
													}
													defaultValue={state.purchase_status}
													type="number"
													id={`rate` + variant.id}
													onWheel={(event) => event.currentTarget.blur()}
												/>
												<Label
													className="text-destructive -mt-1"
													htmlFor={`rate` + variant.id}
												>
													Accept terms and conditions
												</Label>
											</div>

											<div className="flex flex-col gap-3 ">
												<Label htmlFor="terms">Manufacturing Date</Label>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 text-left font-normal',
																!variant.manufacture_date &&
																	'text-muted-foreground'
															)}
														>
															{variant.manufacture_date ? (
																format(variant.manufacture_date, 'PPP')
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={
																variant.manufacture_date as unknown as Date
															}
															onSelect={(v) =>
																dispatch(
																	updateVariant({
																		key: 'manufacture_date',
																		value: v as unknown as string,
																		product_id: product._id,
																		variant_id: variant.id,
																	})
																)
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<Label
													className="text-destructive -mt-1"
													htmlFor="terms"
												>
													Accept terms and conditions
												</Label>
											</div>

											<div className="flex flex-col gap-3 ">
												<Label htmlFor="terms">Expire Date</Label>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant={'outline'}
															className={cn(
																'w-[240px] pl-3 text-left font-normal',
																!variant.expire_date && 'text-muted-foreground'
															)}
														>
															{variant.expire_date ? (
																format(variant.expire_date, 'PPP')
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={variant.expire_date as unknown as Date}
															onSelect={(v) =>
																dispatch(
																	updateVariant({
																		key: 'expire_date',
																		value: v as unknown as string,
																		product_id: product._id,
																		variant_id: variant.id,
																	})
																)
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<Label
													className="text-destructive -mt-1"
													htmlFor="terms"
												>
													Accept terms and conditions
												</Label>
											</div>
											<div className="flex flex-col gap-3 ">
												<Label htmlFor={`quantity-total` + variant.id}>
													Total
												</Label>
												<Input
													id={`quantity-total` + variant.id}
													value={(variant.quantity * variant.rate).toFixed(2)}
													disabled
													type="number"
													onWheel={(event) => event.currentTarget.blur()}
												/>
											</div>

											{product.variants.length > 1 && (
												<Button
													onClick={() => {
														dispatch(
															removeVariant({
																product_id: product._id,
																id: variant.id,
															})
														);
													}}
													variant="destructive"
													size="icon"
													className="absolute top-3 right-0 h-6 w-6"
													type="button"
												>
													<DynamicIcon icon="Minus" />
												</Button>
											)}
										</div>

										<Button
											onClick={() => {
												dispatch(addVariant({ product_id: product._id }));
											}}
											variant="secondary"
											className="absolute bottom-0 right-0 h-6 w-6"
											size="icon"
											type="button"
										>
											<DynamicIcon icon="Plus" />
										</Button>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-end mt-3">
					<div className="max-w-xl  ">
						<table>
							<tbody>
								<tr>
									<td className="px-6 py-2">Total Price</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										{/* <Input
											type="number"
											onWheel={(event) => event.currentTarget.blur()}

										/> */}

										{getTotal.toFixed(2)}
									</td>
								</tr>
								<tr className="">
									<td className="px-6 py-2">Discount Type</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<Select
											defaultValue={state.discount_type}
											onValueChange={(v) =>
												handleInputChange('discount_type', v)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a type" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="none">None</SelectItem>
													<SelectItem value="percentage">Percentage</SelectItem>
													<SelectItem value="fixed">Fixed</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</td>
								</tr>

								{state.discount_type !== 'none' && (
									<>
										<tr>
											<td className="px-6 py-2">Discount Value (%)</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">
												<Input
													type="number"
													onWheel={(event) => event.currentTarget.blur()}
													value={state.discount_value}
													onChange={(e) =>
														handleInputChange(
															'discount_value',
															Number(e.target.value)
														)
													}
												/>
											</td>
										</tr>

										<tr className="border-t text-center font-bold">
											<td className="px-6 py-2">After Discount</td>
											<td className="px-6 py-2">:</td>
											<td className="px-6 py-2">{getDiscount.toFixed(2)}</td>
										</tr>
									</>
								)}

								<tr>
									<td className="px-6 py-2">Tax (%)</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<Input
											type="number"
											onWheel={(event) => event.currentTarget.blur()}
											value={state.tax}
											onChange={(e) =>
												handleInputChange('tax', Number(e.target.value))
											}
										/>
									</td>
								</tr>
								<tr>
									<td className="px-6 py-2">Shipping Cost</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<Input
											type="number"
											onWheel={(event) => event.currentTarget.blur()}
											value={state.shipping_cost}
											onChange={(e) =>
												handleInputChange(
													'shipping_cost',
													Number(e.target.value)
												)
											}
										/>
									</td>
								</tr>
								<tr>
									<td className="px-6 py-2">Paid</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">
										<Input
											type="number"
											onWheel={(event) => event.currentTarget.blur()}
											value={state.paid_amount}
											onChange={(e) =>
												handleInputChange('paid_amount', Number(e.target.value))
											}
										/>
									</td>
								</tr>
								<tr>
									<td className="px-6 py-4">Due</td>
									<td className="px-6 py-2">:</td>
									<td className="px-8 py-4">{dueAmount.toFixed(2)} </td>
								</tr>

								<tr>
									<td className="px-6 py-4">Exchange</td>
									<td className="px-6 py-2">:</td>
									<td className="px-8 py-4">{exchangeAmount.toFixed(2)}</td>
								</tr>

								<tr className="border-t text-center font-bold">
									<td className="px-6 py-2">Grand Total</td>
									<td className="px-6 py-2">:</td>
									<td className="px-6 py-2">{getGrandTotal.toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-end mt-8"></div>

				<div className="space-y-4 max-w-sm absolute left-0 bottom-0 w-full">
					<div className="flex flex-col gap-3">
						<Label htmlFor="terms">Payment Method</Label>

						<Select
							onValueChange={(e) => handleInputChange('payment_method', e)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a Payment Method" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{data?.data.paymentMethod.map((method) => (
										<SelectItem key={method._id} value={method._id}>
											{method.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Label className="text-destructive -mt-1" htmlFor="terms">
							Accept terms and conditions
						</Label>
					</div>

					<Textarea
						value={state.description}
						onChange={(e) => handleInputChange('description', e.target.value)}
						placeholder="Type your message here."
					/>
				</div>
			</div>
		</div>
	);
};
