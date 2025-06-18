import { useTranslation } from "react-i18next";
import {
  Home,
  Warehouse,
  ShoppingCart,
  Tag,
  ChartColumn,
} from "lucide-react";
import type { MenuItemDataProps } from "@/types/sidebar";

export function useSidebarItems(): Record<string, MenuItemDataProps> {
  const { t } = useTranslation();
  
  return {
    "home": {
      id: "home",
      label: t("navigation.main.home"),
      icon: Home,
      url: "/",
    },
    "inventory": {
      id: "inventory",
      label: t("navigation.main.inventory"),
      url: "inventory",
      icon: Warehouse,
      children: [
        {
          id: "items",
          label: t("navigation.inventory.items"),
          url: "inventory/items",
        },
        {
          id: "itemGroups",
          label: t("navigation.inventory.itemGroups"),
          url: "inventory/item-groups",
        },
        {
          id: "priceLists",
          label: t("navigation.inventory.priceLists"),
          url: "inventory/price-lists",
        },
        {
          id: "adjustments",
          label: t("navigation.inventory.adjustments"),
          url: "inventory/inventory-adjustments",
        },
      ],
    },
    "sales": {
      id: "sales",
      label: t("navigation.main.sales"),
      icon: ShoppingCart,
      children: [
        {
          id: "customers",
          label: t("navigation.sales.customers"),
          url: "sales/customers",
        },
        {
          id: "orders",
          label: t("navigation.sales.orders"),
          url: "sales/sales-orders",
        },
        {
          id: "packages",
          label: t("navigation.sales.packages"),
          url: "sales/packages",
        },
        {
          id: "shipments",
          label: t("navigation.sales.shipments"),
          url: "sales/shipments",
        },
        {
          id: "invoices",
          label: t("navigation.sales.invoices"),
          url: "sales/invoices",
        },
        {
          id: "receipts",
          label: t("navigation.sales.receipts"),
          url: "sales/sales-receipts",
        },
        {
          id: "payments",
          label: t("navigation.sales.payments"),
          url: "sales/sales-payments-received",
        },
        {
          id: "returns",
          label: t("navigation.sales.returns"),
          url: "sales/sales-returns",
        },
        {
          id: "creditNotes",
          label: t("navigation.sales.creditNotes"),
          url: "sales/credit-notes",
        },
      ],
    },
    "purchases": {
      id: "purchases",
      label: t("navigation.main.purchases"),
      icon: Tag,
      children: [
        {
          id: "vendors",
          label: t("navigation.purchases.vendors"),
          url: "purchases/vendors",
        },
        {
          id: "expenses",
          label: t("navigation.purchases.expenses"),
          url: "purchases/expenses",
        },
        {
          id: "orders",
          label: t("navigation.purchases.orders"),
          url: "purchases/purchases-orders",
        },
        {
          id: "receives",
          label: t("navigation.purchases.receives"),
          url: "purchases/purchase-receives",
        },
        {
          id: "bills",
          label: t("navigation.purchases.bills"),
          url: "purchases/bills",
        },
        {
          id: "payments",
          label: t("navigation.purchases.payments"),
          url: "purchases/payments-made",
        },
        {
          id: "credits",
          label: t("navigation.purchases.credits"),
          url: "purchases/vendor-credits",
        },
      ],
    },
    "reports": {
      id: "reports",
      label: t("navigation.main.reports"),
      icon: ChartColumn,
      url: "reports",
    },
  };
} 