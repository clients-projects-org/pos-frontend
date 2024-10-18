'use client';
import { DynamicIcon } from '@/components/actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const menuItems = [
	{
		name: 'Purchase',
		href: '/finance-&-account/expense-category/purchase',
		icon: 'BarChart2',
	},
	{
		name: 'Expense Sub Category',
		href: '/finance-&-account/expense-sub-category',
		icon: 'BarChart2',
	},
];
export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	return (
		<>
			<nav className="flex  items-start px-2 text-sm font-medium lg:px-4 ">
				{menuItems.map((item) => (
					<Link
						href={item.href}
						className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
							item.href === pathname
								? 'bg-muted text-primary'
								: 'text-muted-foreground'
						}`}
					>
						<DynamicIcon icon={item.icon} className="h-4 w-4" />
						{item.name}
					</Link>
				))}
			</nav>
			{children}
		</>
	);
}
