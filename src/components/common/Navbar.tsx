import { NavLink, useLocation } from "react-router-dom";
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
import { ProfileDropdown } from "./ProfileDropdown";

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
  {
    label: "General",
    children: [
      { label: "Home", to: "/home" },
      { label: "Profile", to: "/profile" },
      { label: "Users", to: "/users" },
    ],
  },
  {
    label: "AI",
    children: [
      { label: "Booking Pulse", to: "/booking-pulse" },
      { label: "Persona Finder", soon: true },
      { label: "Dynamic Pricing", soon: true },
      { label: "SEO Optimization", soon: true },
      { label: "Meeting Assistant", to: "/meeting-assistant" },
      { label: "Chat Bot", to: "/chat-bot" },
      { label: "Google Review", to: "/google-review" },
    ],
  },
];


export default function Navbar({ children }: { children?: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentLabel =
    NAV_ITEMS.find((item) => item.to === location.pathname)?.label ?? "Demo UI";

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
  <div className="space-y-4">
    {items.map((group) => (
      <div key={group.label}>
        <div className="px-3 py-1 text-xs font-semibold uppercase text-gray-400">
          {group.label}
        </div>
        <div className="space-y-1 mt-1">
          {group.children?.map((item) => (
            <Leaf key={item.label} item={item} />
          ))}
        </div>
      </div>
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
              <span className="text-base font-semibold text-white">AI Hub</span>
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
            <h1 className="font-bold text-white">{currentLabel}</h1>
          </div>
          <ProfileDropdown />
        </header>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
