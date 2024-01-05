"use client";

type CastProps = {
  params: {
    id: string | number;
  };
};

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Cast = ({ params: { id } }: CastProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cast, setCast] = useState<
    | {
        cast_id: number;
        name: string;
        profile_path: string;
        character: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    getCastById(id);
  }, [id]);

  const getCastById = async (id: any) => {
    try {
      const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
      const BASE_URL = "https://api.themoviedb.org/3";
      const response = await fetch(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch movie.");
      }

      const castData = await response.json();

      setCast(castData.cast);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <>
      <div>
        <h2>Cast:</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...sliderSettings} className={styles.slider}>
            {cast &&
              cast.map(({ cast_id, profile_path, name, character }) => (
                <div key={cast_id} className={styles.cast_item}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                    alt="cast"
                  />
                  <p>{name}</p>
                  <p>Character: {character}</p>
                </div>
              ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export { Cast };
