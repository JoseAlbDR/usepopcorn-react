import ToggleBtn from "./ToggleBtn";
import { useState } from "react";
export default function MoviesBox({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleBtn isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && <MoviesList movies={movies} />}
    </div>
  );
}

function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}