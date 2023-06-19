import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  onUpdateWatched,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

  // Close movie details with Esc key
  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      //Attach
      document.addEventListener("keydown", callBack);
      //UnAttach
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onCloseMovie]
  );

  // Effect to fetch data when a movie from the movie list is selected
  useEffect(
    function () {
      // Abort controller to abort fetching data if movies are clicked too fast
      const controller = new AbortController();

      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something happened while fetching data.");
          const data = await res.json();
          if (data.Response === "False") throw new Error(data.Error);
          const foundMovie = watched.find(
            (movie) => movie.imdbID === selectedId
          );
          foundMovie
            ? (data.rating = foundMovie.userRating)
            : (data.rating = 0);
          setMovie(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      getMovieDetails();

      return function () {
        controller.abort();
      };
    },
    [selectedId, watched]
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
          onUpdateWatched={onUpdateWatched}
          imdbID={selectedId}
        />
      )}
    </>
  );
}

function Details({
  movie,
  onCloseMovie,
  onAddWatched,
  onUpdateWatched,
  imdbID,
}) {
  const [userRating, setUserRating] = useState(0);

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
    rating,
  } = movie;

  function handleAddUpdate() {
    const newWatchedMovie = {
      imdbID,
      imdbRating: +imdbRating,
      title,
      year,
      poster,
      runtime: +runtime.split(" ").at(0),
      userRating: userRating,
    };

    rating > 0 && userRating !== rating
      ? onUpdateWatched(imdbID, userRating)
      : onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function handleSetRating(rating) {
    setUserRating(rating);
  }

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      //Cleanup Function
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

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
          <StarRating
            maxRating={10}
            size={24}
            onSetRating={handleSetRating}
            defaultRating={rating}
          />
          <button className="btn-add" onClick={handleAddUpdate}>
            {rating > 0 ? "Modify Rating" : "+ Add to list"}
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
