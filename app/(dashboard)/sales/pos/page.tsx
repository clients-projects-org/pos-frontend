'use client';
import { SelectSearch } from '@/components/custom/form';
import { ApiUseHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { Input } from '@/components/ui/input';
import { CalculatorDropdown, FullscreenButton } from '@/lib/actions';
import { useGetStoreProductQuery } from '@/lib/features/create-product';
import {
	PosNav,
	PosProductCard_1,
	SellItems,
	useGetPOSQuery,
} from '@/lib/features/pos-sell';
import { Search } from 'lucide-react';

export default function Page() {
	const { data, isLoading, isFetching, isError } = useGetPOSQuery('');

	// get all utility
	const {
		data: utilityData,
		isLoading: utilityLoading,
		isFetching: utilityFetching,
		isError: utilityError,
	} = useGetStoreProductQuery();

	return (
		<ApiUseHOC
			data={data}
			isFetching={isFetching}
			isLoading={isLoading}
			isError={isError}
		>
			<Motion className="h-full">
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
										frameworks={utilityData?.data?.brand}
										onChange={() => {}}
										value={''}
									/>
									<SelectSearch
										placeholder="Category"
										frameworks={utilityData?.data?.category}
										onChange={() => {}}
										value={''}
									/>
									<SelectSearch
										placeholder="Sub Category"
										frameworks={utilityData?.data?.subCategory}
										onChange={() => {}}
										value={''}
									/>
									<Input placeholder="Scan Barcode" />
								</div>
								<div className="h-[80vh] overflow-y-auto">
									<div className="grid grid-cols-4 gap-4 ">
										{data.data?.map((product) => (
											<PosProductCard_1 key={product._id} product={product} />
										))}
									</div>
								</div>
							</div>

							{/* sell side  */}
							<div className="col-span-4 shadow h-full p-4 space-y-4">
								<SellItems />
							</div>
						</div>
					</div>
				)}
			</Motion>
		</ApiUseHOC>
	);
}
