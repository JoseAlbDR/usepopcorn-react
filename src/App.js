import { useEffect, useState } from "react";
import NavBar, { NumResults, Search } from "./NavBar";
import MoviesList from "./MovieList";
import WatchedList, { WatchedSummary, WatchedMoviesList } from "./WatchedList";
import MovieDetail from "./MovieDetail";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Box from "./Box";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleAddWatched(movie) {
    if (!watched.some((mov) => mov.imdbID === movie.imdbID))
      setWatched((watched) => [...watched, movie]);
  }

  async function handleSearch(query) {
    try {
      setIsLoading(true);

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );

      if (!response.ok)
        throw new Error("Something went wrong with fetching movies.");
      const data = await response.json();
      console.log(data);
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

  return (
    <>
      <NavBar>
        <Search onSearch={handleSearch} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box  element={ <MoviesList movies={movies}  />} /> */}
        {/* <Box
          element={
            <WatchedList>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </WatchedList>
          }
        /> */}
        {/* <Box>{isLoading ? <Loader /> : <MoviesList movies={movies} />}</Box> */}
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
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} />
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
