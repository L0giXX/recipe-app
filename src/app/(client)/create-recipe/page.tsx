import React from "react";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Forms from "./forms";

async function CreateRecipe() {
  const session = await getServerSession(options);
  return (
    <>{session ? <Forms /> : redirect("/api/auth/signin?callbackUrl=/")}</>
  );
}

export default CreateRecipe;
