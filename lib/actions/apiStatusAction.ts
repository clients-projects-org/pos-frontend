import { env } from '../env';
import { StatusType } from '../type';
import { apiReqResponse } from './apiResponse';
import { showToast } from './tost';

export const handleStatusChange = async (
	id: string,
	status: StatusType,
	updateStatus: any
) => {
	try {
		const response = await updateStatus({ id, status }).unwrap();
		apiReqResponse(response);
	} catch (error) {
		showToast({
			title: 'Error',
			description: 'An error occurred, please try later',
		});

		env.env === 'development' && console.error(error);
	}
};
