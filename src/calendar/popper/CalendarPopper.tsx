import { EventInfoTable } from "@app/shared/EventInfoTable/EventInfoTable";
import { EventApi, formatRange } from "@fullcalendar/react";

interface Props {
  event: EventApi;
  openModal: () => void;
}

export function TooltipComponent(props: Props) {
  return (
    <div
      id="wcj-tooltip"
      role="tooltip"
      className={`
          z-50 min-w-[300px] max-w-[350px] whitespace-pre
          rounded-md bg-dark p-2 leading-6 text-white 
          opacity-95 shadow-2xl shadow-dark
        `}
    >
      <div className="mb-1 whitespace-normal font-bold">
        {props.event.title}
      </div>
      <div className="mb-2">
        {props.event.start &&
          props.event.end &&
          formatRange(props.event.start, props.event.end, {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
      </div>
      <EventInfoTable event={props.event.extendedProps as Wcj.Event} />
      <div>
        <div
          className="mb-2 cursor-pointer text-center font-bold text-secondary-alt underline"
          onClick={props.openModal}
        >
          About event series
        </div>
      </div>
      <div
        id="wcj-arrow"
        data-popper-arrow
        className={`invisible absolute h-2 w-2 bg-inherit
           before:visible before:absolute before:h-2 before:w-2
           before:rotate-45 before:bg-inherit before:bg-dark before:content-['']
          `}
      ></div>
    </div>
  );
}
