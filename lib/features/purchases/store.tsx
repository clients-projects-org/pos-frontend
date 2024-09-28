'use client';
import { z } from 'zod';
import { RFrom } from '@/components/custom/form';
import React, { useEffect, useState } from 'react';
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
import { devZodFrom, FormSchema } from './purchase.zod';
import { UseFormReturn } from 'react-hook-form';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import {
	useGetCreateDataPurchaseQuery,
	useStoreProductsMutation,
} from './purchaseApiSlice';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { saveProductData } from './purchaseSlice';
import { RootState } from '@/lib/store';
import { useGetProductsByIdQuery } from '../create-product';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { SupplierType } from '@/lib/type';
type FormValues = z.infer<typeof FormSchema>;

interface FormProps {
	methods: UseFormReturn<FormValues>;
	onSubmit: (data: FormValues) => void;
	isLoading: boolean;
	type: 'create' | 'edit';
}
export function PurchaseStoreModal() {
	const [open, setOpen] = React.useState(false);
	const { methods } = devZodFrom();
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
			<DialogContent className="max-w-[1420px]">
				<DialogHeader>
					<DialogTitle className="text-center">Create Purchase</DialogTitle>
					<DialogDescription className="text-center">
						Purchase is a transaction of goods from supplier
					</DialogDescription>
				</DialogHeader>
				{/* form  */}
				<FormMutation
					isLoading={isLoading}
					methods={methods}
					onSubmit={onSubmit}
					type="create"
				/>
			</DialogContent>
		</Dialog>
	);
}

const FormMutation: React.FC<FormProps> = ({
	methods,
	onSubmit,
}: FormProps) => {
	const [id, setId] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const selectedData = useAppSelector(
		(state: RootState) => state.purchaseProductsSelect
	);

	console.log(selectedData.selectedData, 'selectedData');
	const { data, isSuccess, isLoading } = useGetCreateDataPurchaseQuery();
	const { data: products } = useGetProductsByIdQuery(id || '', {
		skip: !id,
	});

	useEffect(() => {
		if (products && id) {
			dispatch(saveProductData({ id, data: products?.data }));
		}
	}, [products, id, dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	const supplier_id = methods.watch('supplier_id');
	console.log(methods.watch());
	const getTargetValue = (e: string) => {
		console.log(e);
		setId(e);
	};
	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid gap-4 max-h-[80vh] overflow-y-auto pr-4">
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
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
							name="manufacture_date"
						/>
						<RFrom.RFInput
							label="Chalan Number"
							methods={methods}
							name="name"
						/>
					</div>
					<div className="space-y-4">
						{/* product  */}
						{selectedData.selectedData?.map((e) => (
							<div key={e.id} className="">
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
													Warehouse
												</th>
												<th scope="col" className="px-6 py-2">
													Brand
												</th>
												<th scope="col" className="px-6 py-2">
													Purchase Price
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
														src={e?.data.product.image}
														width={40}
														height={40}
													/>
												</th>
												<td className="px-6 py-2 ">{e?.data.product.name}</td>
												<td className="px-6 py-2">
													{e?.data.product.warehouse_data.name}
												</td>
												<td className="px-6 py-2">
													{e?.data.product.brand_data.name}
												</td>
												<td className="px-6 py-2">{'e.data'}</td>
												<td className="px-6 py-2">
													<RFrom.RFSelect
														methods={methods}
														data={e?.data.product.store_data}
														name="warehouse_id"
													>
														<SelectGroup>
															{e?.data.product.store_data?.map((dev) => (
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
													{e?.data.product.quantity}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								{/* Purchase Info */}
								<div>
									<div className="relative overflow-x-auto">
										<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
											<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
												<tr>
													<th scope="col" className="px-6 py-2">
														Unit
													</th>
													<th scope="col" className="px-6 py-2">
														Variant
													</th>
													<th scope="col" className="px-6 py-2">
														Purchase Price
													</th>
													<th scope="col" className="px-6 py-2">
														Sell Price
													</th>
													<th scope="col" className="px-6 py-2">
														Quantity
													</th>
												</tr>
											</thead>
											<tbody>
												{e.data.variants?.map((ver) => (
													<tr
														key={ver._id}
														className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
													>
														<td className="px-6 py-2">{ver.unit_data.name}</td>
														<td className="px-6 py-2">
															{ver.variant_data.name}
														</td>
														<td className="px-6 py-2">Laptop</td>
														<td className="px-6 py-2">$2999</td>
														<td className="px-6 py-2">$2999</td>
														<td className="px-6 py-2">$2999</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
						<RFrom.RFInput
							label="Order Tax"
							methods={methods}
							name="quantity"
							type="number"
						/>
						<RFrom.RFInput
							label="Discount"
							methods={methods}
							name="quantity"
							type="number"
						/>
						<RFrom.RFInput
							label="Shipping"
							methods={methods}
							name="quantity"
							type="number"
						/>

						<RFrom.RFStatus
							methods={methods}
							items="actDeDraft"
							name="status"
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
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Creating...' : 'Create'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
