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
    <main className="flex flex-wrap text-6xl font-bold text-gray-900 justify-center mt-64 mb-64 mx-5">
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
