import ToggleBtn from "./ToggleBtn";
import { useState } from "react";
export default function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleBtn isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

export function MoviesList({ children }) {
  return <ul className="list">{children}</ul>;
}

export function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
