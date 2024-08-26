'use client';
import { Nav } from '@/components/custom/Nav';
import Sidebar from '@/components/custom/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import Session from '@/lib/session';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session, status } = Session();
	const router = useRouter();

	useEffect(() => {
		if (!session?.isLoggedIn && status !== 'loading') {
			router.push('/login');
		}
	}, [session, router]);

	if (status === 'loading') {
		return <Skeleton />;
	}

	// Optionally, you can return null or a loading state while the redirect is happening
	if (!session?.isLoggedIn) {
		return null; // Or you can return a loading spinner
	}
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<Nav />
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
