import { MenuType } from '@/lib/type';

export type apiPrivetResponse = {
	data: {
		sidebar: MenuType[];
		path: string[];
	};
};
