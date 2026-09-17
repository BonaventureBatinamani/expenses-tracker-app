import { logout } from "../lib/action";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400">
        Sign out
      </button>
    </form>
  );
}