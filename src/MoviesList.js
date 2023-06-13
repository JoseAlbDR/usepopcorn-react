import BtnToggle from "./BtnToggle";
import { useState } from "react";
export default function MoviesList({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <BtnToggle isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <li key={movie.imdbID}>
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
