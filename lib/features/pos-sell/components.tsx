'use client';
import { DynamicIcon } from '@/components/actions';
import {
	DropDownDotItem,
	DropDownThreeDot,
} from '@/components/custom/list-item';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableItem } from '@/lib/table/table-items/t-item';
import { PurchaseType, StatusType } from '@/lib/type';
import { ColumnDef } from '@tanstack/react-table';
import { useParams, useRouter } from 'next/navigation';
import { apiReqResponse, confirm } from '@/lib/actions';
import { showToast, ToastOptions } from '@/lib/actions/tost';

import { Badge } from '@/components/ui/badge';
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
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useGetPaymentMethodQuery } from '../payment-method';
import { RFrom } from '@/components/custom/form';
import { useAddPaymentSellMutation } from './posApiSlice';

const Column: ColumnDef<PurchaseType>[] = [
	{
		accessorKey: 'discount_value',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Discount
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => (
			<div className="lowercase text-center">
				{row.getValue('discount_value')}{' '}
				{row.getValue('discount_type') === 'percentage' && '%'}
				{row.getValue('discount_type') === 'fixed' && 'tk'}
			</div>
		),
	},
	{
		accessorKey: 'paid',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Paid
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => (
			<div
				className={`lowercase text-center ${row.getValue('due') > 0 ? 'text-yellow-500' : 'text-green-500'}`}
			>
				{row.getValue('total_price') - row.getValue('due')}
			</div>
		),
	},
	{
		accessorKey: 'due',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Due
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }: any) => (
			<div
				className={`lowercase text-center ${row.getValue('due') > 0 ? 'text-red-500' : 'text-green-500'}`}
			>
				{row.getValue('due')}
			</div>
		),
	},

	TableItem.Text('total_quantity', 'Quantity'),
	TableItem.Text('total_product_price', 'Buy Price'),
	TableItem.Text('total_price', 'Sell Price'),
	TableItem.Date('createdAt', 'Date'),
	{
		id: 'actions',
		header: () => 'Actions',
		cell: ({ row }: { row: any }) => {
			return <Actions data={row.original} />;
		},
	},
];

const Filter = ({
	value,
	setValue,
}: {
	value: StatusType | 'all';
	setValue: Function;
}) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className=" ">
						<DynamicIcon icon="ListFilter" className="h-4 w-4 sm:mr-2" />
						<span className="sr-only sm:not-sr-only capitalize">{value}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Filter by</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('all')}
						checked={value === 'all'}
					>
						All
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('active')}
						checked={value === 'active'}
					>
						Active
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('deactivated')}
						checked={value === 'deactivated'}
					>
						Deactivated
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onCheckedChange={() => setValue('draft')}
						checked={value === 'draft'}
					>
						Draft
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
const Actions = ({ data }: { data: PurchaseType }) => {
	const router = useRouter();
	const params = useParams<{ slug: string; item: string }>();
	const [paymentModal, setPaymentModal] = useState(false);

	// const loading = isLoading || updateStatusLoading;

	const handleDelete = async (id: string) => {
		try {
			const confirmed = await confirm({
				message:
					'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				title: 'Delete Account',
			});

			if (confirmed) {
				// Perform the delete action here
				// await deleting({ id }).unwrap();
				const options: ToastOptions = {
					title: 'Successfully Deleted',
					description: 'Item delete is done, You can not find it, Thanks',
					autoClose: true,
					autoCloseDelay: 5000,
				};
				showToast(options);
				if (params.slug.startsWith('permission')) {
					router.push('/user-management/roles-permissions');
				}
			} else {
			}
		} catch (err) {
			console.error('Failed to delete the permission: ', err);
		}
	};
	const handleReceive = async (id: string) => {
		try {
			const confirmed = await confirm({
				message:
					'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				title: 'Delete Account',
			});

			if (confirmed) {
				// Perform the delete action here
				// await receiving(id).unwrap();
				const options: ToastOptions = {
					title: 'Successfully Deleted',
					description: 'Item delete is done, You can not find it, Thanks',
					autoClose: true,
					autoCloseDelay: 5000,
				};
				showToast(options);
				if (params.slug.startsWith('permission')) {
					// router.push('/user-management/roles-permissions');
				}
			} else {
			}
		} catch (err) {
			console.error('Failed to delete the permission: ', err);
		}
	};

	/*
		if main id ok fine only [main id] 
		if routes need [main id] and [routes id] 
		if actions need [main id] and [routes id] and [actions id]
	*/

	const handleStatusChange = async (status: StatusType) => {
		try {
			// await updateStatus({ id: data._id, status }).unwrap();
		} catch (err) {
			// console.error('Failed to update the status: ', err);
		}
	};

	return (
		<DropDownThreeDot
			// isLoading={isLoading || updateStatusLoading}
			icon="MoreHorizontal"
		>
			{/* <DropDownDotItem
				icon="SquarePen"
				name="Edit"
				onChange={() => {
					router.push(`/inventory/category/edit-${data._id}`);
				}}
				disabled={loading}
			/>
			<DropDownDotItem
				icon="ScanEye"
				name="View"
				onChange={() => {
					router.push(`/inventory/category/${data._id}`);
				}}
				disabled={loading}
			/> */}
			<DropdownMenuSeparator />
			{data.purchase_status === 'ordered' && (
				<DropDownDotItem
					icon="CircleCheckBig"
					name="Receive Order"
					onChange={() => data._id && handleReceive(data._id)}
					// disabled={loading}
				/>
			)}

			{data.payment_status === 'due' && (
				<Dialog open={paymentModal}>
					<DialogTrigger asChild>
						<button
							type="button"
							onClick={() => setPaymentModal(true)}
							className="w-full flex items-center gap-2 text-sm px-2 py-2 rounded-sm"
						>
							<DynamicIcon icon="HandCoins" className="w-4 h-4" />
							<span>Add Payment</span>
						</button>
					</DialogTrigger>
					<DialogContent showCloseButton={false} className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle className="text-center">
								<p>Add Payment</p>
								<p className="text-sm ">
									{/* {data.supplier_data.name}({data.supplier_data.business_name}) */}
								</p>
							</DialogTitle>

							<DialogDescription className="text-center">
								{' '}
								#{data._id}
							</DialogDescription>
						</DialogHeader>
						<SellPayment data={data} setPaymentModal={setPaymentModal} />
					</DialogContent>
				</Dialog>
			)}

			{/* {data.status !== 'deactivated' && data.status !== 'new' && (
				<DropDownDotItem
					icon="CircleSlash2"
					name="Deactivated"
					onChange={() => data._id && handleStatusChange('deactivated')}
					disabled={loading}
				/>
			)}

			{data.status !== 'draft' && data.status !== 'new' && (
				<DropDownDotItem
					icon="PackageX"
					name="Draft"
					onChange={() => data._id && handleStatusChange('draft')}
					disabled={loading}
				/>
			)}
			{(data.status === 'draft' || data.status === 'new') && (
				<DropDownDotItem
					icon="Trash2"
					name="Delete"
					onChange={() => data._id && handleDelete(data._id)}
					disabled={loading}
				/>
			)} */}
		</DropDownThreeDot>
	);
};

const Add = () => {
	const router = useRouter();
	return (
		<Button
			type="button"
			onClick={() => router.push('/sales/pos')}
			variant="outline"
			className="gap-1 flex items-center border px-3 py-2 text-sm rounded-sm hover:bg-slate-800"
		>
			<DynamicIcon icon="PlusCircle" className="h-4 w-4 sm:mr-2" />
			<span className="sr-only sm:not-sr-only capitalize !whitespace-nowrap">
				New Pos Sell
			</span>
		</Button>
	);
};

export const SellComponents = { Filter, Add, Column };

export function SellPayment({
	data,
	setPaymentModal,
}: {
	data: any;
	setPaymentModal: Function;
}) {
	const { data: paymentMethod } = useGetPaymentMethodQuery('active');
	const [addPayment, { isLoading }] = useAddPaymentSellMutation();
	const FormSchema = z.object({
		note: z.string().optional(),
		payment_method: z.string().min(1, 'Payment Method is Required'),
		paid_amount: z.preprocess(
			(val) => {
				// If it's a string, convert it to a number
				if (typeof val === 'string') {
					const num = Number(val);
					return isNaN(num) ? undefined : num; // Return undefined if the conversion fails (so it fails validation)
				}
				return val; // Otherwise return the value unchanged
			},
			z
				.number()
				.min(1, {
					message: 'Paid Amount is Required',
				})
				.max(data.due_amount, {
					message: `Paid Amount should be less than or equal to ${data.due_amount}`,
				})
		),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			paid_amount: data.due || 0,
		},
	});

	// useEffect(() => {
	// 	if (data) {
	// 		form.reset({
	// 			paid_amount: data.due_amount || 0,
	// 		});
	// 	}
	// }, [data, form.reset]);

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		const confirmed = await confirm({
			message:
				'Are You sure you want to add this payment? This action cannot be undone.',
			title: 'Add Payment',
		});

		if (confirmed) {
			const response = await addPayment({
				...values,
				_id: data._id,
			}).unwrap();

			if (response.success) {
				apiReqResponse(response);
				setPaymentModal(false);
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="paid_amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment</FormLabel>
							<FormControl>
								<Input placeholder="type..." {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<RFrom.SearchAbleSelect
					methods={form}
					label="Payment Method"
					name="payment_method"
					OPTIONS={paymentMethod?.data}
				/>
				<FormField
					control={form.control}
					name="note"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Note</FormLabel>
							<FormControl>
								<Textarea placeholder="type..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button
						type="button"
						variant="destructive"
						onClick={() => setPaymentModal(false)}
					>
						Cancel
					</Button>
					<Button type="submit">Submit</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
