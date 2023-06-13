export default function ToggleBtn({ isOpen, onSetIsOpen }) {
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
