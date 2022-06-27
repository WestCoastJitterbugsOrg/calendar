export function ExpandIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={
        "h-4 w-4 flex-shrink-0 transform transition duration-200 " +
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
