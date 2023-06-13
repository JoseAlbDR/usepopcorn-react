import ToggleBtn from "./ToggleBtn";
import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleBtn isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
