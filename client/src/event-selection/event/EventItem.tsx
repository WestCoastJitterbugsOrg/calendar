import EventCheckbox from "./EventCheckbox";
import { InfoButton } from "./InfoButton";

interface EventRowProps {
  event: Wcj.Event;
  checked: boolean;
  toggle: () => void;
  showInfo: () => void;
}

export default function EventItem(props: EventRowProps) {

  return (
    <>
      <div
        className="flex flex-row items-center px-2 my-2 min-h-8"
        onClick={props.toggle}
      >
        <div className="h-4 w-4 mr-2 flex-none" onClick={props.showInfo}>
          <InfoButton />
        </div>
        <div className="flex-grow cursor-pointer pr-2 leading-tight">
          {props.event.title}
        </div>
        <div className="flex flex-none cursor-pointer">
          <EventCheckbox color="wcj-red" checked={props.checked} />
        </div>
      </div>
    </>
  );
}

