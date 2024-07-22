'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetUserByIdQuery } from './UserApiSlice';

export function UserDetails({ slug }: { slug: string }) {
	const { data, isLoading, error, isFetching, isError } =
		useGetUserByIdQuery(slug);
	/*
		_id: '669ccc2c02124331572a6734',
		name: 'asdasd',
		email: 'asdasdasd@gmail.com',
		phone: 'asdasd',
		description: 'asdasd',
		role_id: '669bf2aa832d239fdad326ab',
		password: '$2b$12$KOABJeLh/N9vOnM7440hceHToofeUzbS6Qyyt8eVhwpsrB.RL40y6',
		slug: 'asdasd',
		status: 'active',
		image: 'Aperture',
		image_type: 'icon',
		created_by: 'admin',
		createdAt: '2024-07-21T08:51:56.755Z',
		updatedAt: '2024-07-22T03:31:37.666Z', 
*/
	return (
		<PageDetailsApiHOC
			data={data}
			isError={isError}
			isLoading={isLoading}
			isFetching={isFetching}
			error={error}
		>
			<h1>{data?.data?.name} </h1>
		</PageDetailsApiHOC>
	);
}
