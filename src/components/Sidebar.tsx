import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSub,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { cn } from "@/lib/utils";

import { useTranslation } from "react-i18next";
import {
  Home,
  Warehouse,
  ShoppingCart,
  Tag,
  ChartColumn,
  Command,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

// Types
interface MenuItemDataProps {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  url?: string;
  children?: MenuItemDataProps[];
}

interface MenuItemComponentProps {
  data: MenuItemDataProps;
  current: string;
  parent?: string | null;
}

interface SidebarProps {
  currentPage: string;
  parentPage: string | null;
}

// Constants
export const IDS = {
  main: {
    home: "home",
    inventory: "inventory",
    sales: "sales",
    purchases: "purchases",
    reports: "reports",
  },
  inventory: {
    items: "items",
    itemGroups: "item-groups",
    priceLists: "price-lists",
    adjustments: "inventory-adjustments",
  },
  sales: {
    customers: "customers",
    orders: "sales-orders",
    packages: "packages",
    shipments: "shipments",
    invoices: "invoices",
    receipts: "sales-receipts",
    payments: "payments-received",
    returns: "sales-returns",
    creditNotes: "credit-notes",
  },
  purchases: {
    vendors: "vendors",
    expenses: "expenses",
    orders: "purchases-orders",
    receives: "purchases-receives",
    bills: "bills",
    payments: "payments-made",
    credits: "vendor-credits",
  },
} as const;

const MENU_GROUPS = [
  { items: [IDS.main.home, IDS.main.inventory] },
  { items: [IDS.main.sales, IDS.main.purchases] },
  { items: [IDS.main.reports] },
] as const;

// Custom hook for sidebar items
function useSidebarItems() {
  const { t } = useTranslation();
  return {
    [IDS.main.home]: {
      id: IDS.main.home,
      label: t("navigation.main.home"),
      icon: Home,
      url: "/",
    },
    [IDS.main.inventory]: {
      id: IDS.main.inventory,
      label: t("navigation.main.inventory"),
      icon: Warehouse,
      children: [
        {
          id: IDS.inventory.items,
          label: t("navigation.inventory.items"),
          url: "inventory/items",
        },
        {
          id: IDS.inventory.itemGroups,
          label: t("navigation.inventory.itemGroups"),
          url: "inventory/item-groups",
        },
        {
          id: IDS.inventory.priceLists,
          label: t("navigation.inventory.priceLists"),
          url: "inventory/price-lists",
        },
        {
          id: IDS.inventory.adjustments,
          label: t("navigation.inventory.adjustments"),
          url: "inventory/inventory-adjustments",
        },
      ],
    },
    [IDS.main.sales]: {
      id: IDS.main.sales,
      label: t("navigation.main.sales"),
      icon: ShoppingCart,
      children: [
        {
          id: IDS.sales.customers,
          label: t("navigation.sales.customers"),
          url: "sales/customers",
        },
        {
          id: IDS.sales.orders,
          label: t("navigation.sales.orders"),
          url: "sales/sales-orders",
        },
        {
          id: IDS.sales.packages,
          label: t("navigation.sales.packages"),
          url: "sales/packages",
        },
        {
          id: IDS.sales.shipments,
          label: t("navigation.sales.shipments"),
          url: "sales/shipments",
        },
        {
          id: IDS.sales.invoices,
          label: t("navigation.sales.invoices"),
          url: "sales/invoices",
        },
        {
          id: IDS.sales.receipts,
          label: t("navigation.sales.receipts"),
          url: "sales/sales-receipts",
        },
        {
          id: IDS.sales.payments,
          label: t("navigation.sales.payments"),
          url: "sales/sales-payments-received",
        },
        {
          id: IDS.sales.returns,
          label: t("navigation.sales.returns"),
          url: "sales/sales-returns",
        },
        {
          id: IDS.sales.creditNotes,
          label: t("navigation.sales.creditNotes"),
          url: "sales/credit-notes",
        },
      ],
    },
    [IDS.main.purchases]: {
      id: IDS.main.purchases,
      label: t("navigation.main.purchases"),
      icon: Tag,
      children: [
        {
          id: IDS.purchases.vendors,
          label: t("navigation.purchases.vendors"),
          url: "purchases/vendors",
        },
        {
          id: IDS.purchases.expenses,
          label: t("navigation.purchases.expenses"),
          url: "purchases/expenses",
        },
        {
          id: IDS.purchases.orders,
          label: t("navigation.purchases.orders"),
          url: "purchases/purchases-orders",
        },
        {
          id: IDS.purchases.receives,
          label: t("navigation.purchases.receives"),
          url: "purchases/purchase-receives",
        },
        {
          id: IDS.purchases.bills,
          label: t("navigation.purchases.bills"),
          url: "purchases/bills",
        },
        {
          id: IDS.purchases.payments,
          label: t("navigation.purchases.payments"),
          url: "purchases/payments-made",
        },
        {
          id: IDS.purchases.credits,
          label: t("navigation.purchases.credits"),
          url: "purchases/vendor-credits",
        },
      ],
    },
    [IDS.main.reports]: {
      id: IDS.main.reports,
      label: t("navigation.main.reports"),
      icon: ChartColumn,
      url: "reports",
    },
  };
}

function SidebarMenuComponent({
  data,
  current,
  parent,
}: MenuItemComponentProps) {
  if (data.children) {
    return (
      <SidebarMenu>
        <Collapsible
          defaultOpen={data.id === parent}
          className={cn(
            "group/collapsible",
            data.id === parent && "text-blue-400"
          )}
          asChild
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={data.label} asChild>
                <div className="cursor-pointer">
                  {data.icon && <data.icon />}
                  <span>{data.label}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {data.children?.map((subItem) => {
                  const isCurrentSubItem = subItem.id === current;
                  return (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton
                        className={cn(
                          isCurrentSubItem &&
                            "bg-blue-400/90 text-white font-medium"
                        )}
                        aria-current={isCurrentSubItem ? "page" : undefined}
                        asChild
                      >
                        <Link to={subItem.url}>
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          className={cn(data.id === current && "bg-blue-400 text-white")}
          tooltip={data.label}
          asChild
        >
          <Link to={data.url}>
            {data.icon && <data.icon />}
            <span>{data.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default function SidebarComponent({
  currentPage,
  parentPage,
}: SidebarProps) {
  const items = useSidebarItems();

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className={cn("h-screen")}
    >
      <SidebarHeader>
        <SidebarMenu className="flex flex-row items-center justify-between border-b">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {MENU_GROUPS.map(({ items: groupItems }) => (
          <SidebarGroup key={groupItems.join("-")}>
            {groupItems.map((itemKey) => {
              const item = items[itemKey as keyof typeof items];
              if (!item) return null;

              return (
                <SidebarMenuComponent
                  key={item.id}
                  data={item}
                  current={currentPage}
                  parent={parentPage}
                />
              );
            })}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
