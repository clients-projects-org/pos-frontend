'use client';
import { DynamicIcon } from '@/components/actions';
import { SelectSearch } from '@/components/custom/form';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalculatorDropdown, FullscreenButton } from '@/lib/actions';
import {
	PosNav,
	PosProductCard_1,
	useGetPOSQuery,
} from '@/lib/features/pos-sell';
import { Search } from 'lucide-react';

export default function Page() {
	const { data, isLoading, isFetching, isError } = useGetPOSQuery('');
	return (
		<ApiUseHOC
			data={data}
			isFetching={isFetching}
			isLoading={isLoading}
			isError={isError}
		>
			<Motion>
				{data?.data && (
					<div className="h-full">
						<div className="border-b pb-2 flex justify-between items-center">
							<PosNav />
							<div>
								<CalculatorDropdown />
								<FullscreenButton />
							</div>
						</div>

						<div className="grid grid-cols-12 h-full">
							{/* product side  */}
							<div className="col-span-8 shadow h-full border-r dark:border-gray-200 p-4 space-y-4">
								<div className="grid grid-cols-5 gap-2  ">
									<div className="relative">
										<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
										<Input
											type="search"
											placeholder="Search products..."
											className="w-full appearance-none bg-background pl-8 shadow-none "
										/>
									</div>
									<SelectSearch
										placeholder="Brand"
										frameworks={[]}
										onChange={() => {}}
										value={''}
									/>
									<SelectSearch
										placeholder="Category"
										frameworks={[]}
										onChange={() => {}}
										value={''}
									/>
									<SelectSearch
										placeholder="Sub Category"
										frameworks={[]}
										onChange={() => {}}
										value={''}
									/>
									<SelectSearch
										placeholder="Supplier"
										frameworks={[]}
										onChange={() => {}}
										value={''}
									/>
								</div>
								<div className="h-[80vh] overflow-y-auto">
									<div className="grid grid-cols-6 gap-4 ">
										{data.data?.map((product) => (
											<PosProductCard_1 key={product._id} product={product} />
										))}
									</div>
								</div>
							</div>

							{/* sell side  */}
							<div className="col-span-4 shadow h-full p-4 space-y-4">
								<div className="grid grid-cols-2 gap-3 ">
									<div className="flex items-center">
										<SelectSearch
											placeholder="Customer"
											frameworks={[]}
											onChange={() => {}}
											value={''}
										/>
										<Button type="button" size="icon" variant="secondary">
											<DynamicIcon icon="Plus" className="h-4 w-4" />
										</Button>
									</div>
									<Input placeholder="Invoice Number" />
								</div>
								<div>
									<Input placeholder="Scan Barcode" />
								</div>

								<div className="h-[74vh] overflow-y-auto">
									<div className="relative overflow-x-auto">
										<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
											<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
												<tr>
													<th scope="col" className="px-6 py-3">
														Product name
													</th>
													<th scope="col" className="px-6 py-3">
														Color
													</th>
													<th scope="col" className="px-6 py-3">
														Category
													</th>
													<th scope="col" className="px-6 py-3">
														Price
													</th>
												</tr>
											</thead>
											<tbody>
												{Array(12)
													.fill(0)
													.map((_, index) => (
														<tr
															key={index}
															className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
														>
															<th
																scope="row"
																className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
															>
																Apple MacBook Pro 17"
															</th>
															<td className="px-6 py-3">Silver</td>
															<td className="px-6 py-3">Laptop</td>
															<td className="px-6 py-3">$2999</td>
														</tr>
													))}
											</tbody>
											<tfoot>
												<tr className="font-semibold text-gray-900 dark:text-white">
													<th scope="row" className="px-6 py-3 text-base">
														Total
													</th>
													<td className="px-6 py-3"> </td>
													<td className="px-6 py-3">3</td>
													<td className="px-6 py-3">21,000</td>
												</tr>
											</tfoot>
										</table>
									</div>

									<div className="flex justify-end mt-3">
										<div className="max-w-xl">
											<table className="text-sm">
												<tbody>
													<tr>
														<td className="px-6 py-2">Sub Total</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>
													<tr>
														<td className="px-6 py-2">Discount Type</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>

													<tr>
														<td className="px-6 py-2">Tax (%)</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>
													<tr>
														<td className="px-6 py-2">Shipping Cost</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>
													<tr>
														<td className="px-6 py-2">Paid</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>
													<tr>
														<td className="px-6 py-4">Due</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>

													<tr className="border-t text-center font-bold">
														<td className="px-6 py-2">Grand Total</td>
														<td className="px-6 py-2">:</td>
														<td className="px-6 py-2">500</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Motion>
		</ApiUseHOC>
	);
}
