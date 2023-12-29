import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authConfig);
  return (
    <>
      <h1>Profile of {session?.user?.name}</h1>
    </>
  );
}
