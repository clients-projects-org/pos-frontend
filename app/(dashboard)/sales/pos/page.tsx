'use client';
import { DynamicIcon } from '@/components/actions';
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
import { useState } from 'react';

export default function Page() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedBrand, setSelectedBrand] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState('');

	const { data, isLoading, isFetching, isError } = useGetPOSQuery({
		search: searchTerm,
		brand: selectedBrand,
		category: selectedCategory,
		subCategory: selectedSubCategory,
	});

	// get all utility
	const {
		data: utilityData,
		isLoading: utilityLoading,
		isFetching: utilityFetching,
		isError: utilityError,
	} = useGetStoreProductQuery(undefined);

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
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											type="search"
											placeholder="Search products..."
											className="w-full appearance-none bg-background pl-8 shadow-none "
										/>
									</div>
									<SelectSearch
										placeholder="Brand"
										frameworks={utilityData?.data?.brand}
										onChange={(e) => setSelectedBrand(e)}
										value={selectedBrand}
									/>
									<SelectSearch
										placeholder="Category"
										frameworks={utilityData?.data?.category}
										onChange={(e) => {
											setSelectedCategory(e);
											setSelectedSubCategory('');
										}}
										value={selectedCategory}
									/>
									<SelectSearch
										placeholder="Sub Category"
										frameworks={utilityData?.data?.subCategory?.filter(
											(e: any) => e?.category_id === selectedCategory
										)}
										onChange={(e) => setSelectedSubCategory(e)}
										value={selectedSubCategory}
									/>
									<Input placeholder="Scan Barcode" />
								</div>
								<div className="h-[80vh] overflow-y-auto">
									{data.data?.length === 0 && (
										<div className="flex justify-center items-center h-full">
											<div className="border max-w-md w-full py-3 lg:py-8">
												<div className="text-center flex flex-col items-center gap-2">
													<DynamicIcon icon="Inbox" className="h-6 w-6" />
													<p className="text-gray-500 dark:text-gray-400 text-center">
														No product found
													</p>
												</div>
											</div>
										</div>
									)}
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
