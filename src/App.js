import { useEffect, useState } from "react";
import NavBar, { NumResults, Search } from "./NavBar";
import MoviesList from "./MovieList";
import WatchedList, { WatchedSummary, WatchedMoviesList } from "./WatchedList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Box from "./Box";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(function () {
  //   fetch(
  //     `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search))
  //     .catch((err) => console.log(err.message));
  // }, []);
  // useEffect(
  //   () =>
  //     async function () {
  //       const response = await fetch(
  //         `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=interstellar`
  //       );
  //       const data = await response.json();
  //       setMovies(data.Search);
  //     },
  //   []
  // );

  async function handleSearch(query) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
      );
      console.log(response);
      if (!response.ok)
        throw new Error("Something went wrong with fetching movies.");

      const data = await response.json();
      if (data.Response === "False") throw new Error(data.Error);
      setMovies(data.Search);
      setIsLoading(false);
      setError("");
    } catch (err) {
      setIsLoading(true);
      console.log(err.message);
      setError(err.message);
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
          {!isLoading && !error && <MoviesList movies={movies} />}
          {!isLoading && error && <ErrorMessage msg={error} />}
        </Box>

        <Box>
          <WatchedList>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </WatchedList>
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
