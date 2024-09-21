import React, { useState } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { FormLabel } from '@/components/ui/form';

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
