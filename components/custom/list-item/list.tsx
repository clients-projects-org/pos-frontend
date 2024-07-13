import { Checkbox } from '@/components/ui/checkbox';
import { DevRouteType } from '@/lib/type';

export const ListItem = ({ data }: { data: DevRouteType }) => {
	return (
		<div className="w-full px-4 py-2 font-medium text-left rtl:text-right   border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
			<div className="flex items-center space-x-2">
				<Checkbox id={data.slug} />
				<label
					htmlFor={data.slug}
					className="text-sm font-medium leading-none cursor-pointer w-full"
				>
					{data.name}
				</label>
			</div>
		</div>
	);
};
