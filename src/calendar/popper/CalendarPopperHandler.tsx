import { appContainer } from "@app/.";
import { StateContext } from "@app/App";
import { EventApi, EventClickArg } from "@fullcalendar/react";
import { createPopper, Instance } from "@popperjs/core";
import { useContext, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { TooltipComponent } from "./CalendarPopper";

const highlightClass = ["bg-wcj-coral"];

export function usePopperHandler() {
  const popper = useRef<Instance>();
  const { dispatch } = useContext(StateContext);

  const root = appContainer || document.body;
  let tooltipWrapper: HTMLElement;
  let tooltipRoot: Root;

  function createTooltip(event: EventApi, target: HTMLElement) {
    if (tooltipWrapper == null) {
      tooltipWrapper = document.createElement("div");
    }
    if (!root.contains(tooltipWrapper)) {
      root.appendChild(tooltipWrapper);
    }

    tooltipRoot = createRoot(tooltipWrapper);

    tooltipRoot.render(
      <TooltipComponent
        event={event}
        openModal={() =>
          dispatch({
            type: "eventModalRequested",
            payload: event.extendedProps.id,
          })
        }
      />
    );

    target.firstElementChild?.classList.add(...highlightClass);

    setTimeout(() => {
      popper.current = createPopper(
        target,
        tooltipWrapper.firstElementChild as HTMLElement,
        {
          placement: "bottom",
          strategy: "absolute",
        }
      );
    });
  }

  function removePopper() {
    if (!popper.current) {
      return;
    }
    const elements = popper.current.state.elements;
    const reference = elements.reference as HTMLElement;

    reference.firstElementChild?.classList.remove(...highlightClass);
    tooltipRoot?.unmount();
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
