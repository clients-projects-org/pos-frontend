'use client';
import { ToastActionElement } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';

export type ToastOptions = {
	title: string;
	description: string;
	action?: ToastActionElement;
	autoClose?: boolean; // New property to enable auto-close
	autoCloseDelay?: number; // Delay in milliseconds before auto-closing
	variant?: 'default' | 'destructive';
};

const showToast = (options: ToastOptions): void => {
	const div = document.createElement('div');
	document.body.appendChild(div);
	const root = ReactDOM.createRoot(div);

	const ToastComponent = () => {
		const { toast } = useToast();

		useEffect(() => {
			const {
				title,
				description,
				action,
				autoClose = true,
				autoCloseDelay = 3000,
				variant = 'default',
			} = options;

			const closeToast = () => {
				root.unmount();
				div.remove();
			};

			const timeoutId = setTimeout(() => {
				if (autoClose) {
					closeToast();
				}
			}, autoCloseDelay || 5000); // Default delay of 5 seconds if not specified

			toast({ title, description, action, variant });

			return () => {
				clearTimeout(timeoutId); // Clear timeout on unmount
				closeToast();
			};
		}, [options, root]);

		return null;
	};

	root.render(<ToastComponent />);
};

export { showToast };
