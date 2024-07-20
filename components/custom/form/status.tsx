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

const SelectStatus = ({
	onChange,
	placeholder,
	items,
	defaultValue,
}: {
	defaultValue: string;
	placeholder: string;
	onChange: (value: string) => void;
	items: 'actDeDraft';
}) => {
	const [value, setValue] = React.useState(defaultValue);
	console.log(value);
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const options = {
		actDeDraft: [
			{ value: 'active', label: 'Active' },
			{ value: 'deactivated', label: 'Deactivated' },
			{ value: 'draft', label: 'Draft' },
		],
	};

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
					{options[items].map((item) => (
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
