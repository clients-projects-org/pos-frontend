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
import { ChevronDown, File, ListFilter, PlusCircle } from 'lucide-react';

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
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<div className="ml-auto flex items-center gap-3">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								<ListFilter className="ml-2 h-4 w-4" /> Filter
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Active
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								<File className="ml-2 h-4 w-4" /> Export
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Filter by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked>
								Active
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown className="ml-2 h-4 w-4" />
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
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" className="gap-1">
						<PlusCircle className="ml-2 h-4 w-4" />
						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Add Product
						</span>
					</Button>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className="pb-3" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
											{header.column.getCanFilter() ? (
												<div>
													<Filter column={header.column} table={table} />
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
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length > 0 ? (
						`${table.getFilteredSelectedRowModel().rows.length} of ${
							table.getFilteredRowModel().rows.length
						} row(s) selected.`
					) : (
						<div className="text-xs text-muted-foreground">
							Showing <strong>1-10</strong> of <strong>32</strong> products
						</div>
					)}
				</div>
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
		</div>
	);
}

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
				className="w-24 border shadow rounded px-2 py-1"
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
				className="w-24 border shadow rounded px-2 py-1"
			/>
		</div>
	) : (
		<input
			type="text"
			value={(columnFilterValue ?? '') as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder={`Search...`}
			className="w-36 border shadow rounded px-2 py-1"
		/>
	);
}

{
	/* dummy data
	import {Payment,columns,data} from '@/lib/table/table-details';
	<TableBox<Payment> columns={columns} data={data} />
	 */
}
