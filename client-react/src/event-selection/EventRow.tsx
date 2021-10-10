import { Wcj } from "../types";
import EventCheckbox from "./EventCheckbox";
import InfoButton from "./InfoButton";

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
