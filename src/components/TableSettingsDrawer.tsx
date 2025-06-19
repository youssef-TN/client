import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical } from "lucide-react";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDataTable } from "@/hooks/useDataTable";

interface TableSettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: { id: string; label: string; canHide: boolean; isVisible: boolean }[];
  columnOrder: string[];
  onColumnOrderChange: (order: string[]) => void;
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (vis: Record<string, boolean>) => void;
}

function SortableColumnItem({ id, label, canHide, isVisible, onToggleVisibility, attributes, listeners, setNodeRef, transform, transition, isDragging }: any) {
  return (
    <Card ref={setNodeRef} style={{
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }} className="mb-2">
      <CardContent className="flex items-center gap-2 py-2 px-3">
        <span {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4" />
        </span>
        <span className="flex-1">{label}</span>
        {canHide && (
          <Checkbox checked={isVisible} onCheckedChange={onToggleVisibility} aria-label={`Toggle ${label} visibility`} />
        )}
      </CardContent>
    </Card>
  );
}

const TableSettingsDrawer: React.FC<TableSettingsDrawerProps> = ({
  open, onOpenChange, columns, columnOrder, onColumnOrderChange, columnVisibility, onColumnVisibilityChange,
}) => {
  const [draftVisibility, setDraftVisibility] = React.useState(columnVisibility);
  React.useEffect(() => { setDraftVisibility(columnVisibility); }, [columnVisibility]);

  // Use useDataTable for DnD logic only
  const { draftOrder, setDraftOrder, sensors, handleDragEnd } = useDataTable([], []);
  React.useEffect(() => { setDraftOrder(columnOrder); }, [columnOrder, setDraftOrder]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Table Settings</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        <ScrollArea className="h-80">
          <SortableContext items={draftOrder} strategy={verticalListSortingStrategy}>
            <div>
              {draftOrder.map((id) => {
                const col = columns.find((c) => c.id === id);
                if (!col) return null;
                const sortable = useSortable({ id });
                return (
                  <SortableColumnItem
                    key={id}
                    id={id}
                    label={col.label}
                    canHide={col.canHide}
                    isVisible={draftVisibility[id]}
                    onToggleVisibility={(val: boolean) => setDraftVisibility((prev) => ({ ...prev, [id]: val }))}
                    {...sortable}
                  />
                );
              })}
            </div>
          </SortableContext>
        </ScrollArea>
        <Separator className="my-2" />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setDraftOrder(columnOrder);
              setDraftVisibility(columnVisibility);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onColumnOrderChange(draftOrder);
              onColumnVisibilityChange(draftVisibility);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TableSettingsDrawer;