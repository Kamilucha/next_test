import Link from "next/link";

const TheHeader = () => {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
    </header>
  );
};

export { TheHeader };
