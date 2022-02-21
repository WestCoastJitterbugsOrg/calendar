import { EventApi, EventClickArg } from "@fullcalendar/react";
import { createPopper, Instance } from "@popperjs/core";
import { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { StateContext } from "../App";
import { EventActionTypes } from "../store/reducers";
import "./popper-custom.css";

const highlightClass = ["bg-wcj-coral"];

function TooltipComponent({
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
        <div>
          <strong>Title: </strong> {event.title}
        </div>
        <div>
          <strong>Time: </strong>{" "}
          {event.formatRange({
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h24",
          })}
        </div>
        <div>
          <strong>Place: </strong> {event.extendedProps["place"]}
        </div>
        <div>
          <div
            className="cursor-pointer underline mt-4 text-wcj-mint font-bold"
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

export function usePopperHandler() {
  const popper = useRef<Instance>();
  const { state, dispatch } = useContext(StateContext);

  function createTooltip(event: EventApi, target: HTMLElement) {
    const tooltipWrapper = document.createElement("div");
    const root = document.getElementById("wcjcal") || document.body;

    ReactDOM.render(
      <TooltipComponent
        event={event}
        openModal={() =>
          dispatch({
            type: EventActionTypes.eventModalRequested,
            payload: event.extendedProps.id,
          })
        }
      ></TooltipComponent>,
      tooltipWrapper
    );

    root.appendChild(tooltipWrapper);
    target.firstElementChild?.classList.add(...highlightClass);

    popper.current = createPopper(
      target,
      tooltipWrapper.firstElementChild as HTMLElement,
      {
        placement: "bottom",
        strategy: "absolute",
      }
    );
    return tooltipWrapper;
  }

  function removePopper() {
    if (!popper.current) {
      return;
    }
    const elements = popper.current.state.elements;
    const reference = elements.reference as HTMLElement;
    const tooltip = elements.popper;

    reference.firstElementChild?.classList.remove(...highlightClass);
    tooltip.remove();
    popper.current.destroy();
    document.removeEventListener("click", removePopper);
  }

  function handleEventClick(fc: EventClickArg) {
    fc.jsEvent.stopPropagation();
    if (
      (fc.view.type === "dayGridMonth" || fc.view.type === "timeGridWeek") &&
      fc.el
    ) {
      removePopper();

      createTooltip(fc.event, fc.el);

      document.addEventListener("click", removePopper);
    } else {
      return;
    }
  }

  return { removePopper, handleEventClick };
}
