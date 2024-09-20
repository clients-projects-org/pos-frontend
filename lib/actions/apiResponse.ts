import { showToast } from './tost';

export const apiReqResponse = async(response: any) => {
	if (response.statusCode === 200 && response.success) {
		showToast({ title: 'Success', description: response.message });
	}
};
