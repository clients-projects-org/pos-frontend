'use client';
import * as React from 'react';
import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from './theme';
import { MenuItem } from './sidebar/sidebar-components';
import Session from '@/lib/session';
import { useAllSettingsQuery } from '@/lib/features/all-settings';
import { usePathname } from 'next/navigation';

export const Nav = () => {
	const { signOut } = Session();
	const { data: allSettings } = useAllSettingsQuery();
	const pathName = usePathname();

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={`shrink-0 ${pathName !== '/sales/pos' && 'md:hidden'}}`}
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="flex flex-col p-2 max-w-[16rem] sm:max-w-xs"
				>
					<nav className="grid gap-2 text-lg font-medium overflow-y-auto select-none">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold "
						>
							<Package2 className="h-6 w-6" />
							<span style={{ lineHeight: 'normal' }}>POS Inventory</span>
						</Link>
						<MenuItem />
					</nav>
				</SheetContent>
			</Sheet>
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
			<ModeToggle />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{allSettings?.data?.user?.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
