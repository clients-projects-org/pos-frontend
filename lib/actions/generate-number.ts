export const generateNumber = (prefix = 'CH') => {
	const datePart = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD format
	const randomPart = Math.floor(Math.random() * 1000)
		.toString()
		.padStart(3, '0'); // Random 3-digit number
	return `${prefix}${datePart}-${randomPart}`; // Example: CH-20230925-001
};
