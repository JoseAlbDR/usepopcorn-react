import { useState } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSearch() {
    try {
      // Guard clasue if query is empty
      if (!query) return;

      // Loading spiner to true
      setIsLoading(true);

      // Close previous opened movie
      callback?.();

      // Fetch data from API
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
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

  return { movies, isLoading, error, handleSearch };
}
