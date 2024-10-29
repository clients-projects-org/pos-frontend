'use client';

import * as React from 'react';
import {
	Activity,
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	DollarSign,
	File,
	ListFilter,
	MoreVertical,
	Truck,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from '@/components/ui/pagination';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTitle from '@/components/custom/PageTitle';
import { useDashboardAdminStatisticsQuery } from '@/lib/features/dashboard';
import { PageDetailsApiHOC } from '@/components/hoc';
import { DynamicIcon, TkSign } from '@/components/actions';
import Link from 'next/link';
import { PurchaseStoreModalNew } from '@/lib/features/purchases/new-create';
import { dateFormat1 } from '@/lib/actions';

export default function Dashboard() {
	const { data, isError, isFetching, error, isLoading } =
		useDashboardAdminStatisticsQuery();

	const totalPaidPos = data?.data?.posStatistics?.allTime?.totalPaid ?? 0; // Default to 0 if undefined
	const totalPaidPurchase =
		data?.data?.posStatistics?.allTime?.total_product_price ?? 0; // Default to 0 if undefined

	const totalPaidDifference = Math.max(
		0,
		totalPaidPos - totalPaidPurchase
	).toFixed(2);

	return (
		<>
			<PageTitle title="Admin Dashboard" />
			<PageDetailsApiHOC
				error={error}
				isLoading={isLoading}
				isFetching={isFetching}
				data={data}
				isError={isError}
			>
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Sell</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.posStatistics?.allTime?.totalSalesRevenue}
							</div>
							<p className="text-xs text-muted-foreground">
								Total sales amount
							</p>
						</CardContent>
					</Card>

					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Paid</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.posStatistics?.allTime?.totalPaid}
							</div>
							<p className="text-xs text-muted-foreground">Total paid amount</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Due</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.posStatistics?.allTime?.totalDue}
							</div>
							<p className="text-xs text-muted-foreground">Total Due amount</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Quantity
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold inline-flex gap-1 items-center">
								<DynamicIcon icon="PackageSearch" className="h-6 w-6" />
								{/* {data?.data?.posStatistics?.allTime?.totalQuantity} */}
							</div>
							<p className="text-xs text-muted-foreground">
								Total Revenue amount
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Purchase
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.purchaseStatistics?.allTime?.totalPurchaseRevenue}
							</div>
							<p className="text-xs text-muted-foreground">
								Total Purchase amount
							</p>
						</CardContent>
					</Card>

					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Purchase Paid
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.purchaseStatisticsHistory?.allTime?.totalPaid}
							</div>
							<p className="text-xs text-muted-foreground">
								Total Purchase paid amount
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Purchase Due
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.purchaseStatistics?.allTime?.totalDue}
							</div>
							<p className="text-xs text-muted-foreground">
								Total Purchase due amount
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Purchase Shipping Cost
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">
								<TkSign />
								{data?.data?.purchaseStatistics?.allTime?.totalShippingCost}
							</div>
							<p className="text-xs text-muted-foreground">
								Total Purchase shipping amount
							</p>
						</CardContent>
					</Card>
				</div>
			</PageDetailsApiHOC>

			<PageDetailsApiHOC
				error={error}
				isLoading={isLoading}
				isFetching={isFetching}
				data={data}
				isError={isError}
			>
				<div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
							<Card x-chunk="dashboard-05-chunk-0">
								<CardHeader className="pb-3">
									<CardTitle>New POS Sell</CardTitle>
									<CardDescription className="leading-relaxed">
										Create new POS sell to start selling
									</CardDescription>
								</CardHeader>
								<CardFooter>
									<Link href="/sales/pos">
										<Button>Go To POS</Button>
									</Link>
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Sell</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{data?.data?.posStatistics?.today?.totalSalesRevenue}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today sell amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Paid</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{data?.data?.posStatistics?.today?.totalPaid}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today sell paid amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Due</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{data?.data?.posStatistics?.today?.totalDue}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today sell due amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
						</div>
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
							<Card x-chunk="dashboard-05-chunk-0">
								<CardHeader className="pb-3">
									<CardTitle>New Purchase</CardTitle>
									<CardDescription className="leading-relaxed">
										Add New Purchase to update your stock
									</CardDescription>
								</CardHeader>
								<CardFooter>
									{/* <Link href="/sell/pos">
										<Button>Go To Purchase</Button>
									</Link> */}
									<PurchaseStoreModalNew />
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Total Purchase</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{
											data?.data?.purchaseStatistics?.today
												?.totalPurchaseRevenue
										}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today Purchase amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Paid Purchase</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{data?.data?.purchaseStatisticsHistory?.today?.totalPaid}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today Purchase paid amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Today Due Purchase</CardDescription>
									<CardTitle className="text-xl">
										<TkSign />
										{data?.data?.purchaseStatistics?.today?.totalDue}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Today Purchase due amount
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
						</div>

						<Tabs defaultValue="week" className="hidden">
							<div className="flex items-center">
								<TabsList>
									<TabsTrigger value="week">Week</TabsTrigger>
									<TabsTrigger value="month">Month</TabsTrigger>
									<TabsTrigger value="year">Year</TabsTrigger>
								</TabsList>
								<div className="ml-auto flex items-center gap-2">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="h-7 gap-1 text-sm"
											>
												<ListFilter className="h-3.5 w-3.5" />
												<span className="sr-only sm:not-sr-only">Filter</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Filter by</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuCheckboxItem checked>
												Fulfilled
											</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>
												Declined
											</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>
												Refunded
											</DropdownMenuCheckboxItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<Button
										size="sm"
										variant="outline"
										className="h-7 gap-1 text-sm"
									>
										<File className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only">Export</span>
									</Button>
								</div>
							</div>
							<TabsContent value="week">
								<Card x-chunk="dashboard-05-chunk-3">
									<CardHeader className="px-7">
										<CardTitle>Orders</CardTitle>
										<CardDescription>
											Recent orders from your store.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Customer</TableHead>
													<TableHead className="hidden sm:table-cell">
														Type
													</TableHead>
													<TableHead className="hidden sm:table-cell">
														Status
													</TableHead>
													<TableHead className="hidden md:table-cell">
														Date
													</TableHead>
													<TableHead className="text-right">Amount</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow className="bg-accent">
													<TableCell>
														<div className="font-medium">Liam Johnson</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															liam@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Sale
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="secondary">
															Fulfilled
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-23
													</TableCell>
													<TableCell className="text-right">$250.00</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<div className="font-medium">Olivia Smith</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															olivia@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Refund
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="outline">
															Declined
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-24
													</TableCell>
													<TableCell className="text-right">$150.00</TableCell>
												</TableRow>
												{/* <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
												<TableRow>
													<TableCell>
														<div className="font-medium">Noah Williams</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															noah@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Subscription
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="secondary">
															Fulfilled
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-25
													</TableCell>
													<TableCell className="text-right">$350.00</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<div className="font-medium">Emma Brown</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															emma@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Sale
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="secondary">
															Fulfilled
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-26
													</TableCell>
													<TableCell className="text-right">$450.00</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<div className="font-medium">Liam Johnson</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															liam@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Sale
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="secondary">
															Fulfilled
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-23
													</TableCell>
													<TableCell className="text-right">$250.00</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<div className="font-medium">Olivia Smith</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															olivia@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Refund
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="outline">
															Declined
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-24
													</TableCell>
													<TableCell className="text-right">$150.00</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														<div className="font-medium">Emma Brown</div>
														<div className="hidden text-sm text-muted-foreground md:inline">
															emma@example.com
														</div>
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														Sale
													</TableCell>
													<TableCell className="hidden sm:table-cell">
														<Badge className="text-xs" variant="secondary">
															Fulfilled
														</Badge>
													</TableCell>
													<TableCell className="hidden md:table-cell">
														2023-06-26
													</TableCell>
													<TableCell className="text-right">$450.00</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
					<div className="space-y-4">
						<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
							<CardHeader className="flex flex-row items-start bg-muted/50">
								<div className="grid gap-0.5">
									<CardTitle className="group flex items-center gap-2 text-lg">
										Total Revenue
									</CardTitle>
									<CardDescription>
										Date: {dateFormat1(new Date().toString())}
									</CardDescription>
								</div>
								<div className="ml-auto flex items-center gap-1">
									<Button size="sm" variant="outline" className="h-8 gap-1">
										<Truck className="h-3.5 w-3.5" />
										<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
											Total
										</span>
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-6 text-sm">
								<div className="grid gap-3">
									<div className="font-semibold">Total Sell Calculation</div>
									<ul className="grid gap-3">
										<li className="flex items-center justify-between">
											<span className="text-muted-foreground">
												Total sell amount
											</span>
											<span className="inline-flex gap-1">
												{data?.data?.posStatistics?.allTime?.totalPaid}

												<TkSign />
											</span>
										</li>
										<li className="flex items-center justify-between">
											<span className="text-muted-foreground">
												Total Product Price
											</span>
											<span className="inline-flex gap-1">
												-{' '}
												{
													data?.data?.posStatistics?.allTime
														?.total_product_price
												}
												<TkSign />
											</span>
										</li>
									</ul>
								</div>
							</CardContent>
							<CardFooter className="border-t bg-muted/50 px-6 py-3">
								<ul className="flex-1 ">
									<li className="flex items-center justify-between font-semibold">
										<span className="text-muted-foreground">Revenue</span>
										<span>
											{totalPaidDifference} <TkSign />
										</span>
									</li>
								</ul>
							</CardFooter>
						</Card>
					</div>
				</div>
			</PageDetailsApiHOC>
		</>
	);
}
