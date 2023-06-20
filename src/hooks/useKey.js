import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase() || key === "") {
          callback();
        }
      }
      //Attach
      document.addEventListener("keydown", callBack);
      //UnAttach
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [callback, key]
  );
}
