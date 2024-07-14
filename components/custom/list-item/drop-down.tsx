import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export const DropDownThreeDot = ({
	children,
	isLoading,
}: {
	children: React.ReactNode;
	isLoading?: boolean;
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="outline" className="h-8 w-8">
					{!isLoading && (
						<DynamicIcon icon="MoreVertical" className="h-3.5 w-3.5" />
					)}
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
	name: string;
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
