import { differenceInDays } from 'date-fns';

export const dateLeft = (expire_date: string) => {
	if (!expire_date) {
		return null;
	}
	const expireDate = new Date(expire_date);
	const currentDate = new Date();

	const daysLeft = differenceInDays(expireDate, currentDate);

	return daysLeft + 1;
};
