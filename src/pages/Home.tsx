import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  // const { selectedUser, fetchUserInfo, loading } = useUserStore();

  // useEffect(() => {
  //   fetchUserInfo().catch((err: any) => {
  //     console.error(err);
  //     toast.error(
  //       err?.response?.data?.error || err?.message || "Failed to fetch user"
  //     );
  //   });
  // }, [fetchUserInfo]);

  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <div className="flex flex-col flex-1 items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Home Page</h1>

        {/* {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : selectedUser ? (
          <>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className="text-lg">Welcome, {selectedUser.role}</p>
            <p className="text-sm text-gray-600">Email: {selectedUser.email}</p>
          </>
        ) : (
          <p className="text-red-500">No user data</p>
        )} */}
      </div>
    </div>
  );
}
