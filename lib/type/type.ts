export type IconType = {
	[key: string]: React.ForwardRefExoticComponent<
		React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
	>;
};

export type MenuItemType = {
	id: number;
	name: string;
	path?: string;
	icon?: string;
	children?: MenuItemType[];
};

export type MenuType = {
	id: number;
	title: string;
	hr: boolean;
	children: MenuItemType[];
};
