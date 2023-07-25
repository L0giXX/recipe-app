import React from "react";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Forms from "./forms";

async function CreateRecipe() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <Forms user={session.user} />
      ) : (
        <div>
          <h1>Access Denied</h1>
        </div>
      )}
    </>
  );
}

export default CreateRecipe;
