'use client';
import { isEmptyArray } from '@/lib/actions';
import { BarLoader, LineLoader } from '../custom/loader';
import { ApiError } from '../custom/notifications';
import { NoItemFound } from '../custom/not-found';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
const gridCol = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-2 lg:grid-cols-4 ',
	5: 'grid-cols-2 lg:grid-cols-5',
	6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
	7: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
	8: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8',
	9: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9',
	10: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10',
	11: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11',
	12: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12',
};
export function ApiUseHOC({
	isLoading,
	isFetching,
	data,
	isError,
	children,
	notFound = false,
	loadingLength = 10,
	loadingBox = 1,
}: {
	isLoading: boolean;
	isFetching: boolean;
	notFound?: boolean;
	data: any;
	isError?: any;
	children: React.ReactNode;
	loadingLength?: number;
	loadingBox?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}) {
	if (isLoading) {
		return (
			<>
				<LineLoader />
				<BarLoader />
				<div className={`grid  gap-4 ${gridCol[loadingBox]}`}>
					{Array.from({ length: loadingLength }, (_, i) => (
						<div key={i}>
							<Skeleton className="h-10 w-full mt-4" />
							<Skeleton className="h-10 w-[90%] mt-4" />
						</div>
					))}
				</div>
			</>
		);
	}
	if (isError) {
		return <ApiError data={data} />;
	}
	return (
		<>
			{/* loader  */}
			{(isLoading || isFetching) && <BarLoader />}

			{/* check api for error roles  */}
			{!isLoading && <ApiError data={data} />}

			{/* page loader */}
			{isLoading && <LineLoader />}

			{/* children */}
			{children}

			{/* not found  */}
			{!isLoading && notFound && isEmptyArray(data?.data) && <NoItemFound />}
		</>
	);
}
