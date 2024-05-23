'use client';
import Link from 'next/link';
import { Bell, Package2 } from 'lucide-react';

// Mapping object for icons

import { Button } from '@/components/ui/button';

import { MenuItem } from './sidebar-components';
export default function Sidebar() {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex   min-h-screen flex-col gap-2">
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
					<nav className="grid gap-0 items-start px-2 text-sm font-medium lg:px-4 select-none   h-sidebar overflow-y-auto">
						<MenuItem />
					</nav>
				</div>
			</div>
		</div>
	);
}
