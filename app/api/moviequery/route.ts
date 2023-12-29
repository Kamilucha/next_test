import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
  const BASE_URL = "https://api.themoviedb.org/3";

  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  const fullURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await fetch(fullURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};
