import { Button } from '@/components/ui/button';

export const TabList = ({ children }: { children: React.ReactNode }) => {
	return (
		<ul className="border p-2 flex items-center gap-3 w-fit rounded flex-wrap">
			{children}
		</ul>
	);
};

export const TabListItem = ({
	name,
	onClick,
	active,
}: {
	name: string;
	onClick: () => void;
	active?: boolean;
}) => {
	return (
		<li>
			<Button
				onClick={onClick}
				variant="outline"
				size="sm"
				className={`h-8 gap-1 relative ${active ? 'dark:bg-slate-600 bg-slate-300' : ''}`}
			>
				<span>{name}</span>
				<span className="text-xs font-medium bg-slate-500 text-white px-1 rounded-full absolute -top-2 -right-2 inline-flex w-5 h-5 items-center justify-center">
					10
				</span>
			</Button>
		</li>
	);
};
