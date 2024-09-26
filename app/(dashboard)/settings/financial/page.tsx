import Link from 'next/link';
import React from 'react';

export default function page() {
	return (
		<div>
			<h2 className="mb-4 text-lg">Payment Method Setting</h2>
			<Link
				className="underline text-sm"
				href="/settings/financial/payment-method"
			>
				Set Payment Method
			</Link>
		</div>
	);
}
