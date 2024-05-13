export const status = (status: string) => {
	switch (status) {
		// active
		case 'admin':
		case 'supper admin':
		case 'active':
			return 'default';

		// inactive
		case 'deactivate':
		case 'user':
			return 'secondary';

		// outline
		case 'staff':
			return 'outline';

		// danger
		case 'draft':
			return 'destructive';
	}
};
