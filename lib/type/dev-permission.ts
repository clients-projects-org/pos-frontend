import { StatusType } from './type';

// this is title of permission
export type DevPermissionTitleType = {
	name: string;
	slug: string;
	status: StatusType;
	image: string;

	// only icon is best thats why image not choose
	_id?: string;
	image_type: 'icon';
};

// route
export type DevRouteType = {
	name: string;
	slug: string;
	status: StatusType;
	image: string;

	// only icon is best thats why image not choose
	image_type: 'icon';

	// value is
	_id?: string;
	value: string;
};

// full combine title and route
export type DevPermissionType = {
	routes: DevRouteType[];
	name: string;
	slug: string;
	status: StatusType;
	_id?: string;
};
