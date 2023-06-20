import { useState, useEffect } from "react";

export function useLocalStorageState() {
  const [watched, setWatched] = useState(function () {
    const load = JSON.parse(localStorage.getItem("watched"));
    return load;
  });
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  return { watched, setWatched };
}
