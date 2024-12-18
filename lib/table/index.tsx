'use client';

import * as React from 'react';
import {
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
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
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
import { DropDownSelect } from '@/components/custom/list-item';
import { NoItemFound } from '@/components/custom/not-found';
interface TableBoxProps<DataType> {
	columns: ColumnDef<DataType>[];
	data: DataType[];
	TFilters: React.JSX.Element;
	TEndChild: React.JSX.Element;
	getSelectedRow: Function;
	searchColumnName?: string;
}

export function TableBox<DataType>({
	columns,
	data,
	TFilters,
	TEndChild,
	getSelectedRow,
	searchColumnName,
}: TableBoxProps<DataType>) {
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
	getSelectedRow(table.getFilteredSelectedRowModel().rows);

	return (
		<div className="w-full">
			<SearchFilter
				table={table}
				TEndChild={TEndChild}
				TFilters={TFilters}
				searchColumnName={searchColumnName}
			/>
			<TB<DataType> table={table} columns={columns} />
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
									<TableHead className="py-3 text-center" key={header.id}>
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
									<TableCell key={cell.id} className="text-center">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								<NoItemFound />
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

function Footer<T>({ table }: { table: TanTable<T> }) {
	const [selectAction, setSelectAction] = React.useState('Actions');

	React.useEffect(() => {
		if (table.getFilteredSelectedRowModel().rows.length <= 0) {
			setSelectAction('Actions');
		}
	}, [table.getFilteredSelectedRowModel().rows.length]);

	return (
		<div className="flex items-center justify-end space-x-2 py-4">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length > 0 && (
					<>
						{`${table.getFilteredSelectedRowModel().rows.length} of ${
							table.getFilteredRowModel().rows.length
						} row(s) selected.`}
						<div className="mt-3 max-w-40">
							<DropDownSelect
								icon="ChevronDown"
								label={selectAction}
								menuLabel="Click to Action"
							>
								<DropdownMenuCheckboxItem
									onCheckedChange={() => setSelectAction('active')}
									checked={selectAction === 'active'}
								>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									onCheckedChange={() => setSelectAction('deactivated')}
									checked={selectAction === 'deactivated'}
								>
									Deactivated
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									onCheckedChange={() => setSelectAction('draft')}
									checked={selectAction === 'draft'}
								>
									Draft
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									onCheckedChange={() => setSelectAction('all')}
									checked={selectAction === 'Delete'}
								>
									Delete
								</DropdownMenuCheckboxItem>
							</DropDownSelect>
						</div>
					</>
				)}
				{table.getFilteredSelectedRowModel().rows.length <= 0 && (
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

function SearchFilter<ProductType>({
	table,
	TFilters,
	TEndChild,
	searchColumnName,
}: {
	table: TanTable<ProductType>;
	TFilters: React.JSX.Element;
	TEndChild: React.JSX.Element;
	searchColumnName?: string;
}) {
	return (
		<div className="flex items-center py-4 gap-2 flex-col lg:flex-row">
			<Input
				placeholder="Search..."
				value={
					(table
						.getColumn(searchColumnName || 'name')
						?.getFilterValue() as string) ?? ''
				}
				onChange={(event) =>
					table
						.getColumn(searchColumnName || 'name')
						?.setFilterValue(event.target.value)
				}
				className="w-full"
				autoComplete="off"
			/>
			<div className="lg:ml-auto flex w-full lg:w-auto items-center gap-3 ">
				{TFilters}
				{/* column filter  */}
				<ColumnFIlter<ProductType> table={table} />
				{TEndChild}
			</div>
		</div>
	);
}

export function Pagination<ProductType>({
	table,
}: {
	table: TanTable<ProductType>;
}) {
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
					<ChevronRight />
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
