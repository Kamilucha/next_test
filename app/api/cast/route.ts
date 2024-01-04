import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const API_KEY = "4d36de3fb8d01d2841da81446387c2b5";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fullURL = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;

  try {
    const response = await fetch(fullURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    res.status(200).json({ cast: data.cast });
  } catch (error) {
    console.error("Error fetching cast:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
