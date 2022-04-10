export function ExpandIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={
        "w-4 h-4 mx-2 transition duration-200 transform " +
        (open ? "rotate-45" : "")
      }
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="square" strokeWidth="4" d="M12 4v16m8-8H4" />
    </svg>
  );
}
