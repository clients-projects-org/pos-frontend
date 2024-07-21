import { isEmptyArray } from '@/lib/actions';
import { BarLoader, LineLoader } from '../custom/loader';
import { ApiError } from '../custom/notifications';
import { NoItemFound } from '../custom/not-found';
import React from 'react';

export function ApiUseHOC({
	isLoading,
	isFetching,
	isError,
	data,
	children,
}: {
	isLoading: boolean;
	isFetching: boolean;
	data: any;
	children: React.ReactNode;
}) {
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
			{!isLoading && isEmptyArray(data?.data) && <NoItemFound />}
		</>
	);
}
