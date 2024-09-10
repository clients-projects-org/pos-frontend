'use client';
import React from 'react';
import { useGetRoleByIdQuery } from './roleApiSlice';
import { PageDetailsApiHOC } from '@/components/hoc';
import { Motion } from '@/components/motion';
import { isEmptyArray } from '@/lib/actions';
import { NoItemFound } from '@/components/custom/not-found';
import { RoleDetailsType } from '@/lib/type';

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
			<div className="mx-auto max-w-5xl w-full border p-4">
				<div>
					<h6 className="text-lg font-semibold">{data?.data?.name}</h6>
				</div>
				<div className="grid grid-cols-3 gap-4 mt-6">
					{data?.data?.permissions?.map((dev: RoleDetailsType) => (
						<Motion key={dev._id}>
							<div className="text-gray-900 px-4 py-2  border rounded-lg    dark:text-white">
								<div className=" pb-1 border-b mb-2 text-base font-medium text-gray-900 dark:text-white flex items-center justify-between">
									<p className="capitalize">{dev.parent}</p>
									{/* <DevNameComponents.Actions data={dev} /> */}
								</div>
								<div className="pb-1 border-b mb-2">
									{dev.children?.map((child) => (
										<div
											key={child.permission_id}
											className="mb-2 text-xs font-semibold text-gray-800 dark:text-gray-400 flex items-center justify-between"
										>
											<p className="capitalize">{child.name}</p>
											{/* <DevPermission.Actions isFor="child" data={route} /> */}
										</div>
									))}
									{isEmptyArray(dev.children) && <NoItemFound />}
								</div>
							</div>
						</Motion>
					))}
				</div>
			</div>
		</PageDetailsApiHOC>
	);
}
