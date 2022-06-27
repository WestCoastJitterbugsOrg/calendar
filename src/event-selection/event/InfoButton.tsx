interface Props {
  onClick: () => unknown;
}

export function InfoButton(props: Props) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 block h-4 w-4 flex-none cursor-pointer text-black opacity-50 hover:opacity-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
