import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
      </div>
    </div>
  );
}
