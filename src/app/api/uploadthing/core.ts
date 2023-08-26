import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

const f = createUploadthing();

async function handleAuth() {
  const session = await getServerSession(options);
  if (!session?.user?.name) throw new Error("Unauthorized");
  return { user: session.user.name };
}

export const ourFileRouter = {
  recipeImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
