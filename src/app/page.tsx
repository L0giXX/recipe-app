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

  const TextReveal = () => {
    if (session) {
      const text = `Hello ${user?.name}, and welcome to our recipe website`;
      return (
        <h1 className="mx-2 overflow-hidden text-4xl font-bold text-gray-900">
          {text.match(/./gu)!.map((char, index) => (
            <span
              className="inline-block animate-text-reveal [animation-fill-mode:backwards]"
              key={`${char}-${index}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      );
    }
    const text = "Hello, and welcome to our recipe website";
    return (
      <h1 className="overflow-hidden text-2xl font-bold leading-6 text-gray-900">
        {text.match(/./gu)!.map((char, index) => (
          <span
            className="inline-block animate-text-reveal [animation-fill-mode:backwards]"
            key={`${char}-${index}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <main className="my-52 flex justify-center">
      <TextReveal />
    </main>
  );
}
