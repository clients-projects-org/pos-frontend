import { ImageType, StatusType, UserType } from '@/lib/type';

// category type
export type CustomerType = {
	sr: number;
	name: string;
	email: string;
	phone: string;
	status: StatusType;
	description: string;
	password?: string;
	isPasswordChanged: boolean;
	address: string;
	image: string;
	image_type: ImageType;
	point: number;
	balance: number;
	created_by: UserType;
	verify: string;
	otp: string;
};
