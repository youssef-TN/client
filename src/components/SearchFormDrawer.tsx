import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface SearchFormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rowData?: any;
  children?: React.ReactNode;
}

const SearchFormDrawer: React.FC<SearchFormDrawerProps> = ({ open, onOpenChange, rowData, children }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Details</SheetTitle>
          <SheetDescription>
            {rowData ? (
              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                {JSON.stringify(rowData, null, 2)}
              </pre>
            ) : (
              <span>No data</span>
            )}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SearchFormDrawer; 