'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import IconSelect from './ImageIcoSelect';
import React, { useEffect } from 'react';
import { DynamicIcon } from '@/components/actions';
import Link from 'next/link';

export function IconModal({
	onSave,
	defaultValue,
}: {
	defaultValue: string;
	onSave: (value: string) => void;
}) {
	const [value, setValue] = React.useState(defaultValue || '');
	const [open, setOpen] = React.useState(false);

	const handleSave = () => {
		onSave(value);
		setOpen(false);
	};

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<DynamicIcon icon={value ? value : 'Annoyed'} />
				</Button>
			</DialogTrigger>
			<DialogContent
				onEscapeKeyDown={(e) => e.preventDefault()}
				onPointerDown={(e) => e.preventDefault()}
				onInteractOutside={(e) => e.preventDefault()}
				className="max-w-6xl min-h-96"
			>
				<DialogHeader>
					<DialogTitle>Icons</DialogTitle>
					<DialogDescription>
						Select Icon here. Click save when you're done.
					</DialogDescription>
					<Link
						className="text-sm underline text-blue-600"
						href="https://lucide.dev/icons/"
						target="_blank"
					>
						Icons Library
					</Link>
				</DialogHeader>
				{/* icon component here */}

				<IconSelect value={value} setValue={setValue} />

				<DialogFooter>
					<Button type="button" onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
