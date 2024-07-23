'use client';
import React from 'react';
import { DynamicIcon } from '../actions';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function PageTitle({
	title,
	children,
}: {
	title: string;
	children?: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/';

	return (
		<div className="flex justify-between gap-1 items-center">
			<div>
				{/* if is home page note showing  */}
				{!isHomePage && (
					<button
						onClick={() => router.back()}
						className="flex items-center gap-1 border py-1 px-2 rounded-md text-sm mb-2"
					>
						<DynamicIcon icon="ChevronLeft" className="h-4 w-4" />
						<span>Back</span>
					</button>
				)}
				<h1 className="text-lg font-semibold md:text-2xl capitalize">
					{title}
				</h1>
			</div>
			<div>{children}</div>
		</div>
	);
}

export function PageTitleNoBack({
	title,
	children,
}: {
	title: string;
	children?: React.ReactNode;
}) {
	return (
		<div className="flex justify-between gap-1 items-center">
			<div>
				<h1 className="text-lg font-semibold md:text-2xl capitalize">
					{title}
				</h1>
			</div>
			<div>{children}</div>
		</div>
	);
}

export function PageLink({
	href,
	text,
	icon,
}: {
	href: string;
	text: string;
	icon: string;
}) {
	return (
		<Link
			href={href}
			className="gap-1 flex items-center border px-3 py-2 hover:bg-slate-800 rounded"
		>
			<DynamicIcon icon={icon} className="h-4 w-4 ml-0" />
			<span className="sr-only sm:not-sr-only !whitespace-nowrap text-xs ">
				{text}
			</span>
		</Link>
	);
}
