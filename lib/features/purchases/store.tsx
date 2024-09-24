'use client';
import { z } from 'zod';
import { RFrom, SelectStatus } from '@/components/custom/form';
import React from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DynamicIcon } from '@/components/actions';
import { DevNameType, StatusType, SupplierType } from '@/lib/type';
import { devZodFrom, FormSchema } from './purchase.zod';
import { UseFormReturn } from 'react-hook-form';
import { apiErrorResponse, apiReqResponse } from '@/lib/actions';
import { useStoreProductsMutation } from './purchaseApiSlice';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';
import { useGetStoreProductQuery } from '../create-product';
import { Form } from '@/components/ui/form';
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
	const { data, isLoading } = useGetStoreProductQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
				{/* options  */}
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
					<RFrom.RFSelect
						methods={methods}
						data={data?.data?.supplier}
						label="Supplier Name"
						name="warehouse_id"
					>
						<SelectGroup>
							<SelectLabel>Warehouse All List</SelectLabel>
							{data?.data?.warehouse?.map((dev: SupplierType) => (
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

					<RFrom.RFSelect
						methods={methods}
						data={data?.data?.supplier}
						label="Product"
						name="warehouse_id"
					>
						<SelectGroup>
							<SelectLabel>Warehouse All List</SelectLabel>
							{data?.data?.warehouse?.map((dev: SupplierType) => (
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

					<RFrom.RFCalender
						label="Purchase Date"
						methods={methods}
						name="manufacture_date"
					/>
					<RFrom.RFInput label="Chalan Number" methods={methods} name="name" />
				</div>
				{/* product  */}
				<div>
					<RFrom.RFInput label="Product Name" methods={methods} name="name" />
				</div>

				{/* purchase  */}
				<div>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										Product
									</th>
									<th scope="col" className="px-6 py-3">
										Quantity
									</th>
									<th scope="col" className="px-6 py-3">
										Purchase Price
									</th>
									<th scope="col" className="px-6 py-3">
										Discount Tax Tax Amount Unit Cost Total Cost
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Apple MacBook Pro 17"
									</th>
									<td className="px-6 py-4">Silver</td>
									<td className="px-6 py-4">Laptop</td>
									<td className="px-6 py-4">$2999</td>
								</tr>
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Microsoft Surface Pro
									</th>
									<td className="px-6 py-4">White</td>
									<td className="px-6 py-4">Laptop PC</td>
									<td className="px-6 py-4">$1999</td>
								</tr>
								<tr className="bg-white dark:bg-gray-800">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										Magic Mouse 2
									</th>
									<td className="px-6 py-4">Black</td>
									<td className="px-6 py-4">Accessories</td>
									<td className="px-6 py-4">$99</td>
								</tr>
							</tbody>
						</table>
					</div>
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

					<RFrom.RFStatus methods={methods} items="actDeDraft" name="status" />
				</div>

				<div>
					<RFrom.RFTextarea
						methods={methods}
						label="Description"
						name="description"
					/>
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
