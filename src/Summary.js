import { useState } from "react";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Summary({ avgs, isOpen }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      {isOpen && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <SummaryItem icon={"#️⃣"}>{watched.length} movies</SummaryItem>
              <SummaryItem icon={"⭐️"}>{avgImdbRating}</SummaryItem>
              <SummaryItem icon={"🌟"}>{avgUserRating}</SummaryItem>
              <SummaryItem icon={"⏳"}>{avgRuntime}min</SummaryItem>
            </div>
          </div>
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <SummaryItem icon={"⭐️"}>{movie.imdbRating}</SummaryItem>
            <SummaryItem icon={"🌟"}>{movie.userRating}</SummaryItem>
            <SummaryItem icon={"⏳"}>{movie.runtime} min</SummaryItem>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SummaryItem({ children, icon }) {
  return (
    <p>
      <span>{icon}</span>
      <span>{children}</span>
    </p>
  );
}
