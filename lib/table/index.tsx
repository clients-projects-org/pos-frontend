'use client';

import * as React from 'react';
import {
	Column,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	Table as TanTable,
	ColumnDef,
} from '@tanstack/react-table';
import {
	ChevronDown,
	ChevronLeft,
	ChevronsLeft,
	ChevronsRight,
	File,
	ListFilter,
	PlusCircle,
} from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
interface TableBoxProps<DataType> {
	columns: ColumnDef<DataType>[];
	data: DataType[];
}

export function TableBox<DataType>({ columns, data }: TableBoxProps<DataType>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full">
			<SearchFilter table={table} />
			<TB table={table} columns={columns} />
			<Footer table={table} />
		</div>
	);
}

function TB<ProductType>({
	table,
	columns,
}: {
	table: TanTable<ProductType>;
	columns: ColumnDef<ProductType>[];
}) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead className="py-3" key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
										{header.column.getCanFilter() ? (
											<div>
												{/* <Filter column={header.column} table={table} /> */}
											</div>
										) : null}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function Footer<ProductType>({ table }: { table: TanTable<ProductType> }) {
	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length > 0 ? (
					`${table.getFilteredSelectedRowModel().rows.length} of ${
						table.getFilteredRowModel().rows.length
					} row(s) selected.`
				) : (
					<div className="flex items-center justify-between space-x-2 py-4">
						<Pagination table={table} />
						<div className="space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Next
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

// header filter
function Filter({
	column,
	table,
}: {
	column: Column<any, any>;
	table: TanTable<any>;
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();
	if (column.id === 'image') {
		return null;
	}
	return typeof firstValue === 'number' ? (
		<div className="flex space-x-2">
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ''}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						e.target.value,
						old?.[1],
					])
				}
				placeholder={`Min`}
				className="w-full border shadow rounded px-2 py-1"
			/>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ''}
				onChange={(e) =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder={`Max`}
				className="w-full border shadow rounded px-2 py-1"
			/>
		</div>
	) : (
		<input
			type="text"
			value={(columnFilterValue ?? '') as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={`Search...`}
			className="w-full border shadow rounded px-2 py-1"
		/>
	);
}

function SearchFilter<ProductType>({
	table,
}: {
	table: TanTable<ProductType>;
}) {
	return (
		<div className="flex items-center py-4 gap-2 flex-col lg:flex-row">
			<Input
				placeholder="Filter emails..."
				value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
				onChange={(event) =>
					table.getColumn('name')?.setFilterValue(event.target.value)
				}
				className="  w-full"
				autoComplete="off"
			/>
			<div className="lg:ml-auto flex w-full lg:w-auto items-center gap-3 ">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className=" ">
							<ListFilter className="h-4 w-4 sm:mr-2" />
							<span className="sr-only sm:not-sr-only">Filter</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className=" ">
							<File className="h-4 w-4 sm:mr-2" />
							<span className="sr-only sm:not-sr-only">Export</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Filter by</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* column filter  */}
				<ColumnFIlter<ProductType> table={table} />

				<Button size="sm" className="gap-1">
					<PlusCircle className="h-4 w-4 ml-0" />
					<span className="sr-only sm:not-sr-only !whitespace-nowrap">
						Add Product
					</span>
				</Button>
			</div>
		</div>
	);
}

function Pagination<ProductType>({ table }: { table: TanTable<ProductType> }) {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<span className="flex items-center gap-1 whitespace-nowrap">
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount().toLocaleString()}
					</strong>
				</span>
				<span className="flex items-center gap-1  whitespace-nowrap">
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
						className="border p-1 rounded w-16"
					/>
				</span>
			</div>
			<div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronsLeft />
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeft />
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronLeft />
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					<ChevronsRight />
				</button>

				<Select
					value={table.getState().pagination.pageSize.toString()}
					onValueChange={(value) => table.setPageSize(Number(value))}
				>
					<SelectTrigger className="h-8">
						<SelectValue placeholder="Select page size" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{[10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									Show {pageSize}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{/* <div>
				Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
				{table.getRowCount().toLocaleString()} Rows
			</div>
			<pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
		</div>
	);
}

function ColumnFIlter<DataType>({ table }: { table: TanTable<DataType> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="">
					<span className="sr-only sm:not-sr-only">Columns</span>
					<ChevronDown className="h-4 w-4 sm:ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

{
	/* dummy data
	import {Payment,columns,data} from '@/lib/table/table-details';
	<TableBox<Payment> columns={columns} data={data} />
	 */
}
