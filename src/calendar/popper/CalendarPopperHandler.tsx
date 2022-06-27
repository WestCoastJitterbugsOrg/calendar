import { appContainer } from "@app/app-container";
import { StateContext } from "@app/store/StateWrapper";
import { EventApi, EventClickArg } from "@fullcalendar/react";
import { createPopper, Instance } from "@popperjs/core";
import { useContext, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import { TooltipComponent } from "./CalendarPopper";

const highlightClass = ["bg-primary-alt"];

export function usePopperHandler() {
  const popper = useRef<Instance>();
  const { setEventModal } = useContext(StateContext);

  const root = appContainer ?? document.body;
  let tooltipWrapper: HTMLElement;
  let tooltipRoot: Root;
  let popperIsActive = false;

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
        openModal={() => setEventModal?.(event.extendedProps.id)}
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
      popperIsActive = true;
    });
  }

  function removePopper() {
    const element = getPopperInstance();
    if (!element) {
      return;
    }
    element.firstElementChild?.classList.remove(...highlightClass);
    tooltipRoot?.unmount();
    if (popper.current) {
      popper.current.destroy();
      popper.current.forceUpdate();
    }
    document.removeEventListener("click", removePopper);
    popperIsActive = false;
  }

  function getPopperInstance() {
    if (!popper.current?.state) {
      return;
    }
    const elements = popper.current.state.elements;
    return elements.reference as HTMLElement;
  }

  function handleEventClick(fc: EventClickArg) {
    fc.jsEvent.stopPropagation();
    if (fc.el) {
      if (!popperIsActive || getPopperInstance() !== fc.el) {
        removePopper();
        createTooltip(fc.event, fc.el);
        document.addEventListener("click", removePopper);
      } else {
        removePopper();
      }
    } else {
      return;
    }
  }

  return { removePopper, handleEventClick };
}
