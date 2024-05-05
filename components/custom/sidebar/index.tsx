'use client';
import Link from 'next/link';
import {
	Bell,
	Home,
	LineChart,
	Package,
	Package2,
	Settings,
	ShoppingCart,
	Users,
} from 'lucide-react';

// Mapping object for icons
const iconMap: { [key: string]: React.ComponentType } = {
	Home: Home,
	ShoppingCart: ShoppingCart,
	Package: Package,
	Users: Users,
	LineChart: LineChart,
	Bell: Bell,
};
import { Button } from '@/components/ui/button';
import { menu } from '@/lib/dummy-data';

export default function Sidebar() {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<Package2 className="h-6 w-6" />
						<span className="">POS Inventory</span>
					</Link>
					<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
						<Bell className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<div className="flex-1">
					<nav className="grid gap-3 items-start px-2 text-sm font-medium lg:px-4">
						{menu.map((e) => {
							const IconComponent = iconMap[e.icon]; // Get the corresponding icon component
							return (
								<Link
									key={e.id}
									href={e.path} // Use the path from the menu object
									className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									{IconComponent && <IconComponent className="h-4 w-4" />}

									{e.name}
								</Link>
							);
						})}
					</nav>
				</div>
				<div className="mt-auto p-4">
					<Link
						href="#"
						className="hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Settings className="h-4 w-4" />
						Setting
					</Link>
				</div>
			</div>
		</div>
	);
}
