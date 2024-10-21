import { DynamicIcon } from '@/components/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from '@/components/ui/popover';
import { ProductType } from '@/lib/type';
import { useGetInventoryProductQuery } from './posApiSlice';

export function PosProductCard_1({ product }: { product: ProductType }) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="cursor-pointer transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:shadow-lg">
					<img
						className="h-28 w-full object-cover object-center"
						src={product.image}
						alt="Product Image"
					/>
					<div className="p-4">
						<h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
							{product.name}
						</h2>
						<p className="mb-2 text-base dark:text-gray-300 text-gray-700">
							{/* {product.brand_id.name} */}
						</p>
						<div className="flex items-center">
							<p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
								{product.sell_price}
							</p>
							{/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
								$25.00
							</p>
							<p className="ml-auto text-base font-medium text-green-500">
								20% off
							</p> */}
						</div>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent sideOffset={-200} className="w-80">
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
	const { data } = useGetInventoryProductQuery(product._id);
	console.log(data, 'clg');

	return (
		<div className="grid gap-4">
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Dimensions</h4>
				<p className="text-sm text-muted-foreground">
					Set the dimensions for the layer.
				</p>
			</div>
			<div className="grid gap-2">
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="width">Width</Label>
					<Input id="width" defaultValue="100%" className="col-span-2 h-8" />
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="maxWidth">Max. width</Label>
					<Input
						id="maxWidth"
						defaultValue="300px"
						className="col-span-2 h-8"
					/>
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="height">Height</Label>
					<Input id="height" defaultValue="25px" className="col-span-2 h-8" />
				</div>
				<div className="grid grid-cols-3 items-center gap-4">
					<Label htmlFor="maxHeight">Max. height</Label>
					<Input
						id="maxHeight"
						defaultValue="none"
						className="col-span-2 h-8"
					/>
				</div>
			</div>
		</div>
	);
};
