import { useState } from "react";
export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{!movies ? 0 : movies.length}</strong> results
    </p>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setQuery("");
    onSearch(query);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span>
        <button className="search-btn">🔍</button>
      </span>
    </form>
  );
}
