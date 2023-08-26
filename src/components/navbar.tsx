import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";

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
    <nav className="border-gray-200 bg-gray-900 py-6 ">
      <div className="container mx-auto flex items-center justify-center">
        <ul className="flex flex-wrap gap-10 px-10 text-4xl text-slate-100">
          <li className="">
            <Link href="/">Home</Link>
          </li>
          <li className="">
            <Link href="/create-recipe">Create Recipe</Link>
          </li>
          <li className="">
            <Link href="/saved-recipes">Saved Recipe</Link>
          </li>
          <li className="">
            {!session ? (
              <Link href="/api/auth/signin">Login</Link>
            ) : (
              <Link href="/api/auth/signout">Logout</Link>
            )}
          </li>
          <li>
            {session && (
              <Image
                src={user?.image as string}
                alt={user?.name as string}
                width={50}
                height={50}
                className="rounded-sm"
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
