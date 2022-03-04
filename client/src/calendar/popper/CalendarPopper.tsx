import { EventApi } from "@fullcalendar/react";
import EventInfoTable from "../../shared/EventInfoTable/EventInfoTable";
import "./popper-custom.css";

export function TooltipComponent({
  event,
  openModal,
}: {
  event: EventApi;
  openModal: () => void;
}) {
  return (
    <>
      <div
        id="wcj-tooltip"
        role="tooltip"
        className={`
          z-50 rounded-md shadow-2xl shadow-wcj-black
          p-2 bg-wcj-black opacity-95 text-white leading-6 
          min-w-[250px] whitespace-pre
        `}
      >
        <EventInfoTable event={event.extendedProps as Wcj.Event} />
        <div>
          <div
            className="cursor-pointer underline mb-2 text-center text-wcj-mint font-bold"
            onClick={openModal}
          >
            About event series
          </div>
        </div>
        <div
          id="wcj-arrow"
          data-popper-arrow
          className={`absolute w-2 h-2 bg-inherit invisible
           before:absolute before:w-2 before:h-2 before:bg-inherit
           before:visible before:content-[''] before:rotate-45 before:bg-wcj-black
          `}
        ></div>
      </div>
    </>
  );
}
