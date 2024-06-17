'use client';
import * as React from 'react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { DynamicIcon } from '@/components/actions';
import { LucideIcons } from '@/lib/icons';
import { LineLoader } from '../loader';

export function ImageIcoRadio({ ...field }) {
	return (
		<RadioGroup
			onValueChange={field.onChange}
			value={field.value}
			defaultValue="image"
			className="flex items-center gap-4"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="image" id="r1" />
				<Label htmlFor="r1">Image</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="icon" id="r2" />
				<Label htmlFor="r2">Icon</Label>
			</div>
		</RadioGroup>
	);
}

import Resizer from 'react-image-file-resizer';

export function ImageSelect() {
	const [imageSrc, setImageSrc] = React.useState(
		'https://ui.shadcn.com/placeholder.svg'
	);

	const handleImageUpload = (event: HTMLFieldSetElement) => {
		const file = event.target.files[0];
		if (file) {
			Resizer.imageFileResizer(
				file,
				300,
				300,
				'JPEG',
				70, // quality percentage
				0,
				(uri) => {
					return setImageSrc(uri as string);
				},
				'base64',
				300,
				300
			);
		}
	};

	return (
		<div className="flex items-center gap-2">
			<button type="button" className="h-10">
				<Image
					alt="Product image"
					className="aspect-square rounded-md object-cover h-10 w-10"
					height="20"
					src={imageSrc}
					width="20"
				/>
			</button>
			<input
				id="image-upload"
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={handleImageUpload}
			/>

			<button
				type="button"
				className="flex aspect-square h-10 w-10 items-center justify-center rounded-md border border-dashed"
				onClick={() => {
					const imageUploadElement = document.getElementById('image-upload');
					if (imageUploadElement) {
						imageUploadElement.click();
					}
				}}
			>
				<DynamicIcon icon="Upload" className="h-4 w-4 text-muted-foreground" />
				<span className="sr-only">Upload</span>
			</button>
		</div>
	);
}

export default function IconSelect() {
	const [value, setValue] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const performMapOperation = () => {
			LucideIcons.map((framework) => {
				return framework;
			});

			setIsLoading(false);
		};

		const timeout = setTimeout(() => {
			performMapOperation();
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	return isLoading ? (
		<LineLoader />
	) : (
		<Command className="border">
			<CommandInput placeholder="Search Icon..." />
			<CommandList>
				<CommandEmpty>No Icon found.</CommandEmpty>
				<CommandGroup className="IconsViewGrid">
					{LucideIcons.map((framework) => (
						<CommandItem
							key={framework}
							value={framework}
							onSelect={(currentValue) => {
								setValue(currentValue === value ? '' : currentValue);
							}}
							className={`cursor-pointer ${
								value === framework ? 'bg-accent ' : ' '
							}`}
						>
							<DynamicIcon
								icon={framework}
								className={`w-full ${
									value === framework
										? 'text-sky-600 '
										: 'dark:text-white text-stone-800'
								}`}
							/>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
