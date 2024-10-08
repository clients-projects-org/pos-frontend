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
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export function SelectSearch({
	frameworks,
	onChange,
	value, // value will now be an array of selected ids
}: {
	frameworks: { _id: string; name: string }[];
	value: string[]; // Array of selected values
	onChange: (value: string[]) => void; // Update onChange to accept an array
}) {
	const [open, setOpen] = React.useState(false);

	// Check if an item is selected
	const isSelected = (id: string) => value.includes(id);

	// Toggle the selection of an item
	const handleSelect = (id: string) => {
		if (isSelected(id)) {
			// Remove the item from the selected list if already selected
			onChange(value.filter((selectedId) => selectedId !== id));
		} else {
			// Add the item to the selected list if not already selected
			onChange([...value, id]);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize"
				>
					{/* Display selected items, or placeholder if none selected */}
					{value.length > 0
						? value
								.map(
									(id) =>
										frameworks.find((framework) => framework._id === id)?.name
								)
								.join(', ')
						: 'Select Items...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search items..." />
					<CommandList>
						<CommandEmpty className="p-4">No item found.</CommandEmpty>
						<CommandGroup>
							{frameworks?.map((framework) => (
								<CommandItem
									className="capitalize"
									key={framework._id}
									value={framework.name}
									onSelect={() => {
										handleSelect(framework._id); // Toggle selection on click
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											isSelected(framework._id) ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{framework.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

type RFISearchAbleProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	label: string;
	OPTIONS?: any[];
	name: Path<T>;
};

export function SearchAbleProductSelect<T extends FieldValues>({
	methods,
	label,
	OPTIONS,
	name,
}: RFISearchAbleProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormLabel className="block">{label}</FormLabel>
					<FormControl>
						{OPTIONS && (
							<SelectSearch
								frameworks={OPTIONS}
								value={field.value || []} // Ensure the value is an array
								onChange={field.onChange} // Pass the onChange handler
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
