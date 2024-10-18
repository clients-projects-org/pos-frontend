'use client';
import { BarLoader } from '@/components/custom/loader';
import { useRouter } from 'next/navigation';

export default function page() {
	const router = useRouter();
	router.push('/finance-&-account/expense-category/purchase');
	return (
		<>
			<BarLoader />
		</>
	);
}
