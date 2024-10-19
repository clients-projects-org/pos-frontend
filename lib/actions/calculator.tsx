'use client';

import { evaluate } from 'mathjs';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicIcon } from '@/components/actions';

export function CalculatorDropdown() {
	const [input, setInput] = React.useState<string>(''); // Calculator display input

	// Check if the last character is an operator
	const isLastCharacterOperator = (value: string) => {
		const operators = ['+', '-', '*', '/'];
		return operators.includes(value[value.length - 1]);
	};

	// Handle button clicks for numbers and operations
	const handleButtonClick = (value: string) => {
		// Prevent multiple consecutive operators
		if (
			isLastCharacterOperator(input) &&
			['+', '-', '*', '/'].includes(value)
		) {
			return;
		}
		setInput((prev) => prev + value);
	};

	// Clear the input field
	const handleClear = () => {
		setInput('');
	};

	// Evaluate the expression using JavaScript's eval function
	const handleEvaluate = () => {
		try {
			const result = evaluate(input); // Use mathjs to evaluate the expression
			setInput(Number.isFinite(result) ? result.toFixed(2) : 'Invalid'); // Format to 2 decimal places
		} catch (error) {
			setInput('Invalid');
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<DynamicIcon icon="Calculator" className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 p-4">
				{/* Calculator display */}
				<div className="mb-4 text-xl text-right border border-gray-300 p-2 rounded">
					{input || '0'}
				</div>
				<DropdownMenuSeparator />
				{/* Calculator buttons */}
				<div className="grid grid-cols-4 gap-2">
					{['7', '8', '9', '/'].map((value) => (
						<Button
							key={value}
							variant="outline"
							onClick={() => handleButtonClick(value)}
						>
							{value}
						</Button>
					))}
					{['4', '5', '6', '*'].map((value) => (
						<Button
							key={value}
							variant="outline"
							onClick={() => handleButtonClick(value)}
						>
							{value}
						</Button>
					))}
					{['1', '2', '3', '-'].map((value) => (
						<Button
							key={value}
							variant="outline"
							onClick={() => handleButtonClick(value)}
						>
							{value}
						</Button>
					))}
					<Button variant="outline" onClick={handleClear}>
						C
					</Button>
					<Button variant="outline" onClick={() => handleButtonClick('0')}>
						0
					</Button>
					<Button variant="outline" onClick={handleEvaluate}>
						=
					</Button>
					<Button variant="outline" onClick={() => handleButtonClick('+')}>
						+
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
