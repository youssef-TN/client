import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { useDataTable } from "@/hooks/useDataTable";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  customizationDialog?: React.ReactNode;
  onRowDrawerOpen?: (row: Row<T>) => void;
}

function DataTable<T>({ data, columns, customizationDialog, onRowDrawerOpen }: DataTableProps<T>) {
  const {
    table,
    // sortingState, columnFiltersState, columnVisibilityState, rowSelectionState, columnOrderState,
    // sensors, draftOrder, setDraftOrder, handleDragEnd
  } = useDataTable(data, columns);

  // Always-present first column: selection + settings
  const firstColumn: ColumnDef<T, any> = {
    id: "_select_settings",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        {/* Placeholder for future settings (e.g., reorder, show/hide) */}
        {customizationDialog}
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {/* Placeholder for future row settings */}
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    size: 48,
    minSize: 40,
    maxSize: 64,
    meta: { alwaysVisible: true },
  };

  // Always-present end column: actions (e.g., open drawer)
  const endColumn: ColumnDef<T, any> = {
    id: "_actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Details"
        onClick={() => onRowDrawerOpen && onRowDrawerOpen(row)}
      >
        {/* You can replace this with an icon */}
        <Search />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    size: 48,
    minSize: 40,
    maxSize: 64,
    meta: { alwaysVisible: true },
  };

  // Compose columns: firstColumn + user columns + endColumn
  const allColumns = React.useMemo(() => [firstColumn, ...columns, endColumn], [columns]);

  table.setOptions((prev) => ({ ...prev, columns: allColumns }));

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header &&
                        (typeof header.column.columnDef.header === "function"
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header)}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.cell &&
                      (typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.column.columnDef.cell)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
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

export default DataTable; 