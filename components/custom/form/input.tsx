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
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ImageSelect } from './ImageIcoSelect';
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

export function RFInput({ methods, name, label, placeholder = 'type...' }) {
	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input placeholder={placeholder} {...field} />
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
						<Label className="capitalize">{label}</Label>
						<SelectStatus
							placeholder={placeholder}
							items={items}
							defaultValue={field.value}
							onChange={(e) => field.onChange(e)}
						/>
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
export function RFImage({ methods }) {
	return (
		<FormField
			control={methods.control}
			name="image"
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<ImageSelect
							onChange={(value: string) => {
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
							<Select onValueChange={field.onChange}>
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

export function RFSubmit({ text }: { text: string }) {
	return (
		<div className="flex justify-end">
			<Button
				variant="outline"
				className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600"
				type="submit"
			>
				{text}
			</Button>
		</div>
	);
}
