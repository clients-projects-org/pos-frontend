import React, { useState } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { FormLabel } from '@/components/ui/form';

const OPTIONS: Option[] = [
	{ label: 'nextjs', value: 'nextjs' },
	{ label: 'React', value: 'react' },
	{ label: 'Remix', value: 'remix' },
	{ label: 'Vite', value: 'vite' },
	{ label: 'Nuxt', value: 'nuxt' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Ember', value: 'ember', disable: true },
	{ label: 'Gatsby', value: 'gatsby', disable: true },
	{ label: 'Astro', value: 'astro' },
];

export const MultiSelector = ({
	creatable,
	label,
}: {
	creatable?: boolean;
	label: string;
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
