import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
export const DropDownThreeDot = ({
	children,
	isLoading,
	icon = 'MoreVertical',
}: {
	children: React.ReactNode;
	isLoading?: boolean;
	icon?: 'MoreVertical' | 'MoreHorizontal';
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="outline" className="h-8 w-8">
					{!isLoading && <DynamicIcon icon={icon} className="h-3.5 w-3.5" />}
					{isLoading && (
						<DynamicIcon
							icon="LoaderCircle"
							className="h-3.5 w-3.5 rounded-full  animate-spin"
						/>
					)}

					<span className="sr-only">More</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">{children}</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const DropDownDotItem = ({
	icon,
	name,
	onChange,
	disabled,
}: {
	icon: string;
	name: React.ReactNode;
	onChange: () => void;
	disabled?: boolean;
}) => {
	return (
		<DropdownMenuItem onClick={onChange} disabled={disabled}>
			<DynamicIcon icon={icon} className="h-4 w-4 mr-2" />
			{name}
		</DropdownMenuItem>
	);
};

export const DropDownSelect = ({
	icon,
	label,
	children,
	menuLabel,
}: {
	icon: string;
	menuLabel: string;
	label: string;
	children: React.ReactNode;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full justify-start">
					<DynamicIcon icon={icon} className="h-4 w-4 sm:mr-2" />
					<span className="sr-only sm:not-sr-only capitalize">{label}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
