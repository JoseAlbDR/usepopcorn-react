import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
          );
          if (!res.ok)
            throw new Error("Something happened while fetching data.");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          setMovie(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage msg={error} />}
      {!isLoading && !error && (
        <Details
          movie={movie}
          onCloseMovie={onCloseMovie}
          onAddWatched={onAddWatched}
        />
      )}
    </>
  );
}

function Details({ movie, onCloseMovie, onAddWatched }) {
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>

      <header>
        <img src={poster} alt={poster} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐{imdbRating} IMDb rating</span>
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
          <button className="btn-add" onClick={() => onAddWatched(movie)}>
            + Add to list
          </button>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
