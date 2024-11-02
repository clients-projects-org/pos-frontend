import PageTitle from '@/components/custom/PageTitle';
import Link from 'next/link';
import React from 'react';

export default function GeneralSettings() {
	return (
		<>
			<PageTitle title="General Settings" />
			<ul>
				<li>
					<Link href="/settings/general/user">User Setting</Link>
					<Link href="/settings/general/forms">User Forms</Link>
				</li>
			</ul>
		</>
	);
}
