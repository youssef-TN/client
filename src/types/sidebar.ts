import { type LucideIcon } from "lucide-react";

export interface MenuItemDataProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  url?: string;
  children?: MenuItemDataProps[];
}

export interface MenuItemComponentProps {
  data: MenuItemDataProps;
}