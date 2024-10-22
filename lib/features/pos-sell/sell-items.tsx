import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react';
import {
	decrementQuantity,
	incrementQuantity,
	removeVariant,
	updateQuantity,
	Variant,
} from './posSlice';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SellItems() {
	const dispatch = useAppDispatch();
	const items = useAppSelector((state) => state.variantPos.variants);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		variant: Variant
	) => {
		const value = Math.max(1, Number(e.target.value)); // Prevent quantity from being less than 1

		dispatch(updateQuantity({ _id: variant._id, quantity: value }));
	};

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
								Quantity
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Total
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
								<td className="px-0 py-3 flex">
									<Button
										variant="outline"
										size="icon"
										onClick={() => dispatch(decrementQuantity(variant._id))}
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
										size="icon"
										onClick={() => dispatch(incrementQuantity(variant._id))}
										aria-label="Increase quantity"
									>
										<Plus className="h-4 w-4" />
									</Button>
								</td>
								<td className="px-6 py-3">{variant.select_quantity}</td>

								<td className="px-0 py-3 relative flex">
									<Button
										onClick={() => dispatch(removeVariant(variant._id))}
										variant="link"
										size="icon"
										type="button"
										className="p-0 h-6 w-6 absolute right-0 top-0 text-red-500"
									>
										<DynamicIcon icon="CircleX" className="h-4 w-4" />
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