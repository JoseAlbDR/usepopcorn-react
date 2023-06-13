import BtnToggle from "./BtnToggle";

export default function MoviesList({ onSetIsOpen, isOpen, movies }) {
  return (
    <div className="box">
      <BtnToggle isOpen={isOpen} onSetIsOpen={onSetIsOpen} />
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
