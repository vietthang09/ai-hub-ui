import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-200 p-4 flex justify-between items-center shadow">
      <div className="flex space-x-4">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
        <Link to="/usertable" className="hover:underline">
          User
        </Link>
      </div>
      <LogoutButton />
    </nav>
  );
}
