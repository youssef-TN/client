// src/routes/inventory/items.lazy.tsx

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Settings2,
  Lock,
  GripVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { createLazyFileRoute, useLoaderData } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type SortingState,
  type ColumnOrderState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Item } from "@/types/item";

// Sortable column component for the customization dialog
function ColumnCustomizationItem({
  id,
  label,
  isHidden,
  isVisible,
  onToggleVisibility,
}: {
  id: string;
  label: string;
  isHidden: boolean;
  isVisible: boolean;
  onToggleVisibility: (value: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex items-center gap-2 p-2 border rounded-md bg-background"
    >
      <div {...attributes} {...listeners} className={"cursor-grab"}>
        <GripVertical className="h-4 w-4" />
      </div>
      <span className="flex-1">{label}</span>
      {isHidden ? (
        <Checkbox
          checked={isVisible}
          onCheckedChange={onToggleVisibility}
          aria-label={`Toggle ${label} visibility`}
        />
      ) : (
        <Lock className="h-4 w-4" />
      )}
    </div>
  );
}

// Column customization dialog component
function ColumnCustomizationDialog({
  table,
  onSave,
}: {
  table: ReturnType<typeof useReactTable<Item>>;
  onSave: (order: string[], visibility: VisibilityState) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [draftOrder, setDraftOrder] = useState<string[]>(() =>
    table
      .getAllColumns()
      .filter((col) => col.id !== "actions")
      .map((col) => col.id)
  );
  const [draftVisibility, setDraftVisibility] = useState<VisibilityState>(() =>
    table.getAllColumns().reduce(
      (acc, col) => ({
        ...acc,
        [col.id]: col.getIsVisible(),
      }),
      {}
    )
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Settings2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              {t("common.actions.customizeColumns")}
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogClose />
        </DialogHeader>
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e: DragEndEvent) => {
              const { active, over } = e;
              if (over && active.id !== over.id) {
                const oldIndex = draftOrder.findIndex((id) => id === active.id);
                const newIndex = draftOrder.findIndex((id) => id === over.id);
                setDraftOrder(arrayMove(draftOrder, oldIndex, newIndex));
              }
            }}
          >
            <SortableContext
              items={draftOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {draftOrder.map((id) => {
                  const column = table.getColumn(id);
                  if (!column) return null;
                  return (
                    <ColumnCustomizationItem
                      key={id}
                      id={id}
                      label={id}
                      isHidden={column.getCanHide()}
                      isVisible={draftVisibility[id]}
                      onToggleVisibility={(val) =>
                        setDraftVisibility((prev) => ({
                          ...prev,
                          [id]: val,
                        }))
                      }
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t("common.actions.cancel")}</Button>
          </DialogClose>
          <Button
            disabled={
              JSON.stringify(draftOrder) ===
                JSON.stringify(table.getState().columnOrder) &&
              JSON.stringify(draftVisibility) ===
                JSON.stringify(table.getState().columnVisibility)
            }
            onClick={() => {
              onSave(draftOrder, draftVisibility);
              setOpen(false);
            }}
          >
            {t("common.actions.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main table component
function RouteComponent() {
  const data = useLoaderData({
    from: "/inventory/items",
  }) as Item[];
  const { t } = useTranslation();

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  // Column definitions
  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        id: "actions",
        header: ({ table }) => {
          const anySelected = Object.values(table.getState().rowSelection).some(Boolean);
          return (
            <div className="flex justify-end items-center gap-2">
              {!anySelected && (
                <ColumnCustomizationDialog
                  table={table}
                  onSave={(order, visibility) => {
                    setColumnOrder([...order, "actions"]);
                    setColumnVisibility(visibility);
                  }}
                />
              )}
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
              />
            </div>
          );
        },
        cell: ({ row, table }) => {
          const anySelected = Object.values(table.getState().rowSelection).some(Boolean);
          return (
            <div className="flex justify-end items-center gap-2">
              {!anySelected && (
                // Place your row options menu here (e.g., edit/delete)
                null
              )}
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "id",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("common.labels.id")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("id")}</div>
        ),
        enableSorting: true,
        enableColumnFilter: true,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("common.labels.name")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: true,
        enableColumnFilter: true,
        enableHiding: true,
      },
      {
        accessorKey: "cost",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("pages.inventory.items.purchase.costPrice")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("cost")}</div>,
        enableSorting: true,
        enableColumnFilter: true,
        enableHiding: true,
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("pages.inventory.items.sales.sellingPrice")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
        enableSorting: true,
        enableColumnFilter: true,
        enableHiding: true,
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("common.labels.category")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
        enableSorting: true,
        enableColumnFilter: true,
        enableHiding: true,
      },
      {
        accessorKey: "quantity",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2"
          >
            {t("common.labels.quantity")}
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
        enableSorting: true,
        enableHiding: false,
      },
      
    ],
    [t]
  );

  // Initialize table
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
  });

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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                onClick={() => console.log(row)}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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

export const Route = createLazyFileRoute("/inventory/items")({
  component: RouteComponent,
});
