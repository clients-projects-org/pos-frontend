'use client';
import React from 'react';
import { useGetRoleByIdQuery } from './roleApiSlice';
import { PageDetailsApiHOC } from '@/components/hoc';

export default function RoleDetails({ slug }: { slug: string }) {
	const { data, isLoading, isFetching, isError } = useGetRoleByIdQuery(
		slug.split('-')[1]
	);

	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
		>
			<div className="mx-auto max-w-5xl w-full border p-4">adsd</div>
		</PageDetailsApiHOC>
	);
}
