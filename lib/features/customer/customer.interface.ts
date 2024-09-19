import { StatusType, UserType } from '@/lib/type';

// category type
export type CustomerType = {
	sr: number;
	name: string;
	email: string;
	phone: string;
	status: StatusType;
	description: string;
	address: string;
	image: string;
	image_type: 'image' | 'icon';
	created_by: number;
	createdBy: UserType;
};
