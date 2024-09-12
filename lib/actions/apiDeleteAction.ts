import { env } from '../env';
import { apiReqResponse } from './apiResponse';
import { confirm } from './confirm';
import { showToast } from './tost';

export const handleDelete = async (id: string, deleting: any) => {
	try {
		const confirmed = await confirm({
			message:
				'This action cannot be undone. This will permanently delete permission and remove it from servers.',
			title: 'Delete Permission',
		});

		if (confirmed) {
			const response = await deleting({ id }).unwrap();
			apiReqResponse(response);
		}
	} catch (error) {
		showToast({
			title: 'Error',
			description: 'An error occurred, please try later',
		});
		env.env === 'development' && console.error(error);
	}
};
