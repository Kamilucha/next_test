"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      console.log("1");
      const response: any = await axios.get(`/api/moviequery?query=${query}`);
      // console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(response);

      console.log(data);
      setMovies(data);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <>
      <h1>Movies</h1>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={() => handleSearch()}>Search</button>
        <ul>
          {movies.map((movie: any) => (
            <li key={movie.id}>
              <Link href={`/movies/`}>{}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
