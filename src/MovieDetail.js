import { useEffect, useState } from "react";
export default function MovieDetail({ selectedId }) {
  const [movie, setMovie] = useState(null);
  useEffect(
    () =>
      async function () {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
          );
          const data = await res.json();
          console.log(data);
          setMovie(data);
        } catch (err) {
          console.log(err.message);
        }
      }[movie]
  );

  return <div className="details">{selectedId}</div>;
}
