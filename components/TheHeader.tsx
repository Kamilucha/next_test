"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const TheHeader = () => {
  const session = useSession();

  console.log(session);

  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      {session?.data && <Link href="/profile">Profile</Link>}
      {session?.data ? (
        <Link
          href="#"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign Out
        </Link>
      ) : (
        <Link href="/api/auth/signin">SignIn</Link>
      )}
    </header>
  );
};

export { TheHeader };
