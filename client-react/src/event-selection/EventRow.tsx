import { Wcj } from "../types";
import EventCheckbox from "./EventCheckbox";

interface EventRowProps {
  event: Wcj.Event;
  checked: boolean;
  toggle: () => void;
}

export default function EventRow(props: EventRowProps) {

  return (
    <div
      className="flex flex-row items-center px-2 my-2"
      style={{ minHeight: "2rem" }}
      onClick={props.toggle}
    >
      <div className="h-4 w-4 mr-2 flex-none" onClick={ce => ce.stopPropagation()}>
        <InfoButton />
      </div>
      <div className="flex-grow cursor-pointer pr-2 leading-tight">{props.event.title}</div>
      <div className="flex-none cursor-pointer">
        <EventCheckbox color={props.event.color} checked={props.checked} />
      </div>
    </div>
  );
}


function InfoButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="text-black opacity-50 hover:opacity-100 cursor-pointer"
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
