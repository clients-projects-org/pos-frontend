export type ReturnType<T> = {
	statusCode: number;
	success: boolean;
	message: string;
	data: T;
};
