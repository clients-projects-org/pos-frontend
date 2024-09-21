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
import { Button } from '@/components/ui/button';
import { IImageSizeInfoType } from '@/lib/image-size';
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

export function ImageSelect({
	imageInfo,
	onChange,
}: {
	imageInfo: IImageSizeInfoType;
	onChange: (File: File) => void;
	defaultValue?: string;
}) {
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
				if (file.size > imageInfo.size * 1024) {
					setWarning(`Image Size will be less then ${imageInfo.size}Kb`);
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				if (img.width > imageInfo.width || img.height > imageInfo.height) {
					setWarning(
						`Image width and hight less then ${imageInfo.width}px*${imageInfo.width}px`
					);
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				setWarning('');
				setImageSrc(objectUrl);
				onChange(file);
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
				<button type="button" className="">
					<Image
						alt="Product image"
						className={`aspect-square rounded-md object-cover ${imageInfo.viewWidth} ${imageInfo.viewHeight}`}
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
							Image Size will be less then {imageInfo.size}Kb
						</p>
						<p className="text-yellow-500 text-xs ">
							Image width and hight less then {imageInfo.width}px*
							{imageInfo.width}px
						</p>
					</>
				)}
				{warning && <p className="text-red-500 text-xs ">{warning}</p>}
			</div>
		</div>
	);
}
export default function IconSelect({
	value,
	setValue,
}: {
	value: string;
	setValue: Function;
}) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [load, setLoad] = React.useState(105);

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

	const handleLoadMore = () => {
		if (iconList.length > load) {
			setLoad(load + 300);
			return;
		}

		setLoad(iconList.length);
	};
	return isLoading ? (
		<LineLoader />
	) : (
		<Command className="border">
			<CommandInput placeholder="Search Icon..." />
			<CommandList>
				<CommandEmpty>No Icon found.</CommandEmpty>
				<CommandGroup className="IconsViewGrid">
					{iconList.slice(0, load).map((framework) => (
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
			<div className="flex justify-center">
				<Button
					disabled={iconList.length <= load}
					onClick={handleLoadMore}
					className="w-fit"
					type="button"
					size="sm"
					variant="outline"
				>
					Load more
				</Button>
			</div>
		</Command>
	);
}

export function ProductImageSelect({
	imageInfo,
	onChange,
}: {
	imageInfo: IImageSizeInfoType;
	onChange: (File: File) => void;
	defaultValue?: string;
}) {
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
				if (file.size > imageInfo.size * 1024) {
					setWarning(`Image Size will be less then ${imageInfo.size}Kb`);
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				if (img.width > imageInfo.width || img.height > imageInfo.height) {
					setWarning(
						`Image width and hight less then ${imageInfo.width}px*${imageInfo.width}px`
					);
					URL.revokeObjectURL(objectUrl); // Clean up the object URL
					setImageSrc(image.placeholder);
					return;
				}

				setWarning('');
				setImageSrc(objectUrl);
				onChange(file);
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
		<>
			<div className="mb-2">
				{imageSrc === image.placeholder && !warning && (
					<>
						<p className="text-yellow-500 text-xs ">
							Image Size will be less then {imageInfo.size}Kb
						</p>
						<p className="text-yellow-500 text-xs ">
							Image width and hight less then {imageInfo.width}px*
							{imageInfo.width}px
						</p>
					</>
				)}
				{warning && <p className="text-red-500 text-xs ">{warning}</p>}
			</div>
			<div className="relative">
				{loading && <Skeleton className="h-10 w-10 rounded-xl" />}
				{!loading && (
					<button type="button" className="w-full">
						<Image
							alt="Product image"
							className="aspect-square w-full rounded-md object-cover "
							height="300"
							src={imageSrc}
							width="300"
						/>
					</button>
				)}
				<input
					id="image-upload-product"
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={handleImageUpload}
				/>
				<button
					type="button"
					className="flex aspect-square h-20 w-20 items-center justify-center rounded-md border border-dashed  absolute top-4 right-4  "
					onClick={() => {
						const imageUploadElement = document.getElementById(
							'image-upload-product'
						) as HTMLInputElement;
						if (imageUploadElement) {
							imageUploadElement.click();
						}
					}}
				>
					<DynamicIcon
						icon="Upload"
						className="h-8 w-8 text-muted-foreground"
					/>
					<span className="sr-only">Upload</span>
				</button>
			</div>
		</>
	);
}

export function ProductMultiImageSelect({
	imageInfo,
	onChange,
}: {
	imageInfo: IImageSizeInfoType;
	onChange: (files: File[]) => void;
	defaultValue?: string;
}) {
	const MAX_IMAGES = 4;

	const [images, setImages] = React.useState<
		{ src: string; warning: string; file: File | null }[]
	>([]);
	console.log(images, 'images');
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setLoading(true);
		const files = event.target.files;

		if (files) {
			// Ensure only the first MAX_IMAGES files can be selected
			const availableSlots = MAX_IMAGES - images.length;
			const validFiles = Array.from(files).slice(0, availableSlots);

			if (availableSlots <= 0) {
				setLoading(false);
				return;
			}

			const loadImages = validFiles.map((file) => {
				return new Promise<{ src: string; warning: string; file: File | null }>(
					(resolve) => {
						const img = new window.Image();
						const objectUrl = URL.createObjectURL(file);
						img.src = objectUrl;

						img.onload = () => {
							if (file.size > imageInfo.size * 1024) {
								resolve({
									src: '',
									warning: `Image size must be less than ${imageInfo.size}Kb`,
									file: null,
								});
								URL.revokeObjectURL(objectUrl);
								return;
							}

							if (
								img.width > imageInfo.width ||
								img.height > imageInfo.height
							) {
								resolve({
									src: '',
									warning: `Image dimensions must be less than ${imageInfo.width}px by ${imageInfo.height}px`,
									file: null,
								});
								URL.revokeObjectURL(objectUrl);
								return;
							}

							resolve({ src: objectUrl, warning: '', file });
						};

						img.onerror = () => {
							resolve({
								src: '',
								warning: 'Failed to load the image.',
								file: null,
							});
							URL.revokeObjectURL(objectUrl);
						};
					}
				);
			});

			const newImages = await Promise.all(loadImages); // Wait for all images to load
			setImages((prevImages) => [...prevImages, ...newImages]); // Update state after all images are processed
			onChange(Array.from(files));
			setLoading(false);
		}
	};

	const handleDeleteImage = (index: number) => {
		setImages((prevImages) => {
			const updatedImages = [...prevImages];
			URL.revokeObjectURL(updatedImages[index].src); // Revoke the object URL for the deleted image
			updatedImages.splice(index, 1); // Remove the image at the specified index
			return updatedImages;
		});
	};

	return (
		<>
			<div className="mb-2">
				{images.length === 0 && (
					<>
						<p className="text-yellow-500 text-xs">
							Image size must be less than {imageInfo.size}Kb.
						</p>
						<p className="text-yellow-500 text-xs">
							Image dimensions must be less than {imageInfo.width}px by{' '}
							{imageInfo.height}px.
						</p>
					</>
				)}
			</div>
			<div className="relative grid grid-cols-2 gap-4">
				{loading && <Skeleton className="h-10 w-10 rounded-xl" />}
				{!loading &&
					images.map((image, index) => (
						<div key={index} className="relative">
							{
								<>
									{image.warning && (
										<p className="text-red-500 text-xs ">{image.warning}</p>
									)}

									<Image
										alt="Selected product"
										className="aspect-square w-full rounded-md object-cover"
										height="300"
										src={image.src}
										width="300"
									/>
									<button
										type="button"
										className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
										onClick={() => handleDeleteImage(index)}
									>
										<DynamicIcon icon="X" className="h-4 w-4" />
									</button>
								</>
							}
						</div>
					))}

				{images.length < MAX_IMAGES && (
					<>
						<input
							id="image-upload-gallery"
							type="file"
							accept="image/*"
							style={{ display: 'none' }}
							onChange={handleImageUpload}
							multiple
						/>
						<button
							type="button"
							className="flex aspect-square h-14 w-14 items-center justify-center rounded-md border border-dashed  "
							onClick={() => {
								const imageUploadElement = document.getElementById(
									'image-upload-gallery'
								) as HTMLInputElement;
								if (imageUploadElement) {
									imageUploadElement.click();
								}
							}}
						>
							<DynamicIcon
								icon="Upload"
								className="h-4 w-4 text-muted-foreground"
							/>
							<span className="sr-only">Upload</span>
						</button>
					</>
				)}
			</div>
		</>
	);
}

/* how can it optimize

 - show only the  80 icons others will hide 
 - if selected one only 80 show others will hide

 - make a search for all icons
 - if selected one only 80 show others will hide

- make a popup then mange all and click ok then hide this

------------
 - select only selected image

*/
