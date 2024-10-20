import { DynamicIcon } from '@/components/actions';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Percent, ShoppingBag, Tag } from 'lucide-react';
import Image from 'next/image';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from '@/components/ui/popover';
import { ProductType } from '@/lib/type';
import { useGetInventoryProductQuery } from './posApiSlice';
import { CardLoader } from '@/components/custom/loader';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addVariant, removeVariant } from './posSlice';

export function PosProductCard_1({ product }: { product: ProductType }) {
	const discountPercentage = !product.discount_type
		? Math.round(((120 - 100) / 120) * 100)
		: 0;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="cursor-pointer transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:shadow-lg">
					<Card className="w-full max-w-sm overflow-hidden">
						<CardHeader className="p-0">
							<div className="relative h-32 w-full">
								<Image
									src={product.image}
									alt={product.name}
									layout="fill"
									objectFit="cover"
									className="transition-all duration-300 hover:scale-105"
								/>
								{discountPercentage > 0 && (
									<Badge className="absolute top-2 right-2 bg-red-500">
										{discountPercentage}% OFF
									</Badge>
								)}
							</div>
						</CardHeader>
						<CardContent className="grid gap-2.5 p-4">
							<h2 className="text-base font-semibold leading-none tracking-tight">
								{product.name}
							</h2>
							<p className="text-sm text-muted-foreground">
								{product?.brand?.name}
							</p>
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="text-xs">
									{product?.category?.name}
								</Badge>
								<Badge variant="outline" className="text-xs">
									{product?.sub_category?.name}
								</Badge>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<Package className="h-4 w-4" />
								<span>
									Quantity: {product?.inventory?.quantity} {product?.unit?.name}
								</span>
							</div>

							<div className="mt-2 flex items-center gap-2">
								<ShoppingBag className="h-5 w-5 text-green-600" />
								<div className="flex items-baseline gap-2">
									{product.discount_type === 'fixed' ? (
										<>
											<span className="text-2xl font-bold text-green-600">
												${product.sell_price.toFixed(2)}
											</span>
											<span className="text-lg text-muted-foreground line-through">
												${product.sell_price.toFixed(2)}
											</span>
										</>
									) : (
										<span className="text-2xl font-bold text-green-600">
											${product.sell_price.toFixed(2)}
										</span>
									)}
								</div>
							</div>

							{product.discount_type && (
								<div className="flex items-center gap-2 text-sm text-green-600">
									<Percent className="h-4 w-4" />
									<span>
										You save: $
										{(product.sell_price - product.sell_price).toFixed(2)} (
										{discountPercentage}%)
									</span>
								</div>
							)}
						</CardContent>

						{/* footer is hidden  */}
						<CardFooter className="p-4 pt-0 hidden">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Tag className="h-4 w-4" />
								<span>SKU:{product.slug}</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</PopoverTrigger>
			<PopoverContent sideOffset={-200} className="w-[500px]  h-full  ">
				{/* Close button */}
				<PopoverClose className="absolute top-2 right-2">
					<DynamicIcon icon="X" className="h-6 w-6 text-red-500" />
				</PopoverClose>
				<ProductDetails product={product} />
			</PopoverContent>
		</Popover>
	);
}

const ProductDetails = ({ product }: { product: ProductType }) => {
	const { data, isLoading } = useGetInventoryProductQuery(product._id);
	const dispatch = useAppDispatch();

	const items = useAppSelector((state) => state.variantPos.variants);

	if (isLoading) {
		return <CardLoader line={5} />;
	}

	return (
		<div className="grid gap-4 select-none">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">{product.name}</h4>
				<p className="text-sm text-muted-foreground">{product.brand.name}</p>
			</div>
			<div className=" ">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Variant
							</th>
							<th scope="col" className="px-6 py-3">
								Stock
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.data?.variant_details?.map((item: any) => (
							<tr
								key={item._id}
								onClick={() =>
									dispatch(
										addVariant({
											...item,
											product_name: product.name,
											product_id: product._id,
										})
									)
								}
								className={` border-b  dark:border-gray-700  ${
									items.some((i) => i._id === item._id)
										? 'bg-white dark:bg-gray-900'
										: 'bg-white dark:bg-gray-950'
								}`}
							>
								<th
									scope="row"
									className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{item?.variant_id?.name}
								</th>
								<td className="px-6 py-3">
									{item.quantity -
										(items.find((i) => i._id === item._id)?.quantity ?? 0)}
								</td>
								<td className="px-6 py-3 relative">
									{items.some((i) => i._id === item._id) && (
										<Button
											onClick={(end) => {
												end.stopPropagation();
												dispatch(removeVariant(item._id));
											}}
											variant="destructive"
											size="icon"
											type="button"
											className="p-0 h-6 w-6 absolute right-2 top-2"
										>
											<DynamicIcon icon="Trash" className="h-4 w-4" />
										</Button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
