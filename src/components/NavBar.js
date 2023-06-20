import { useRef } from "react";
import { useKey } from "../hooks/useKey";

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

export function Search({ onSearch, query, onSetQuery }) {
  const inputEl = useRef(null);

  // useKey hook to write directly in Search input when pressing any key
  useKey("", function () {
    if (document.activeElement === inputEl) return;
    inputEl.current.focus();
  });

  function onSubmit(e) {
    e.preventDefault();
    onSearch(query);
    onSetQuery("");
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onSetQuery(e.target.value)}
        ref={inputEl}
      />
      <span>
        <button className="search-btn">🔍</button>
      </span>
    </form>
  );
}
