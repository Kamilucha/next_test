export const getAll = async () => {
  const response = await fetch("/api/movie");

  if (!response.ok) throw new Error("Unable to fetch posts.");

  return response.json();
};
