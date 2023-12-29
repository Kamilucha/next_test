import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
  const BASE_URL = "https://api.themoviedb.org/3";

  //   return NextResponse.json({ data: "asfds" });

  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  const fullURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
  console.log("0");

  try {
    const response = await fetch(fullURL);
    console.log("1111111");
    console.log(response);
    console.log("1111111");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("2");

    const data = response.json();

    console.log(data);
    console.log("4");

    return NextResponse.json(response);
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
};
