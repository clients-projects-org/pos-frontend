import { differenceInDays, format } from 'date-fns';

export const dateLeft = (expire_date: string) => {
	if (!expire_date) {
		return null;
	}
	const expireDate = new Date(expire_date);
	const currentDate = new Date();

	const daysLeft = differenceInDays(expireDate, currentDate);

	return daysLeft + 1;
};

// November 23, 2023
export const dateFormat1 = (date: string) => {
	return format(date, 'MMMM d, yyyy');
};
