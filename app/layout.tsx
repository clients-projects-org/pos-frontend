import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { StoreProvider } from '../components/provider/StoreProvider';
// import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<StoreProvider>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body
					className={cn(
						'bg-background font-sans antialiased',
						fontSans.variable
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						{/* <Toaster /> */}
					</ThemeProvider>
				</body>
			</html>
		</StoreProvider>
	);
}
