import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

export default async function Navbar() {
  const session = await getServerSession(options);
  const user = session?.user as User;

  return (
    <header className="flex h-16 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <PocketKnifeIcon className="h-6 w-6" />
        <span className="sr-only">Recipe App</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>

        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/create-recipe"
        >
          Create
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/saved-recipes"
        >
          Recipes
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          About
        </Link>
        {!session ? (
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/api/auth/signin"
          >
            <LogIn className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/api/auth/signout"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        )}
      </nav>
    </header>
  );
}

function PocketKnifeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
      <path d="M18 6h.01" />
      <path d="M6 18h.01" />
      <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
      <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
    </svg>
  );
}
