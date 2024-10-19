'use client';
import { Nav } from '@/components/custom/Nav';
import Sidebar from '@/components/custom/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSidebarPrivetQuery } from '@/lib/features/sidebar/apiSlice';
import Session from '@/lib/session';
import { useRouter, usePathname, notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session, status, signOut } = Session();
	const router = useRouter();
	const pathname = usePathname(); // Get the current path
	const { data, isLoading, isError, error } = useGetSidebarPrivetQuery();

	if (error?.data?.message === 'Unauthorized') {
		signOut({ redirect: true, callbackUrl: '/login' });
		return notFound();
	}
	useEffect(() => {
		if (!session?.isLoggedIn && status !== 'loading') {
			router.push('/login');
		}
	}, [session, status, router]);

	// Check for session and loading states
	if (status === 'loading' || isLoading) {
		return <Skeleton />;
	}

	if (isError) {
		return <div>...</div>;
	}

	// Check if the current path (pathname) is in the allowed paths in data
	// const hasAccessToCurrentPath = data?.data.path?.includes(pathname);

	// If the user is not logged in or does not have access to the current path, return null
	// if (!session?.isLoggedIn || !hasAccessToCurrentPath) {
	// 	return notFound();
	// }

	return (
		<div
			className={`grid min-h-screen w-full ${pathname !== '/sales/pos' && 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'}`}
		>
			{pathname !== '/sales/pos' && <Sidebar />}

			<div className="flex flex-col flex-1 overflow-hidden">
				<Nav />
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
