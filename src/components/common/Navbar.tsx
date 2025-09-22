import { NavLink } from "react-router-dom";
import {
  Clock,
  Home,
  User,
  Users,
  Settings,
  Search,
  BarChart,
  MessageCircle,
  Star,
  Menu,
} from "lucide-react";
import { SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { ProfileDropdown } from "../../pages/users/components/ProfileDropdown";

type NavItem = {
  label: string;
  to?: string;
  children?: NavItem[];
  soon?: boolean;
};

const Icons: Record<string, React.ElementType> = {
  Home: Home,
  Profile: User,
  Users: Users,
  "Booking Pulse": BarChart,
  "Persona Finder": Search,
  "Dynamic Pricing": Settings,
  "SEO Optimization": Star,
  "Meeting Assistant": MessageCircle,
  "Chat Bot": MessageCircle,
  "Google Review": Star,
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/home" },
  { label: "Profile", to: "/profile" },
  { label: "Users", to: "/users" },
  { label: "Booking Pulse", soon: true },
  { label: "Persona Finder", soon: true },
  { label: "Dynamic Pricing", soon: true },
  { label: "SEO Optimization", soon: true },
  { label: "Meeting Assistant", soon: true },
  { label: "Chat Bot", soon: true },
  { label: "Google Review", soon: true },
];

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const Leaf = ({ item }: { item: NavItem }) => {
    const Icon = Icons[item.label];

    if (item.soon) {
      return (
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm",
            "text-gray-400 cursor-not-allowed select-none"
          )}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} />}
            <span>{item.label}</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-orange-500">
            <Clock size={12} /> Soon
          </span>
        </div>
      );
    }

    return (
      <NavLink
        to={item.to!}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
            isActive
              ? "bg-secondary/50 text-secondary"
              : "text-white hover:bg-secondary/30"
          )
        }
      >
        {Icon && <Icon size={16} />}
        <span>{item.label}</span>
      </NavLink>
    );
  };

  const Tree = ({ items }: { items: NavItem[] }) => (
    <div className="space-y-1">
      {items.map((item) => (
        <Leaf key={item.label} item={item} />
      ))}
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "w-0 opacity-0" : "w-72 opacity-100",
          "bg-primary"
        )}
      >
        {!collapsed && (
          <>
            <SidebarHeader className="px-4 py-3">
              <span className="text-base font-semibold text-white">
                Navigation
              </span>
            </SidebarHeader>

            <SidebarContent className="px-3 py-3 overflow-y-auto">
              <Tree items={NAV_ITEMS} />
            </SidebarContent>

            <SidebarFooter className="px-4 py-3"></SidebarFooter>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 transition-all duration-300">
        <header className="flex items-center justify-between p-3 relative">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="border border-gray-700 rounded p-1 text-white"
            >
              <Menu size={14} />
            </button>
            <h1 className="font-bold text-white">User List</h1>
          </div>
          <ProfileDropdown />
        </header>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
