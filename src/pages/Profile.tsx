import LogoutButton from "../components/LogoutButton";

export default function Profile() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      <LogoutButton />
    </div>
  );
}
