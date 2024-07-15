'use client';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const confirm = ({
	message,
	title,
	CustomComponent,
	confirmBtnText = 'Confirm',
	cancelBtnText = 'Cancel',
	clickOutSide = false,
	className,
}: {
	message?: string;
	title?: string;
	confirmBtnText?: string;
	cancelBtnText?: string;
	CustomComponent?: React.ReactNode;
	clickOutSide?: boolean;
	className?: string;
}): Promise<boolean> => {
	return new Promise((resolve) => {
		const div = document.createElement('div');
		document.body.appendChild(div);
		const root = ReactDOM.createRoot(div);
		const body = document.body;

		const handleConfirm = () => {
			cleanup();
			resolve(true);
		};

		const handleCancel = () => {
			cleanup();
			resolve(false);
		};

		const cleanup = () => {
			body.style.pointerEvents = '';
			root.unmount();
			div.remove();
		};

		const ConfirmComponent = () => {
			const [open, setOpen] = useState(true);

			const contentRef = useRef<HTMLDivElement>(null);

			useEffect(() => {
				if (clickOutSide) {
					const handleClickOutside = (event: MouseEvent) => {
						if (
							contentRef.current &&
							!contentRef.current.contains(event.target as Node)
						) {
							handleCancel();
						}
					};

					document.addEventListener('mousedown', handleClickOutside);
					return () => {
						document.removeEventListener('mousedown', handleClickOutside);
					};
				}
			}, []);

			useEffect(() => {
				if (!open) {
					document.body.style.pointerEvents = 'none';
				} else {
					document.body.style.pointerEvents = '';
				}
			}, [open]);
			return (
				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogContent ref={contentRef} className={className}>
						{CustomComponent ? (
							CustomComponent
						) : (
							<>
								<AlertDialogHeader>
									<AlertDialogTitle>
										{title ? title : 'Are you absolutely sure?'}
									</AlertDialogTitle>
									<AlertDialogDescription>{message}</AlertDialogDescription>
								</AlertDialogHeader>
							</>
						)}
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCancel}>
								{cancelBtnText}
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleConfirm}>
								{confirmBtnText}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			);
		};

		root.render(<ConfirmComponent />);
	});
};

export { confirm };

/* how to use
	
	<button onClick={handleDelete}>modal</button>


const handleDelete = async () => {
	const confirmed = await confirm({
		message:
			'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
		CustomComponent: <div>sdf</div>,
	});
	if (confirmed) {
		// Perform the delete action here
		console.log('Account deleted');
	} else {
		console.log('Action cancelled');
	}
};
*/
