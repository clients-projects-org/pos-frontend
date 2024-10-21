import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react';
import { removeVariant } from './posSlice';

export function SellItems() {
	const dispatch = useAppDispatch();
	const items = useAppSelector((state) => state.variantPos.variants);

	// not item found
	if (items.length === 0) {
		return (
			<div className="border  flex items-center justify-center py-2">
				<div className="text-center flex flex-col items-center gap-2">
					<DynamicIcon icon="Box" className="h-6 w-6" />
					<p className="text-gray-500 dark:text-gray-400 text-center">
						Please Select Product
					</p>
				</div>
			</div>
		);
	}

	return (
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
						{items?.map((variant, index) => (
							<tr
								key={index}
								className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
							>
								<th
									scope="row"
									className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{variant?.product_name}
								</th>
								<td className="px-6 py-3">{variant.quantity}</td>
								<td className="px-6 py-3">Laptop</td>

								<td className="px-6 py-3 relative">
									<Button
										onClick={() => dispatch(removeVariant(variant._id))}
										variant="destructive"
										size="icon"
										type="button"
										className="p-0 h-6 w-6 absolute right-2 top-2"
									>
										<DynamicIcon icon="Trash" className="h-4 w-4" />
									</Button>
								</td>
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
	);
}
