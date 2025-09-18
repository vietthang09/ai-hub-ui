import { Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";

export default function HomePage() {

  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <div className="ml-72 flex-1 flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold">Home Page</h1>
      </div>
    </div>
  );
}
