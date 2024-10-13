import { DynamicIcon } from '@/components/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { badge } from '@/lib/actions';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
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
		cell: ({ row }: any) => (
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
const OnlyImage = () => {
	return {
		accessorKey: 'image',
		header: () => 'Image',
		cell: ({ row }: any) => (
			<div>
				{row.original.image && (
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
		header: ({ column }: any) => {
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

		cell: ({ row }: any) => (
			<div className="capitalize">
				<Badge variant={badge(row.getValue('status'))}>
					{row.getValue('status')}
				</Badge>
			</div>
		),
	};
};

const CreatedBy = () => {
	return {
		accessorKey: 'createdBy',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created By
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }: any) => {
			return (
				<div className="capitalize whitespace-nowrap">
					{row.original.createdBy?.name ? (
						<>
							{row.original.createdBy?.name && (
								<Badge className="capitalize" variant="outline">
									{row.original.createdBy.name}
								</Badge>
							)}
						</>
					) : (
						'N/A'
					)}
				</div>
			);
		},
	};
};

const Category = () => {
	return {
		accessorKey: 'categoryData',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }: any) => {
			return (
				<div className="capitalize whitespace-nowrap">
					{row.original.categoryData?.name ? (
						<>
							{row.original.categoryData?.name && (
								<Badge className="capitalize" variant="secondary">
									{row.original.categoryData.name}
								</Badge>
							)}
						</>
					) : (
						'N/A'
					)}
				</div>
			);
		},
	};
};
const SupplierName = () => {
	return {
		accessorKey: 'supplier_data',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Supplier
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }: any) => {
			return (
				<div className="capitalize whitespace-nowrap">
					{row.original.supplier_data?.name
						? row.original.supplier_data?.name &&
							row.original.supplier_data.name
						: 'N/A'}
				</div>
			);
		},
	};
};

const ProductType = () => {
	return {
		accessorKey: 'product_type',
		header: ({ column }: any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},

		cell: ({ row }: any) => {
			return (
				<div className="capitalize whitespace-nowrap">
					{row.original.product_type ? (
						<>
							{row.original.product_type && (
								<Badge
									className="capitalize"
									variant={
										row.original.product_type === 'single'
											? 'outline'
											: 'secondary'
									}
								>
									{row.original.product_type}
								</Badge>
							)}
						</>
					) : (
						'N/A'
					)}
				</div>
			);
		},
	};
};

const Text = (name: any, label: any) => {
	return {
		accessorKey: name,
		header: ({ column }: any) => {
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
		cell: ({ row }: any) => (
			<div className="lowercase ">{row.getValue(name)}</div>
		),
	};
};
const Date = (name: any, label: any) => {
	return {
		accessorKey: name,
		header: ({ column }: any) => {
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
		cell: ({ row }: any) => (
			<div className="lowercase">
				{row.original[name] && format(row.getValue(name), 'PPP')}
			</div>
		),
	};
};

const SelectBox = () => {
	return {
		id: 'select',
		header: ({ table }: any) => {
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
		cell: ({ row }: any) => {
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

const Action = ({ children }: any) => {
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
	CreatedBy,
	Category,
	OnlyImage,
	ProductType,
	SupplierName,
};
