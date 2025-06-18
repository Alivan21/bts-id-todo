import { NotebookTabs, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ROUTES } from "./routes";

export interface SidebarSubItem {
  title: string;
  href: string;
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  items?: SidebarSubItem[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: "To Do List",
    href: ROUTES.DASHBOARD,
    icon: NotebookTabs,
  },
];
