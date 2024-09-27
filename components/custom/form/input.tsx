import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectStatus } from './status';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IconModal } from './icon-modal';
import { isEmptyArray } from '@/lib/actions';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	ImageSelect,
	ProductImageSelect,
	ProductMultiImageSelect,
} from './ImageIcoSelect';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { DynamicIcon } from '@/components/actions';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { IImageSizeInfoType } from '@/lib/image-size';
import { Bird, Check, ChevronsUpDown, Rabbit, Turtle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { image } from '@/assets/image';
import React, { HTMLInputTypeAttribute } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { get } from 'http';

export function FInput({
	label,
	id,
	error,
	...props
}: {
	label: string;
	id: string;
	error?: string[];
	[props: string]: any;
}) {
	return (
		<div className="grid w-full items-center gap-2">
			<Label
				className={`capitalize  ${error && error?.length > 0 ? 'text-destructive' : ''}`}
			>
				{label}
			</Label>
			<Input {...props} />

			<div className="ms-1">
				{error &&
					error?.length > 0 &&
					error?.map((error: string, index: number) => (
						<p key={index} className="text-destructive">
							{error}
						</p>
					))}
			</div>
		</div>
	);
}

export function RFInput({
	methods,
	name,
	label,
	placeholder = 'type...',
	type = 'text',
}: {
	methods: any;
	name: any;
	label?: string;
	placeholder?: string;
	type?: HTMLInputTypeAttribute | undefined;
}) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							placeholder={placeholder}
							onWheel={(event) => event.currentTarget.blur()}
							type={type}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export function RFStatus({
	methods,
	name,
	label = 'Status',
	placeholder = 'Select a Status',
	items = 'actDeDraft',
}: {
	methods: any;
	name: any;
	label?: string | undefined;
	placeholder?: string | undefined;
	items?: string | undefined;
}) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => {
				return (
					<div className="space-y-2">
						<FormLabel>{label}</FormLabel>
						<SelectStatus
							placeholder={placeholder}
							items={items}
							defaultValue={field.value}
							onChange={(e) => field.onChange(e)}
						/>

						<FormMessage />
					</div>
				);
			}}
		/>
	);
}

export function RFTextarea({
	methods,
	name = 'description',
	label = 'Description',
	placeholder = 'type...',
}) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export function RFIcon({ methods, label = true }) {
	return (
		<FormField
			control={methods.control}
			name="image"
			render={({ field }) => (
				<FormItem>
					{label && <Label className="capitalize block mt-2">Icon</Label>}
					<FormControl>
						<IconModal
							onSave={(value) => {
								field.onChange(value);
							}}
							defaultValue={field.value}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

type RFImageProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	imageInfo: IImageSizeInfoType;
};

export function RFImage<T extends FieldValues>({
	methods,
	imageInfo,
}: RFImageProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={'image' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<ImageSelect
							onChange={(value: File) => {
								field.onChange(value);
							}}
							defaultValue={field.value}
							imageInfo={imageInfo}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function RFProductImage<T extends FieldValues>({
	methods,
	imageInfo,
}: RFImageProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={'image' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<ProductImageSelect
							onChange={(value: File) => {
								field.onChange(value);
							}}
							defaultValue={field.value}
							imageInfo={imageInfo}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function RFProductGalleryImage<T extends FieldValues>({
	methods,
	imageInfo,
}: RFImageProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={'gallery_images' as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<ProductMultiImageSelect
							onChange={(value: File) => {
								field.onChange(value);
							}}
							defaultValue={field.value}
							imageInfo={imageInfo}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function RFSelect({ methods, label, data, children, name }) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					{isEmptyArray(data) && (
						<p className="text-sm  text-stone-500">No Item Found</p>
					)}
					{!isEmptyArray(data) && (
						<FormControl>
							<Select defaultValue={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="capitalize">
									<SelectValue placeholder={`Select a ${label}`} />
								</SelectTrigger>
								<SelectContent>{children}</SelectContent>
							</Select>
						</FormControl>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function RFSubmit({
	text,
	isLoading = false,
}: {
	text: string;
	isLoading?: boolean;
}) {
	return (
		<Button disabled={isLoading} variant="default" className=" " type="submit">
			{text}
		</Button>
	);
}

export function RFCalender({ methods, label, name }) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<div>
						<FormLabel>{label}</FormLabel>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant={'outline'}
									className={cn(
										' pl-3 text-left font-normal',
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value ? (
										format(field.value, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
									<DynamicIcon
										icon="CalendarIcon"
										className="ml-auto h-4 w-4 opacity-50"
									/>
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={(date) => date < new Date('1900-01-01')}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

const RFISelectHasIcon = ({ form, label }: { form: any; label: string }) => {
	return (
		<FormField
			control={form.control}
			name="username"
			render={() => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Select>
							<SelectTrigger
								id="model"
								className="items-start [&_[data-description]]:hidden"
							>
								<SelectValue placeholder="Select a model" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="genesis">
									<div className="flex items-start gap-3 text-muted-foreground">
										<Rabbit className="size-5" />

										<div className="grid gap-0.5">
											<p>
												Neural{' '}
												<span className="font-medium text-foreground">
													Genesis
												</span>
											</p>
											<p className="text-xs" data-description>
												Our fastest model for general use cases.
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="explorer">
									<div className="flex items-start gap-3 text-muted-foreground">
										<Bird className="size-5" />
										<div className="grid gap-0.5">
											<p>
												Neural{' '}
												<span className="font-medium text-foreground">
													Explorer
												</span>
											</p>
											<p className="text-xs" data-description>
												Performance and speed for efficiency.
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="quantum">
									<div className="flex items-start gap-3 text-muted-foreground">
										<Turtle className="size-5" />
										<div className="grid gap-0.5">
											<p>
												Neural{' '}
												<span className="font-medium text-foreground">
													Quantum
												</span>
											</p>
											<p className="text-xs" data-description>
												The most powerful model for complex computations.
											</p>
										</div>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const RFCheck2 = () => {
	return (
		<div className="items-top flex space-x-2">
			<Checkbox id="terms1" />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor="terms1"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Is Feature Product
				</label>
				<p className="text-sm text-muted-foreground">
					This is a feature product that can be added to your store.
				</p>
			</div>
		</div>
	);
};
export function RFCheck({
	methods,
	name,
	label,
}: {
	methods: any;
	name: any;
	label?: string;
	placeholder?: string;
}) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="items-top flex space-x-2">
							<Checkbox
								id="terms1"
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="terms1"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Is Feature Product
								</label>
								<p className="text-sm text-muted-foreground">
									This is a feature product that can be added to your store.
								</p>
							</div>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function RadioVariantType({ methods }: any) {
	return (
		<FormField
			control={methods.control}
			name="product_type"
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormLabel>Product Type</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={field.onChange}
							defaultValue={field.value}
							className="flex items-center gap-3"
						>
							<FormItem className="flex items-center space-x-3 space-y-0">
								<FormControl>
									<RadioGroupItem value="single" />
								</FormControl>
								<FormLabel className="font-normal">Single</FormLabel>
							</FormItem>
							<FormItem className="flex items-center space-x-3 space-y-0">
								<FormControl>
									<RadioGroupItem value="variant" />
								</FormControl>
								<FormLabel className="font-normal">Variant</FormLabel>
							</FormItem>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function SelectSearch({
	frameworks,
	onChange,
	value,
}: {
	frameworks: { _id: string; name: string }[];
	value: string;
	onChange: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize"
				>
					{value
						? frameworks?.find((framework) => framework._id === value)?.name
						: 'Select Item...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search item..." />
					<CommandList>
						<CommandEmpty className="p-4">No item found.</CommandEmpty>
						<CommandGroup>
							{frameworks?.map((framework) => (
								<CommandItem
									className="capitalize"
									key={framework._id}
									value={framework.name}
									onSelect={() => {
										onChange(framework._id === value ? '' : framework._id);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === framework._id ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{framework.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

type RFISearchAbleProps<T extends FieldValues> = {
	methods: UseFormReturn<T>;
	getTargetValue?: any;
	label: string;
	OPTIONS?: any[];
	name: Path<T>;
};

function SearchAbleSelect<T extends FieldValues>({
	methods,
	label,
	OPTIONS,
	name,
}: RFISearchAbleProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormLabel className="block">{label}</FormLabel>
					<FormControl>
						{OPTIONS && (
							<SelectSearch
								frameworks={OPTIONS}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function SearchSelectMultiple<T extends FieldValues>({
	methods,
	label,
	OPTIONS,
	name,
	getTargetValue,
}: RFISearchAbleProps<T>) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormLabel className="block">{label}</FormLabel>
					<FormControl>
						{OPTIONS && (
							<SelectSearchMultiple
								frameworks={OPTIONS}
								value={field.value || []} // Ensure the value is an array
								onChange={field.onChange} // Pass the onChange handler
								getTargetValue={getTargetValue}
							/>
						)}
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

function SelectSearchMultiple({
	frameworks,
	onChange,
	value, // value will now be an array of selected ids
	getTargetValue,
}: {
	frameworks: { _id: string; name: string }[];
	value: string[]; // Array of selected values
	onChange: (value: string[]) => void; // Update onChange to accept an array
	getTargetValue?: (id: string) => void;
}) {
	const [open, setOpen] = React.useState(false);

	// Check if an item is selected
	const isSelected = (id: string) => value.includes(id);

	// Toggle the selection of an item
	const handleSelect = (id: string) => {
		if (getTargetValue) {
			getTargetValue(id);
		}
		console.log(id, 'click id ');
		if (isSelected(id)) {
			// Remove the item from the selected list if already selected
			onChange(value.filter((selectedId) => selectedId !== id));
		} else {
			// Add the item to the selected list if not already selected
			onChange([...value, id]);
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between capitalize"
				>
					{/* Display selected items, or placeholder if none selected */}
					{value.length > 0
						? value
								.map(
									(id) =>
										frameworks.find((framework) => framework._id === id)?.name
								)
								.join(', ')
						: 'Select Items...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search items..." />
					<CommandList>
						<CommandEmpty className="p-4">No item found.</CommandEmpty>
						<CommandGroup>
							{frameworks?.map((framework) => (
								<CommandItem
									className="capitalize"
									key={framework._id}
									value={framework.name}
									onSelect={() => {
										handleSelect(framework._id); // Toggle selection on click
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											isSelected(framework._id) ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{framework.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export const RFrom = {
	RFInput,
	RFSelect,
	RFSubmit,
	RFCalender,
	RFIcon,
	RFImage,
	RFTextarea,
	RFStatus,
	RFISelectHasIcon,
	RFCheck,
	RFProductImage,
	RadioVariantType,
	RFProductGalleryImage,
	SearchAbleSelect,
	SearchSelectMultiple,
};
