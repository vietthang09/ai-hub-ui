import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
<form
  onSubmit={handleSubmit}
  className="relative w-80 max-w-md group"
>
  {/* Icon */}
  <Search
    size={16}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white pointer-events-none"
  />

  {/* Input */}
<Input
  placeholder="Search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="
    pl-10 
    text-gray-400 
    placeholder:text-gray-400 
    group-hover:text-white 
    group-hover:placeholder:text-white
    border border-gray-500
    focus:ring-0 
    focus:outline-none 
   "
/>


  {/* Shortcut key */}
  <kbd
    className="bg-muted pointer-events-none absolute end-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border border-gray-400 px-1.5 font-mono text-[10px] mt-1 font-medium opacity-100 select-none sm:flex"
  >
    <span className="text-xs text-gray-400 group-hover:text-white">⌘</span>
    <span className="text-xs text-gray-400 group-hover:text-white">K</span>
  </kbd>
</form>

  );
}
