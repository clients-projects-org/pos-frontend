import { DynamicIcon } from '@/components/actions';
import { DevRouteType } from '@/lib/type';

export const ListItem = ({ data }: { data: DevRouteType }) => {
	return (
		<div className="w-full px-4 py-2 font-medium text-left rtl:text-right   rounded-md  border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:text-slate-800 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
			<div className="flex items-center space-x-2">
				<DynamicIcon icon={data.image} />
				<p className="text-sm font-medium leading-none cursor-pointer w-full capitalize">
					{data.name}
				</p>
			</div>
		</div>
	);
};
