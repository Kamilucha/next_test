import Movie from "./movie/page";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Best movies today</h1>
        <Movie />
      </div>
    </>
  );
}
