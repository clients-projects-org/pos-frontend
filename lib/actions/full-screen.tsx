'use client';
import { DynamicIcon } from '@/components/actions';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Utility function to request fullscreen
const requestFullscreen = (element: HTMLElement): void => {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if ((element as any).webkitRequestFullscreen) {
		// Safari
		(element as any).webkitRequestFullscreen();
	} else if ((element as any).mozRequestFullScreen) {
		// Older Firefox
		(element as any).mozRequestFullScreen();
	} else if ((element as any).msRequestFullscreen) {
		// IE/Edge
		(element as any).msRequestFullscreen();
	}
};

// Utility function to exit fullscreen
const exitFullscreen = (): void => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if ((document as any).webkitExitFullscreen) {
		// Safari
		(document as any).webkitExitFullscreen();
	} else if ((document as any).mozCancelFullScreen) {
		// Older Firefox
		(document as any).mozCancelFullScreen();
	} else if ((document as any).msExitFullscreen) {
		// IE/Edge
		(document as any).msExitFullscreen();
	}
};

export const FullscreenButton = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = () => {
		const docElm = document.documentElement;

		if (!isFullscreen) {
			// Enter fullscreen
			requestFullscreen(docElm);
		} else {
			// Exit fullscreen
			if (
				document.fullscreenElement ||
				(document as any).webkitFullscreenElement ||
				(document as any).mozFullScreenElement ||
				(document as any).msFullscreenElement
			) {
				exitFullscreen();
			}
		}
		setIsFullscreen(!isFullscreen);
	};

	return (
		<Button
			type="button"
			variant={isFullscreen ? 'secondary' : 'outline'}
			size="icon"
			onClick={toggleFullscreen}
		>
			<DynamicIcon
				icon={isFullscreen ? 'Minimize2' : 'Fullscreen'}
				className="h-4 w-4"
			/>
		</Button>
	);
};

export default FullscreenButton;
