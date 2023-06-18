import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

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
        <Details movie={movie} onCloseMovie={onCloseMovie} />
      )}
    </>
  );
}

function Details({ movie, onCloseMovie }) {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>

      <header>
        <img src={movie.Poster} alt={movie.Poster} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐{movie.imdbRating} IMDb rating</span>
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}
