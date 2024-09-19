import { ImageType, StatusType, UserType } from '@/lib/type';

// category type
export type SupplierType = {
	sr: number;
	_id: number;
	name: string;
	email: string;
	phone: string;
	status: StatusType;
	description: string;
	address: string;
	image: string;
	image_type: ImageType;
	created_by: UserType;
};
