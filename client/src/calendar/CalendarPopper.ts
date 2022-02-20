import { EventApi, EventClickArg } from "@fullcalendar/react";
import { createPopper, Instance } from "@popperjs/core";
import { useRef } from "react";

const highlightClass = "bg-gray-200";
const oldZAttribute = "data-old-z";

function createTooltip(event: EventApi) {
  const tooltip = document.createElement("div");
  tooltip.appendChild(
    document.createTextNode(`${event.title}\n${event.extendedProps["place"]}`)
  );
  tooltip.className = `
      absolute z-50 rounded-md
      shadow-lg shadow-black/50
      p-2 bg-black/80 text-white leading-6 
      w-64 left-1/2 -ml-32 
      whitespace-pre overflow-hidden text-ellipsis
      `;

  return tooltip;
}

function attachTooltip(target: HTMLElement, tooltip: HTMLElement) {
  target.appendChild(tooltip);
  target.classList.add(highlightClass);

  // Store old z index on the element before setting it to 50
  target.setAttribute(oldZAttribute, target.style.zIndex);

  target.style.setProperty("z-index", "50");
  target.parentNode?.parentNode?.parentElement?.classList.add("z-50");
}

export function usePopperHandler() {
  const popper = useRef<Instance>();

  function removePopper() {
    if (!popper.current) {
      return;
    }
    const elements = popper.current.state.elements;
    const reference = elements.reference as HTMLElement;
    const tooltip = elements.popper;

    reference.classList.remove(highlightClass);
    reference.style.setProperty(
      "z-index",
      reference.getAttribute(oldZAttribute)
    );
    reference.parentNode?.parentNode?.parentElement?.classList.remove("z-50");
    tooltip.remove();
    popper.current.destroy();
  }

  function handleEventClick(fc: EventClickArg) {
    const target = fc.el.parentElement;
    if (
      (fc.view.type === "dayGridMonth" || fc.view.type === "timeGridWeek") &&
      target
    ) {
      removePopper();

      const tooltip = createTooltip(fc.event);

      attachTooltip(target, tooltip);

      popper.current = createPopper(target, tooltip, {
        placement: "bottom",
        strategy: "fixed",
      });
    } else {
      return;
    }
  }

  return { removePopper, handleEventClick };
}
