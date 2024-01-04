"use client";

type CastProps = {
  params: {
    id: number;
  };
};

import { useEffect, useState } from "react";

const Cast = ({ params: { id } }: CastProps) => {
  const [cast, setCast] = useState<{
    id: number;
    title: string;
    profile_path: string;
    vote_average: number;
    overview: string;
    tagline: string;
  } | null>(null);

  console.log(cast);
  useEffect(() => {
    const getCastById = async (id: any) => {
      try {
        const resp = await fetch(`/api/cast/${id}`);
        const data = await resp.json();
        setCast(data.cast);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    getCastById(id);
  }, [id]);
  return (
    <>
      <div>
        {/* <h2>Cast:</h2>
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
};

export { Cast };
