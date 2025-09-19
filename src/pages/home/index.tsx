import { Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";

export default function HomePage() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Navbar />

      <Toaster position="top-right" />

      <div className="flex flex-col h-full p-4"></div>
    </div>
  );
}
