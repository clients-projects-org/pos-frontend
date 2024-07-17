import { BadgeVariantType, StatusType } from '../type';

// badge type
export const badge = (badge: StatusType): BadgeVariantType => {
	switch (badge) {
		case 'active':
			return 'default';

		case 'deactivated':
			return 'secondary';

		case 'draft':
			return 'destructive';

		default:
			return 'default';
	}
};

// status type
export const status = (status: StatusType): string => {
	switch (status) {
		case 'active':
			return 'active';

		case 'deactivated':
			return 'text-slate-400 dark:text-slate-600';

		case 'draft':
			return 'text-red-300 dark:text-red-800';

		default:
			return 'default';
	}
};
