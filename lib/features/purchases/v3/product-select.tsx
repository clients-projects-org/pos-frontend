'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addProduct, setField } from './actions-slice';
import { useGetCreateDataPurchaseQuery } from '../purchaseApiSlice';

export function ProductSelect() {
	const [open, setOpen] = React.useState(false);
	const { data, isLoading } = useGetCreateDataPurchaseQuery(undefined);
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.purchase);

	const checked = state.products?.map((framework) => framework.name);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{checked.length > 0 ? `${checked.join(', ')}` : 'Select Product...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="min-w-full  p-0">
				<Command>
					<CommandInput placeholder="Search Product..." />
					<CommandList>
						<CommandEmpty>No Item found.</CommandEmpty>
						<CommandGroup>
							{data?.data?.product
								?.filter(
									(framework) => framework.supplier_id._id === state.supplier_id
								)
								?.map((framework) => (
									<CommandItem
										key={framework._id}
										value={`${framework.name}`}
										onSelect={(currentValue) => {
											dispatch(addProduct(framework));
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												state.products?.some((p) => p._id === framework._id)
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
										{`${framework.name}`}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
