'use client';
import { PageDetailsApiHOC } from '@/components/hoc';
import { useGetUserByIdQuery } from './UserApiSlice';
import { DynamicIcon } from '@/components/actions';

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
			<div className=" h-full w-full flex items-center justify-center dark:bg-gray-900">
				{/* <!-- Author card --> */}
				<div className="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
					<span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-l-2 border-dashed ">
						{data?.data?.role_id && data?.data?.role.name}
					</span>
					<span className="absolute text-xs font-medium top-0 right-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
						{data?.data?.status}
					</span>

					<div className="w-full flex justify-center sm:justify-start sm:w-auto">
						{data?.data?.image_type === 'icon' && (
							<DynamicIcon icon={data?.data?.image} />
						)}
						{data?.data?.image_type === 'image' && (
							<img
								className="object-cover w-20 h-20 mt-3 mr-3 rounded-full"
								src={data?.data?.image}
							/>
						)}
					</div>

					<div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
						<p
							className="font-display mb-2 text-2xl font-semibold dark:text-gray-200"
							itemProp="author"
						>
							{data?.data?.name}
						</p>

						<div className="mb-4 md:text-lg text-gray-400">
							<p>{data?.data?.description}</p>
						</div>

						<div className="flex gap-2 flex-col">
							<p>
								<span className="font-semibold">Email: </span>
								{data?.data?.email}
							</p>
							<p>
								<span className="font-semibold">Phone: </span>
								{data?.data?.phone || 'N/A'}
							</p>
						</div>
					</div>
				</div>
			</div>
		</PageDetailsApiHOC>
	);
}
