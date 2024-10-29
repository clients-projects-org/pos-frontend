import { ApiUseHOC } from '@/components/hoc';
import React from 'react';
import { useGetSellInvoiceQuery } from './posApiSlice';
import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { dateFormat1 } from '@/lib/actions';
import { DynamicIcon, TkSign } from '@/components/actions';

export function SellInvoiceModal({
	open,
	setOpen,
	id,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	id: string;
}) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="max-w-xl w-full mx-auto">
				<DialogHeader>
					<DialogTitle className="text-center text-2xl">Invoice</DialogTitle>
				</DialogHeader>
				<SellInvoice id={id} />
				{/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
}

export function SellInvoice({ id }: { id: string }) {
	const { data, isLoading, isFetching, isError } = useGetSellInvoiceQuery(id, {
		skip: !id,
	});
	return (
		<ApiUseHOC
			data={data}
			isFetching={isFetching}
			isLoading={isLoading}
			isError={isError}
		>
			<div className="">
				<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
					<CardHeader className="flex flex-row items-start bg-muted/50">
						<div className="grid gap-0.5">
							<CardTitle className="group flex items-center gap-2 text-lg">
								Order #{data?.data?._id}
								<Button
									size="icon"
									variant="outline"
									className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<Copy className="h-3 w-3" />
									<span className="sr-only">Copy Order ID</span>
								</Button>
							</CardTitle>
							<CardDescription>
								Date:{' '}
								{data?.data?.createdAt &&
									dateFormat1(data?.data?.createdAt?.toString())}
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="p-6 text-sm">
						<div className="grid gap-3">
							<div className="font-semibold">Order Details</div>
							<ul className="grid gap-3">
								{data?.data?.product_details?.map((product, i: number) => (
									<li key={i} className="flex items-center justify-between">
										<div>
											<span className="text-muted-foreground">
												{product.product_id.name} x{' '}
												<span>{product.quantity}</span>
											</span>
											<div className="text-muted-foreground text-xs">
												{product.variant_id?.attributes
													?.filter((a) => a._id === product.attribute_id)
													?.map((attr, i: number) => (
														<span key={i}>{attr.name}</span>
													))}
											</div>
										</div>
										<span>
											{product.sell_price} <TkSign />
										</span>
									</li>
								))}
							</ul>
							<Separator className="my-2" />
							<ul className="grid gap-3">
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>{data?.data?.total_price}</span>
								</li>
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">
										Discount ({data?.data?.discount_type})
									</span>
									<span>
										{data?.data?.discount_type !== 'none'
											? data?.data?.discount_value
											: 0}
									</span>
								</li>
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">Tax</span>
									<span>{data?.data?.tax}</span>
								</li>
								<li className="flex items-center justify-between font-semibold">
									<span className="text-muted-foreground">Grand Total</span>
									<span>{data?.data?.grand_total}</span>
								</li>
							</ul>
						</div>

						{/*  Shipping Information

                        <Separator className="my-4" />
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-3">
								<div className="font-semibold">Shipping Information</div>
								<address className="grid gap-0.5 not-italic text-muted-foreground">
									<span>Liam Johnson</span>
									<span>1234 Main St.</span>
									<span>Anytown, CA 12345</span>
								</address>
							</div>
							<div className="grid auto-rows-max gap-3">
								<div className="font-semibold">Billing Information</div>
								<div className="text-muted-foreground">
									Same as shipping address
								</div>
							</div>
						</div> */}

						{data?.data.customer && (
							<>
								<Separator className="my-4" />
								<div className="grid gap-3">
									<div className="font-semibold">Customer Information</div>
									<dl className="grid gap-3">
										<div className="flex items-center justify-between">
											<dt className="text-muted-foreground">Customer</dt>
											<dd>{data?.data.customer?.name || ''}</dd>
										</div>
										<div className="flex items-center justify-between">
											<dt className="text-muted-foreground">Email</dt>
											<dd>
												<a href="mailto:">{data?.data.customer?.email || ''}</a>
											</dd>
										</div>
										<div className="flex items-center justify-between">
											<dt className="text-muted-foreground">Phone</dt>
											<dd>
												<a href="tel:">{data?.data.customer?.phone || ''}</a>
											</dd>
										</div>
									</dl>
								</div>
							</>
						)}
						<Separator className="my-4" />
						<div className="grid gap-3">
							<div className="font-semibold">Created By</div>
							<dl className="grid gap-3">
								<div className="flex items-center justify-between">
									<dt className="flex items-center gap-1 text-muted-foreground">
										<DynamicIcon icon="User" className="h-4 w-4" />
										{data?.data?.created_by?.name || ''}
									</dt>
									<div>
										<dd>{data?.data?.created_by?.phone || ''}</dd>
										<dd>{data?.data?.created_by?.email || ''}</dd>
									</div>
								</div>
							</dl>
						</div>

						{/* Payment Information
                        <Separator className="my-4" />
						<div className="grid gap-3">
							<div className="font-semibold">Payment Information</div>
							<dl className="grid gap-3">
								<div className="flex items-center justify-between">
									<dt className="flex items-center gap-1 text-muted-foreground">
										<CreditCard className="h-4 w-4" />
										Visa
									</dt>
									<dd>**** **** **** 4532</dd>
								</div>
							</dl>
						</div> */}
					</CardContent>
					<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
						<div className="text-xs text-muted-foreground">
							Thanks For Your Business
						</div>
						<Button variant="outline" size="sm" className="ml-auto">
							Download Invoice
						</Button>
					</CardFooter>
				</Card>
			</div>
		</ApiUseHOC>
	);
}
