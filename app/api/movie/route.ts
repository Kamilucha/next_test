import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
  const BASE_URL = "https://api.themoviedb.org/3";
  const movies = await fetch(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(movies);
}
