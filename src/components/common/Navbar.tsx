import { NavLink } from "react-router-dom";
import { Clock, Home, User, Users, Settings, Search, BarChart, MessageCircle, Star } from "lucide-react";
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
    return (
      <NavLink
        to={item.to!}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
            isActive
              ? "bg-black text-white"
              : "text-black hover:bg-gray-100"
          )
        }
      >
        {Icon && <Icon size={16} />}
        <span>{item.label}</span>
      </NavLink>
    );
  };

  const SoonLeaf = ({ item }: { item: NavItem }) => (
    <div
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm",
        "text-gray-400 cursor-not-allowed select-none bg-gray-50"
      )}
    >
      <div className="flex items-center gap-2">
        {(() => {
          const Icon = Icons[item.label];
          return Icon ? <Icon size={16} /> : null;
        })()}
        <span>{item.label}</span>
      </div>
      <span className="flex items-center gap-1 text-xs font-medium text-orange-500">
        <Clock size={12} /> Soon
      </span>
    </div>
  );

  const Tree = ({ items }: { items: NavItem[] }) => (
    <div className="space-y-1">
      {items.map((item) =>
        item.soon ? (
          <SoonLeaf key={item.label} item={item} />
        ) : (
          <Leaf key={item.label} item={item} />
        )
      )}
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300",
          collapsed ? "w-0 opacity-0" : "w-72 opacity-100",
          "bg-white"
        )}
      >
        {!collapsed && (
          <>
            <SidebarHeader className="px-4 py-3">
              <span className="text-base font-semibold text-gray-900">
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
            <button onClick={() => setCollapsed(!collapsed)}>☰</button>
            <h1 className="font-bold">User List</h1>
          </div>
          <ProfileDropdown />
        </header>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
