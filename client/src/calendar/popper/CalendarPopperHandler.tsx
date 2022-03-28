import { StateContext } from "@app/App";
import { EventActionTypes } from "@app/store";
import { EventApi, EventClickArg } from "@fullcalendar/react";
import { createPopper, Instance } from "@popperjs/core";
import { useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { TooltipComponent } from "./CalendarPopper";

const highlightClass = ["bg-wcj-coral"];

export function usePopperHandler() {
    const popper = useRef<Instance>();
    const { dispatch } = useContext(StateContext);
  
    const root = document.getElementById("wcjcal") || document.body;
  
    function createTooltip(event: EventApi, target: HTMLElement) {
      const tooltipWrapper = document.createElement("div");
      root.appendChild(tooltipWrapper);
      ReactDOM.render(
        <TooltipComponent
          event={event}
          openModal={() =>
            dispatch({
              type: EventActionTypes.eventModalRequested,
              payload: event.extendedProps.id,
            })
          }
        />,
        tooltipWrapper
      );
  
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
      if (["dayGridMonth", "timeGridWeek"].includes(fc.view.type) && fc.el) {
        removePopper();
        createTooltip(fc.event, fc.el);
        document.addEventListener("click", removePopper);
      } else {
        return;
      }
    }
  
    return { removePopper, handleEventClick };
  }