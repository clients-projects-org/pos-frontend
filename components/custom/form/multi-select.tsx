import React, { useState } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export const MultiSelector = ({
	creatable,
	label,
	OPTIONS,
}: {
	creatable?: boolean;
	label: string;
	OPTIONS?: Option[];
}) => {
	return (
		<div className="w-full space-y-2">
			<FormLabel>{label}</FormLabel>
			<MultipleSelector
				defaultOptions={OPTIONS}
				placeholder="type..."
				creatable={creatable}
				emptyIndicator={
					<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
						no results found.
					</p>
				}
			/>
		</div>
	);
};
type RFITagProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	creatable?: boolean;
	label: string;
	OPTIONS?: Option[];
	name: Path<T>;
};

export function MultiSelector2<T extends FieldValues>({
	methods,
	label,
	OPTIONS,
	creatable,
	name,
}: RFITagProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<MultipleSelector
								defaultOptions={OPTIONS}
								onChange={(value: any) => {
									field.onChange(value.map((item: any) => item.value));
								}}
								placeholder="type..."
								creatable={creatable}
								emptyIndicator={
									<p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
										no results found.
									</p>
								}
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
