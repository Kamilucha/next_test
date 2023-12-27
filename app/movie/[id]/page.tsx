"use client";

type Props = {
  params: {
    id: string;
  };
};

type Genre = {
  id: number;
  name: string;
};

import { useEffect, useState } from "react";

export default function Card({ params: { id } }: Props) {
  const [movie, setMovie] = useState<{
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    genres: Genre[];
    overview: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
        const BASE_URL = "https://api.themoviedb.org/3";
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch movie.");
        }

        const movieData = await response.json();
        console.log(movieData);
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log(movie);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movie data: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data available.</div>;
  }

  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
    : "";

  const persentageRate = Math.round((movie.vote_average / 10) * 100);

  const movieGenres =
    movie.genres && movie.genres.length >= 1
      ? movie.genres.map((genre) => genre.name).join(", ")
      : "No genres";

  return (
    <>
      <div>
        <img src={img} alt="movie" />
        <p>{movie.title}</p>
        <p>User Score: {persentageRate}%</p>

        <h3>Owerview</h3>
        <p>{movie.overview}</p>

        <h3>Genres</h3>
        <p>{movieGenres}</p>
      </div>
    </>
  );
}
