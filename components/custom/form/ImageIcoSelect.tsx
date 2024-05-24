'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useController } from 'react-hook-form';

import { cn } from '@/lib/utils';
import * as Ic from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { DynamicIcon } from '@/components/actions';
import { LucideIcons } from '@/lib/icons';

export function ImageIcoRadio() {
	const { field } = useController({ name: 'image.image_type' });

	return (
		<RadioGroup
			defaultValue="image"
			value={field.value}
			onChange={field.onChange}
			className="flex items-center gap-4"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem checked value="image" id="r1" />
				<Label htmlFor="r1">Image</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="icon" id="r2" />
				<Label htmlFor="r2">Icon</Label>
			</div>
		</RadioGroup>
	);
}

export function ImageSelect() {
	return (
		<div className="flex items-center gap-2">
			<button type="button" className="h-10">
				<Image
					alt="Product image"
					className="aspect-square rounded-md object-cover h-10 w-10"
					height="20"
					src="https://ui.shadcn.com/placeholder.svg"
					width="20"
				/>
			</button>

			<button
				type="button"
				className="flex aspect-square h-10 w-10 items-center justify-center rounded-md border border-dashed "
			>
				<DynamicIcon icon="Upload" className="h-4 w-4 text-muted-foreground" />
				<span className="sr-only">Upload</span>
			</button>
		</div>
	);
}

export function IconSelect() {
	const [value, setValue] = React.useState('');

	return (
		<Command className="border">
			<CommandInput placeholder="Search Icon..." />
			<CommandList>
				<CommandEmpty>No Icon found.</CommandEmpty>
				<CommandGroup className="IconsViewGrid">
					{LucideIcons.map((framework) => (
						<CommandItem
							key={framework}
							value={framework}
							onSelect={(currentValue) => {
								setValue(currentValue === value ? '' : currentValue);
							}}
							className="cursor-pointer"
						>
							<DynamicIcon
								icon={framework}
								className={`w-full ${
									value === framework ? 'text-red-600' : 'text-white'
								}`}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
