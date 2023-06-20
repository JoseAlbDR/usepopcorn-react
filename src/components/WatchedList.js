const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedList({ children }) {
  return <>{children}</>;
}

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <SummaryItem icon={"#️⃣"}>{watched.length} movies</SummaryItem>
        <SummaryItem icon={"⭐️"}>{avgImdbRating.toFixed(2)}</SummaryItem>
        <SummaryItem icon={"🌟"}>{avgUserRating.toFixed(2)}</SummaryItem>
        <SummaryItem icon={"⏳"}>{Math.round(avgRuntime)}min</SummaryItem>
      </div>
    </div>
  );
}

export function WatchedMoviesList({ watched, onSelectMovie, onDeleteMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onSelectMovie, onDeleteMovie }) {
  return (
    <div>
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <SummaryItem icon={"⭐️"}>{movie.imdbRating}</SummaryItem>
          <SummaryItem icon={"🌟"}>{movie.userRating}</SummaryItem>
          <SummaryItem icon={"⏳"}>{movie.runtime} min</SummaryItem>
        </div>
      </li>
      <button
        className="btn-delete"
        onClick={() => onDeleteMovie(movie.imdbID)}
      >
        ❌
      </button>
    </div>
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
