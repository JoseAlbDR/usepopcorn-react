export default function BtnToggle({ isOpen, onSetIsOpen }) {
  return (
    <>
      <button
        className="btn-toggle"
        onClick={() => onSetIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
    </>
  );
}
