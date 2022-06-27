import { StateContext } from "@app/store/StateWrapper";
import { useContext } from "react";

interface Props {
  eventId: string;
}

export function InfoButton(props: Props) {
  const { setEventModal } = useContext(StateContext);
  return (
    <div
      data-testid="info-button"
      className="mr-2 block h-4 w-4 flex-none cursor-pointer "
      onClick={() => setEventModal?.(props.eventId)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-black opacity-50 hover:opacity-100"
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
    </div>
  );
}
