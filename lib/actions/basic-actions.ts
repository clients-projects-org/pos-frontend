// is array
export const isArray = (value: any): value is any[] => {
	return Array.isArray(value);
};

// is empty array
export const isEmptyArray = (value: any): boolean => {
	return isArray(value) && value.length === 0;
};
