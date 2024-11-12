```tsx
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
import { DynamicIcon } from '@/components/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { SupplierSelect } from './supplier-select';
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
			<DialogContent className="max-w-full  ">
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

const FormMutation = ({ methods, setOpen, resetForm }) => {
	return (
		<div className="h-[70vh] overflow-y-auto px-4">
			{/* auto product rate  */}
			<div className="flex gap-3 justify-center  mb-2">
				<Label htmlFor="terms">Auto Product Rate</Label>
				<Switch id="airplane-mode" />
			</div>

			<div className="grid gap-3 grid-cols-5 mb-4">
				{/* <div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Accept terms and conditions</Label>
					<Input id="terms" type="email" placeholder="Email" />
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div> */}

				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Supplier Select</Label>
					<SupplierSelect />
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Product</Label>
					<SupplierSelect />
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Purchase Date</Label>
					<Input id="terms" type="email" placeholder="Email" />
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Reference Number</Label>
					<Input id="terms" type="email" placeholder="Email" />
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div>
				<div className="flex flex-col gap-3 ">
					<Label htmlFor="terms">Status</Label>
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a fruit" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Fruits</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Label className="text-destructive -mt-1" htmlFor="terms">
						Accept terms and conditions
					</Label>
				</div>
			</div>

			<div className="product-section">
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
									Previous Qty
									<Button
										variant="destructive"
										size="icon"
										className="absolute top-0 right-0 h-6 w-6"
										type="button"
									>
										<DynamicIcon icon="Minus" />
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
								<td className="px-6 py-2 ">Product Name</td>
								<td className="px-6 py-2">
									<Select>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="apple">Single</SelectItem>
												<SelectItem value="banana">Variable</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</td>

								<td className="px-6 py-2">
									<Select>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="apple">Apple</SelectItem>
												<SelectItem value="banana">Banana</SelectItem>
												<SelectItem value="blueberry">Blueberry</SelectItem>
												<SelectItem value="grapes">Grapes</SelectItem>
												<SelectItem value="pineapple">Pineapple</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</td>
								<td className="px-6 py-2">
									<Select>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="apple">Apple</SelectItem>
												<SelectItem value="banana">Banana</SelectItem>
												<SelectItem value="blueberry">Blueberry</SelectItem>
												<SelectItem value="grapes">Grapes</SelectItem>
												<SelectItem value="pineapple">Pineapple</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</td>
								<td className="px-6 py-2">10</td>
							</tr>
						</tbody>
					</table>

					<div className="relative">
						<div className="grid grid-cols-7 gap-x-4 gap-y-6 border p-2 rounded relative bg-gray-50 dark:bg-gray-900">
							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Select Variant</Label>
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>
							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Select Attribute</Label>
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>

							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Quantity</Label>
								<Input type="number" />
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>

							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Rate</Label>
								<Input type="number" />
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>

							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Date</Label>
								<Input type="number" />
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>

							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Date</Label>
								<Input type="number" />
								<Label className="text-destructive -mt-1" htmlFor="terms">
									Accept terms and conditions
								</Label>
							</div>
							<div className="flex flex-col gap-3 ">
								<Label htmlFor="terms">Total</Label>
								<Input type="number" />
							</div>

							<Button
								variant="destructive"
								size="icon"
								className="absolute top-3 right-0 h-6 w-6"
								type="button"
							>
								<DynamicIcon icon="Minus" />
							</Button>
						</div>

						<Button
							variant="secondary"
							className="absolute bottom-0 right-0 h-6 w-6"
							size="icon"
							type="button"
						>
							<DynamicIcon icon="Plus" />
						</Button>
					</div>

					<div className="flex justify-end mt-3">
						<div className="max-w-xl  ">
							<table>
								<tbody>
									<tr>
										<td className="px-6 py-2">Total Price</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Input type="number" />
										</td>
									</tr>
									<tr hidden className="">
										<td className="px-6 py-2">Discount Type</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Select>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a fruit" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="apple">Apple</SelectItem>
														<SelectItem value="banana">Banana</SelectItem>
														<SelectItem value="blueberry">Blueberry</SelectItem>
														<SelectItem value="grapes">Grapes</SelectItem>
														<SelectItem value="pineapple">Pineapple</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</td>
									</tr>

									<tr>
										<td className="px-6 py-2">Discount Value (%)</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Input type="number" />
										</td>
									</tr>

									<tr className="border-t text-center font-bold">
										<td className="px-6 py-2">After Discount</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">234</td>
									</tr>

									<tr>
										<td className="px-6 py-2">Tax (%)</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Input type="number" />
										</td>
									</tr>
									<tr>
										<td className="px-6 py-2">Shipping Cost</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Input type="number" />
										</td>
									</tr>
									<tr>
										<td className="px-6 py-2">Paid</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">
											<Input type="number" />
										</td>
									</tr>
									<tr>
										<td className="px-6 py-4">Due</td>
										<td className="px-6 py-2">:</td>
										<td className="px-8 py-4">1212 </td>
									</tr>

									<tr>
										<td className="px-6 py-4">Exchange</td>
										<td className="px-6 py-2">:</td>
										<td className="px-8 py-4">2323</td>
									</tr>

									<tr className="border-t text-center font-bold">
										<td className="px-6 py-2">Grand Total</td>
										<td className="px-6 py-2">:</td>
										<td className="px-6 py-2">12321</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-end mt-8"></div>

					<div className="space-y-4 max-w-sm absolute left-0 bottom-0 w-full">
						<div className="flex flex-col gap-3">
							<Label htmlFor="terms">Status</Label>

							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a fruit" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="apple">Apple</SelectItem>
										<SelectItem value="banana">Banana</SelectItem>
										<SelectItem value="blueberry">Blueberry</SelectItem>
										<SelectItem value="grapes">Grapes</SelectItem>
										<SelectItem value="pineapple">Pineapple</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Label className="text-destructive -mt-1" htmlFor="terms">
								Accept terms and conditions
							</Label>
						</div>

						<Textarea placeholder="Type your message here." />
					</div>
				</div>
			</div>
		</div>
	);
};
