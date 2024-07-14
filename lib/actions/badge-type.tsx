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
