import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type TableOptions,
  type ColumnDef,
} from "@tanstack/react-table";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function useDataTable<T>(data: T[], columns: ColumnDef<T, any>[]) {
  // Table state
  const [sorting, setSorting] = React.useState<any[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<any[]>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({});
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);

  // DnD for settings
  const sensors = useSensors(useSensor(PointerSensor));
  const [draftOrder, setDraftOrder] = React.useState<string[]>([]);
  React.useEffect(() => { setDraftOrder(columnOrder); }, [columnOrder]);
  function handleDragEnd(e: any) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const oldIndex = draftOrder.findIndex((id) => id === active.id);
      const newIndex = draftOrder.findIndex((id) => id === over.id);
      setDraftOrder(arrayMove(draftOrder, oldIndex, newIndex));
    }
  }

  // Table instance
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
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
      columnOrder,
    },
  } as TableOptions<T>);

  return {
    table,
    sortingState: [sorting, setSorting],
    columnFiltersState: [columnFilters, setColumnFilters],
    columnVisibilityState: [columnVisibility, setColumnVisibility],
    rowSelectionState: [rowSelection, setRowSelection],
    columnOrderState: [columnOrder, setColumnOrder],
    // DnD
    sensors,
    draftOrder,
    setDraftOrder,
    handleDragEnd,
  };
} 