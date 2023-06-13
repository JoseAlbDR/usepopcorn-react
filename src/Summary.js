export default function Summary({ avgs, watched, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgs.avgImdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgs.avgUserRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgs.avgRuntime} min</span>
            </p>
          </div>
          <WatchedMoviesList watched={watched} />
        </div>
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
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
