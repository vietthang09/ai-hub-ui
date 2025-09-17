import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { ChevronRight } from "lucide-react";

type NavItem = {
  label: string;
  to?: string;
  children?: NavItem[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/home" },
  { label: "Profile", to: "/profile" },
  {
    label: "User",
    children: [
      { label: "User List", to: "/usertable" },
      // { label: "Invite User", to: "/usertable?view=invite" },
      // { label: "Roles & Permissions", to: "/roles" },
    ],
  },
];

export default function Navbar() {
  const Leaf = ({ item }: { item: NavItem }) => (
    <li>
      <NavLink
        to={item.to!}
        className={({ isActive }) =>
          [
            "block rounded-md px-3 py-2 text-sm",
            isActive
              ? "bg-gray-400 text-white"
              : "text-gray-600 hover:bg-gray-100",
          ].join(" ")
        }
      >
        {item.label}
      </NavLink>
    </li>
  );

  const Branch = ({ item }: { item: NavItem }) => (
    <li>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100">
          <span>{item.label}</span>
          <span className="transition-transform group-open:rotate-90">
            <ChevronRight size={14} />
          </span>
        </summary>
        <ul className="mt-1 space-y-1 pl-4">
          {item.children!.map((child) =>
            child.children ? (
              <Branch key={child.label} item={child} />
            ) : (
              <Leaf key={child.label} item={child} />
            )
          )}
        </ul>
      </details>
    </li>
  );

  const Tree = ({ items }: { items: NavItem[] }) => (
    <ul className="space-y-1">
      {items.map((item) =>
        item.children ? (
          <Branch key={item.label} item={item} />
        ) : (
          <Leaf key={item.label} item={item} />
        )
      )}
    </ul>
  );

  return (
    <aside
      className="
        fixed inset-y-0 left-0 z-40
        w-72 bg-white border-r shadow-sm
      "
      aria-label="Sidebar Navigation"
    >
      <div className="h-full flex flex-col">
         <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-base font-semibold text-gray-900">
            Navigation
          </span>
        </div>

         <nav className="px-3 py-3 overflow-y-auto flex-1">
          <Tree items={NAV_ITEMS} />
        </nav>

         <div className="border-t px-4 py-3">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
