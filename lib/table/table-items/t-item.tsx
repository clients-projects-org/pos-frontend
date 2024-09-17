import { DynamicIcon } from '@/components/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { badge } from '@/lib/actions';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
/*
	<Image
		alt="Product image"
		className="aspect-square rounded-md object-cover"
		height="40"
		src={row.original.image as string}
		width="40"
	/>
*/
function isValidCloudImageUrl(url: string): boolean {
	// This regex checks for common image formats, even if there are query parameters in the URL
	const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
	try {
		// Attempt to construct a valid URL object (helps validate the overall URL format)
		new URL(url);
		// Return true if the URL has a valid image extension, false otherwise
		return imageExtensions.test(url);
	} catch {
		// If URL constructor fails, the URL is not valid
		return false;
	}
}
const ImageIcon = () => {
	return {
		accessorKey: 'image',
		header: () => 'Image',
		cell: ({ row }) => (
			<div>
				{row.original.image && row.original.image_type === 'image' ? (
					<Image
						alt="Product image"
						className="aspect-square rounded-md object-cover"
						height="40"
						src={
							isValidCloudImageUrl(row.original.image as string)
								? (row.original.image as string)
								: 'https://ui.shadcn.com/placeholder.svg'
						}
						width="40"
					/>
				) : (
					<div className="icon">
						{row.original.image && (
							<DynamicIcon
								className="w-10 h-10"
								icon={row.original.image as string}
							/>
						)}
					</div>
				)}
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	};
};
const Status = () => {
	return {
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},

		cell: ({ row }) => (
			<div className="capitalize">
				<Badge variant={badge(row.getValue('status'))}>
					{row.getValue('status')}
				</Badge>
			</div>
		),
	};
};

const Text = (name, label) => {
	return {
		accessorKey: name,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					{label}
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue(name)}</div>,
	};
};
const Date = (name, label) => {
	return {
		accessorKey: name,
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					{label}
					<DynamicIcon className="ml-2 h-4 w-4" icon="ArrowUpDown" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{format(row.getValue(name), 'PPP')}</div>
		),
	};
};

const SelectBox = () => {
	return {
		id: 'select',
		header: ({ table }) => {
			return (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			);
		},
		enableSorting: false,
		enableHiding: false,
	};
};

const Action = ({ children }) => {
	return {
		id: 'actions',
		header: () => 'Actions',
		cell: () => {
			return (
				<div className="flex items-center">
					{children}
					<Button variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="ScanEye" className="h-4 w-4" />
					</Button>
					<Button disabled variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="SquarePen" className="h-4 w-4" />
					</Button>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<DynamicIcon icon="Trash2" className="h-4 w-4" />
					</Button>
				</div>
			);
		},
	};
};

const AddLink = ({
	href,
	icon,
	text,
}: {
	href: string;
	icon: string;
	text: string;
}) => {
	return (
		<Link
			href={href}
			className="gap-1 flex items-center border px-3 py-2 text-sm rounded-sm hover:bg-slate-800"
		>
			<DynamicIcon icon={icon} className="h-4 w-4 ml-0" />
			<span className="sr-only sm:not-sr-only !whitespace-nowrap">{text}</span>
		</Link>
	);
};

export const TableItem = {
	ImageIcon,
	Status,
	Text,
	Action,
	SelectBox,
	AddLink,
	Date,
};
