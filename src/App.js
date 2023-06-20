import { useEffect, useState } from "react";
import NavBar, { NumResults, Search } from "./components/NavBar";
import MoviesList from "./components/MovieList";
import WatchedList, {
  WatchedSummary,
  WatchedMoviesList,
} from "./components/WatchedList";
import MovieDetail from "./components/MovieDetails";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import ToggleBtn from "./ToggleBtn";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState(function () {
    const load = JSON.parse(localStorage.getItem("watched"));
    return load;
  });

  // Close movie by seting selectedId to null
  function handleCloseMovie() {
    setSelectedId(null);
  }

  // If selectedId is same as id close, if not set to id
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  // Add a new movie to watched list
  function handleAddWatched(movie) {
    if (!watched.some((mov) => mov.imdbID === movie.imdbID))
      setWatched((watched) => [...watched, movie]);
  }

  // Update movie userRating
  function handleUpdateWatched(imdbID, rating) {
    setWatched((watched) =>
      watched.map((watched) =>
        watched.imdbID === imdbID ? { ...watched, userRating: rating } : watched
      )
    );
  }

  // Delete a movie from watched list
  function handleDeleteWatched(imdbID) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== imdbID));
  }

  // Function for search eventlistener in navBar
  async function handleSearch(query) {
    try {
      // Guard clasue if query is empty
      if (!query) return;

      // Loading spiner to true
      setIsLoading(true);

      // Close previous opened movie
      handleCloseMovie();

      // Fetch data from API
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      // Error handling if bad response
      if (!response.ok)
        throw new Error("Something went wrong with fetching movies.");
      const data = await response.json();

      // Error handling if no/bad data
      if (data.Response === "False") throw new Error(data.Error);
      setMovies(data.Search);
      setError("");
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <NavBar>
        <Search onSearch={handleSearch} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              selectedId={selectedId}
              onSelectMovie={handleSelectMovie}
              movies={movies}
            />
          )}
          {!isLoading && error && <ErrorMessage msg={error} />}
          {!isLoading && !error && movies.length === 0 && (
            <ErrorMessage msg="🔍 Try to search any movie :)" />
          )}
        </Box>

        <Box>
          <WatchedList>
            {selectedId ? (
              <MovieDetail
                watched={watched}
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                onUpdateWatched={handleUpdateWatched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onSelectMovie={handleSelectMovie}
                  onDeleteMovie={handleDeleteWatched}
                />
              </>
            )}
          </WatchedList>
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleBtn isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
