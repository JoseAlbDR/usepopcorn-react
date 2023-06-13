export default function Summary({ avgs, watched }) {
  return (
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
    </div>
  );
}
