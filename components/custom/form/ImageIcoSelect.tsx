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
import { Skeleton } from '@/components/ui/skeleton';
import { image } from '@/assets/image';
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

export function ImageSelect() {
	const [imageSrc, setImageSrc] = React.useState<string>(image.placeholder);
	const [warning, setWarning] = React.useState<string>('');
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		const file = event.target.files?.[0];

		if (file) {
			const img = new window.Image();
			const objectUrl = URL.createObjectURL(file);
			img.src = objectUrl;

			img.onload = () => {
				setLoading(false);
				if (file.size > 150 * 1024) {
					setWarning('Image Size will be less then 150Kb');
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				if (img.width > 200 || img.height > 200) {
					setWarning('Image hight and width less then 200px');
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				setWarning('');
				setImageSrc(objectUrl);
			};

			img.onerror = () => {
				setLoading(false);
				setWarning('Failed to load the image.');
				URL.revokeObjectURL(objectUrl); // Clean up the object URL
				setImageSrc(image.placeholder);
			};
		}
	};

	return (
		<div className="flex items-center gap-2">
			{loading && <Skeleton className="h-10 w-10 rounded-xl" />}
			{!loading && (
				<button type="button" className="h-10">
					<Image
						alt="Product image"
						className="aspect-square rounded-md object-cover h-10 w-10"
						height={40}
						src={imageSrc}
						width={40}
					/>
				</button>
			)}
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
					const imageUploadElement = document.getElementById(
						'image-upload'
					) as HTMLInputElement;
					if (imageUploadElement) {
						imageUploadElement.click();
					}
				}}
			>
				<DynamicIcon icon="Upload" className="h-4 w-4 text-muted-foreground" />
				<span className="sr-only">Upload</span>
			</button>
			<div>
				{imageSrc === image.placeholder && !warning && (
					<>
						<p className="text-yellow-500 text-xs ">
							Image Size will be less then 150Kb
						</p>
						<p className="text-yellow-500 text-xs ">
							Image hight and width less then 200px
						</p>
					</>
				)}
				{warning && <p className="text-red-500 text-xs ">{warning}</p>}
			</div>
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
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	const iconList = React.useMemo(
		() => LucideIcons.map((icon) => icon),
		[LucideIcons]
	);

	return isLoading ? (
		<LineLoader />
	) : (
		<Command className="border">
			<CommandInput placeholder="Search Icon..." />
			<CommandList>
				<CommandEmpty>No Icon found.</CommandEmpty>
				<CommandGroup className="IconsViewGrid">
					{iconList.slice(0, 80).map((framework) => (
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

/* how can it optimize

 - show only the  80 icons others will hide 
 - if selected one only 80 show others will hide

 - make a search for all icons
 - if selected one only 80 show others will hide

- make a popup then mange all and click ok then hide this

*/
