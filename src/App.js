import { useState } from "react";
import NavBar, { NumResults, Search } from "./components/NavBar";
import MoviesList from "./components/MovieList";
import WatchedList, {
  WatchedSummary,
  WatchedMoviesList,
} from "./components/WatchedList";
import MovieDetail from "./components/MovieDetails";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import ToggleBtn from "./components/ToggleBtn";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // useMovies hook to searching for movies
  const { movies, handleSearch, isLoading, error } = useMovies(
    query,
    handleCloseMovie
  );

  // Local Storage hook to save and load movies from local storage
  const { value: watched, setValue: setWatched } = useLocalStorageState(
    [],
    "watched"
  );

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
  function handleUpdateWatched(imdbID, rating, countRating) {
    setWatched((watched) =>
      watched.map((watched) =>
        watched.imdbID === imdbID
          ? {
              ...watched,
              userRating: rating,
              countRatingDecisions: countRating,
            }
          : watched
      )
    );
  }

  // Delete a movie from watched list
  function handleDeleteWatched(imdbID) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== imdbID));
  }

  return (
    <>
      <NavBar>
        <Search onSearch={handleSearch} query={query} onSetQuery={setQuery} />
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
