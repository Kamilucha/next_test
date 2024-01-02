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
import Link from "next/link";
import styles from "./styles.module.css";

export default function Card({ params: { id } }: Props) {
  const [movie, setMovie] = useState<{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genres: Genre[];
    overview: string;
    tagline: string;
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
    return (
      <div className="container">
        Information about the movie will be available soon.
      </div>
    );
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
      <div className="container">
        <Link href={"/movie"}>Back to movies</Link>
        <div className={styles.movie_card}>
          <img src={img} alt="movie" />
          <div>
            <h2 className={styles.title}>{movie.title}</h2>
            <p className={styles.description}>{movie.tagline}</p>

            <h3 className={styles.title_desc}>User Score:</h3>
            <p className={styles.description}>{persentageRate}%</p>

            <h3 className={styles.title_desc}>Owerview</h3>
            <p className={styles.description}>{movie.overview}</p>

            <h3 className={styles.title_desc}>Genres</h3>
            <p className={styles.description}>{movieGenres}</p>
          </div>
        </div>
      </div>
    </>
  );
}
