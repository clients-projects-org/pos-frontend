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
	value,
}: {
	frameworks: { _id: string; name: string }[];
	value: string;
	onChange: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize"
				>
					{value
						? frameworks?.find((framework) => framework._id === value)?.name
						: 'Select Item...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search item..." />
					<CommandList>
						<CommandEmpty className="p-4">No item found.</CommandEmpty>
						<CommandGroup>
							{frameworks?.map((framework) => (
								<CommandItem
									className="capitalize"
									key={framework._id}
									value={framework.name}
									onSelect={() => {
										onChange(framework._id === value ? '' : framework._id);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === framework._id ? 'opacity-100' : 'opacity-0'
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
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
