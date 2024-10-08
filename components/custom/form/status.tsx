'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import React, { useEffect } from 'react';

const StatusOptions = {
	actDeDraft: [
		{ value: 'active', label: 'Active' },
		{ value: 'deactivated', label: 'Deactivated' },
		{ value: 'draft', label: 'Draft' },
	],
	flatPercent: [
		{ value: 'none', label: 'None' },
		{ value: 'fixed', label: 'Fixed' },
		{ value: 'percentage', label: 'Percentage' },
	],
	periods: [
		{ value: 'day', label: 'Day' },
		{ value: 'week', label: 'Week' },
		{ value: 'month', label: 'Month' },
		{ value: 'year', label: 'Year' },
	],
	singleVariant: [
		{ value: 'single', label: 'Single' },
		{ value: 'variant', label: 'Variant' },
	],
	saleRateType: [
		{ value: 'individual', label: 'Individual' },
		{ value: 'global', label: 'Global' },
	],
	orderReceived: [
		{ value: 'ordered', label: 'Order' },
		{ value: 'received', label: 'Received' },
	],
};

const SelectStatus = ({
	onChange,
	placeholder,
	items,
	defaultValue,
}: {
	defaultValue: string;
	placeholder: string;
	onChange: (value: string) => void;
	items: string;
}) => {
	const [value, setValue] = React.useState(defaultValue);
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const handleChange = (value: string) => {
		setValue(value);
		onChange(value);
	};

	return (
		<Select value={value} onValueChange={handleChange}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{StatusOptions[items].map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export { SelectStatus };
