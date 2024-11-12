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
import { setField } from './actions-slice';
import { useGetCreateDataPurchaseQuery } from '../purchaseApiSlice';

export function SupplierSelect() {
	const [open, setOpen] = React.useState(false);
	const { data, isLoading } = useGetCreateDataPurchaseQuery(undefined);
	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.purchase);

	const handleInputChange = (field: any, value: any) => {
		dispatch(setField({ field, value }));
	};

	const checked = data?.data?.supplier?.find(
		(framework) => framework._id === state.supplier_id
	);

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
					{checked
						? `${checked.name} (${checked.business_name})`
						: 'Select Supplier...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="min-w-full  p-0">
				<Command>
					<CommandInput placeholder="Search Supplier..." />
					<CommandList>
						<CommandEmpty>No Item found.</CommandEmpty>
						<CommandGroup>
							{data?.data?.supplier?.map((framework) => (
								<CommandItem
									key={framework._id}
									value={`${framework.name} (${framework.business_name})`}
									onSelect={(currentValue) => {
										handleInputChange(
											'supplier_id',
											state.supplier_id === framework._id ? '' : framework._id
										);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											state.supplier_id === framework._id
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{`${framework.name} (${framework.business_name})`}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
