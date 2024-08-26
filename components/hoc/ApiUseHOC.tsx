import { isEmptyArray } from '@/lib/actions';
import { BarLoader, LineLoader } from '../custom/loader';
import { ApiError } from '../custom/notifications';
import { NoItemFound } from '../custom/not-found';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

export function ApiUseHOC({
	isLoading,
	isFetching,
	data,
	isError,
	children,
	notFound = false,
}: {
	isLoading: boolean;
	isFetching: boolean;
	notFound?: boolean;
	data: any;
	isError?: any;
	children: React.ReactNode;
}) {
	if (isLoading) {
		return (
			<>
				<LineLoader />
				<BarLoader />
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i}>
						<Skeleton key={i} className="h-10 w-full mt-4" />
						<Skeleton key={i} className="h-10 w-[90%] mt-4" />
					</div>
				))}
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
