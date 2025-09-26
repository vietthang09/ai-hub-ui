import { useEffect, useState } from "react";
 import type { UserItem } from "../../services/auth/types";
import { useUserContext } from "../../context/user-context";
import { deleteUser, getUsers } from "../../services/auth/userService";
import { Button } from "../../components/ui/button";
import UserRow from "./components/UserRow";
import UserDialogs from "./components/UserDialogs";
import SearchBar from "../../components/common/SearchBar";
import Navbar from "../../components/common/Navbar";
import { MailPlus, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import Pagination from "./components/Pagination";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { setModalType, setUser, reload } = useUserContext();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setUsers(data.reverse());
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const handleDelete = async (email: string) => {
    try {
      await deleteUser(email);
      toast.success("User deleted!");
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.role?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex h-screen w-full bg-primary">
      <Navbar>
 
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center -mt-4 mb-6">
            <SearchBar onSearch={setSearchQuery} />

            <div className="flex gap-2">
              <Button
                className="space-x-1 border text-white bg-primary"
                variant={"outline"}
              >
                <span>Invite User</span> <MailPlus size={18} />
              </Button>
              <Button
                variant={"outline"}
                className="bg-blue-100 text-primary space-x-1"
                onClick={() => setModalType("add")}
              >
                <span>Add User</span> <UserPlus size={18} />
              </Button>
            </div>
          </div>

          <div className="flex-1 p-2 border border-gray-700 rounded-lg">
            {loading ? (
              <p className="text-white">Loading users...</p>
            ) : filteredUsers.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-b border-gray-700">
                      {/* <Th className="px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </Th> */}
                      <TableHead className="px-4 py-2 text-center">#</TableHead>
                      <TableHead className=" px-4 py-2 text-center">
                        Name
                      </TableHead>
                      <TableHead className=" px-4 py-2 text-center">
                        Email
                      </TableHead>
                      <TableHead className=" px-4 py-2 text-center">
                        Role
                      </TableHead>
                      <TableHead className=" px-4 py-2 text-center">
                        Status
                      </TableHead>
                      <TableHead className=" px-4 py-2 text-center"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user, index) => (
                      <UserRow
                        key={user.email}
                        index={index}
                        email={user.email}
                        role={user.role || "user"}
                        onEdit={() => {
                          setUser(user);
                          setModalType("edit");
                        }}
                        onDelete={() => handleDelete(user.email)}
                      />
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  totalItems={filteredUsers.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                />{" "}
              </>
            ) : (
              <p className="text-red-500">No users found</p>
            )}
          </div>
        </div>

        <UserDialogs />
      </Navbar>
    </div>
  );
}
