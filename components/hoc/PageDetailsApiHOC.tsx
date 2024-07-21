import { BarLoader, LineLoader } from '../custom/loader';
import { ApiError } from '../custom/notifications';

export function PageDetailsApiHOC({
	isLoading,
	isFetching,
	isError,
	data,
	children,
	error,
}: {
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	data: any;
	children: React.ReactNode;
}) {
	if (isLoading) {
		return (
			<>
				<LineLoader />
				<BarLoader />
			</>
		);
	}

	if (error || isError) {
		return <ApiError data={data} />;
	}

	if (data.success && data.data !== null) {
		return (
			<>
				{isFetching && <BarLoader />}
				{children}
			</>
		);
	}
	return null;
}
