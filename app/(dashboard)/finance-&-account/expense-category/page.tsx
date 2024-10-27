'use client';
import { BarLoader } from '@/components/custom/loader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		router.push('/finance-&-account/expense-category/purchase');
	}, [router]);
	return (
		<>
			<BarLoader />
		</>
	);
}
