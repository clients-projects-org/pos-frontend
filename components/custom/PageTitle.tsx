import React from 'react';

export default function PageTitle({ title }: { title: string }) {
	return (
		<div className="flex items-center">
			<h1 className="text-lg font-semibold md:text-2xl capitalize">{title}</h1>
		</div>
	);
}
