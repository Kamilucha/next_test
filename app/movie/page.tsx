"use client";

import useSWR from "swr";
import { getAll } from "@/services/getAll";
import Link from "next/link";

export default function Movie() {
  const { data: movie, isLoading } = useSWR("movie", getAll);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <h2>Movie</h2>
      <ul>
        {movie.results.map((mov: any) => (
          <li key={mov.id}>
            <Link href={`/movie/${mov.id}`}>
              {mov.title ? mov.title : mov.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
