"use client";

import useSWR from "swr";
import { getAll } from "@/services/getAll";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function Movie() {
  const { data: movie, isLoading } = useSWR("movie", getAll);

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <div className="section">
        <h2>Movies</h2>
        <ul>
          {movie.results.map((mov: any) => (
            <li key={mov.id}>
              <Link href={`/movie/${mov.id}`}>
                {mov.title ? mov.title : mov.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
