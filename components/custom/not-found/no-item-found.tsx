import { DynamicIcon } from '@/components/actions';
import React from 'react';

export function NoItemFound() {
	return (
		<div className="bg-slate-100 text-slate-500 dark:bg-slate-900 p-4 rounded-md flex justify-center gap-2 select-none">
			<DynamicIcon icon="Inbox" />
			<span>No items found</span>
		</div>
	);
}
