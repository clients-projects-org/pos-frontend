'use client';
import { DynamicIcon } from '@/components/actions';
import { BarLoader, LineLoader } from '@/components/custom/loader';
import { NoItemFound } from '@/components/custom/not-found';
import { ApiError } from '@/components/custom/notifications';
import PageTitle from '@/components/custom/PageTitle';
import { Motion } from '@/components/motion';
import { CardContent } from '@/components/ui/card';
import { isEmptyArray } from '@/lib/actions';
import { useGetUserQuery, UserComponents } from '@/lib/features/user';
import { StatusType, UserType } from '@/lib/type';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function userManagementUser() {
	const { data, isLoading, isFetching, isError } = useGetUserQuery('active');
	const [value, setValue] = useState<StatusType | 'all'>('all');

	return (
		<>
			{/* loader  */}
			{(isLoading || isFetching) && <BarLoader />}

			{/* check api for error roles  */}
			{!isLoading && <ApiError data={data} />}

			{/* is loading  roles */}
			{isLoading && <LineLoader />}
			{/* no item found roles */}

			{/* roles title*/}
			{!isLoading && data?.success && (
				<>
					<PageTitle title="Roles">
						<Link
							href={'/user-management/users/create'}
							className="gap-1 flex items-center"
						>
							<DynamicIcon icon="PlusCircle" className="h-4 w-4 ml-0" />
							<span className="sr-only sm:not-sr-only !whitespace-nowrap">
								Add User
							</span>
						</Link>
					</PageTitle>

					<UserComponents.Filter value={value} setValue={setValue} />

					{!isEmptyArray(data?.data) && (
						<div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
							{data?.data?.map((data: UserType) => (
								<Motion key={data._id}>
									<CardContent className="p-0 ">
										<div className="flex items-center space-x-4 rounded-md border p-4">
											<Link href={`/user-management/users/${data?.slug}`}>
												{data?.image_type === 'icon' ? (
													<DynamicIcon icon={data?.image as string} />
												) : (
													<Image
														alt="User"
														className="aspect-square rounded-md object-cover"
														height="40"
														src={data?.image as string}
														width="40"
													/>
												)}
											</Link>
											<div className="flex-1 space-y-1">
												<Link href={`/user-management/users/${data?.slug}`}>
													<p className="text-sm font-medium leading-none">
														{data?.name}
													</p>
													<p className="text-sm text-muted-foreground">
														by {data?.role}
													</p>
												</Link>
											</div>
											{/* switch */}
											<UserComponents.Actions data={data} />
										</div>
									</CardContent>
								</Motion>
							))}
						</div>
					)}
					{!isLoading && isEmptyArray(data?.data) && <NoItemFound />}
				</>
			)}
		</>
	);
}
