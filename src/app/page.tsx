import React from "react";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

export default async function Home() {
  const session = await getServerSession(options);
  const user = session?.user as User;
  return (
    <main className="mx-5 mb-64 mt-64 flex flex-wrap justify-center text-6xl font-bold text-gray-900">
      <div className="">
        {session ? (
          <div className="">
            Hello {user?.name}, and welcome to our recipe website
          </div>
        ) : (
          <div>Hello Guest, and welcome to our recipe website</div>
        )}
      </div>
    </main>
  );
}
