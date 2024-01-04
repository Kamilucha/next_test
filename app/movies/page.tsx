"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response: any = await fetch(`/api/moviequery?query=${query}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { results } = await response.json();

      if (results) {
        setMovies(results);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  if (!movies) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <div className="container">
        <h1>Find your movie 🔍 </h1>
        <div className="section">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
          />
          <ul>
            {movies.map((movie: any) => (
              <li key={movie.id}>
                <Link href={`/movie/${movie.id}`}>
                  {movie.title ?? movie.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
