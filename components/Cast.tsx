"use client";

type CastProps = {
  params: {
    id: string | number;
  };
};

import { useEffect, useState } from "react";

const Cast = ({ params: { id } }: CastProps) => {
  const [cast, setCast] = useState<{
    cast_id: number;
    name: string;
    profile_path: string;
    vote_average: number;
    overview: string;
    tagline: string;
  } | null>(null);

  useEffect(() => {
    const getCastById = async (id: any) => {
      try {
        const resp: any = await fetch(`/api/cast/${id}`);
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await resp.json();
        setCast(data.cast);
        console.log(resp);
      } catch (error) {
        console.log("Error fetching cast:", error);
      }
    };

    getCastById(id);
  }, [id]);

  // console.log(cast);
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
