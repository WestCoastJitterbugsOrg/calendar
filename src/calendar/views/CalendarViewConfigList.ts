import {
  EventMountArg,
  formatDate,
  VerboseFormattingArg,
  ViewMountArg,
} from "@fullcalendar/react";
import { ViewOptions } from "./CalendarViewConfig";

function listDaySideFormat(args: VerboseFormattingArg) {
  return (
    formatDate(args.date.marker, { weekday: "long" }) +
    ", Week " +
    formatDate(args.date.marker, { week: "numeric" })
  );
}

let hasScrolledIntoView = false;

function viewDidMount(mountArg: ViewMountArg) {
  const currTime = new Date().getTime();

  const nextEvent = mountArg.view.calendar
    .getEvents()
    .sort((a, b) => {
      if (a?.start == null && b.start == null) {
        return 0;
      } else if (a?.start == null) {
        return -1;
      } else if (b.start == null) {
        return 1;
      } else {
        return a.start.getTime() - b.start.getTime();
      }
    })
    .find((x) => x.start && currTime <= x.start.getTime());

  if (nextEvent != null) {
    const eventStr = nextEvent.start?.toISOString().slice(0, 10);
    const eventEl = mountArg.el.querySelector(`[data-date="${eventStr}"]`);
    const scrollContainer =
      eventEl?.parentElement?.parentElement?.parentElement;

    if (scrollContainer && !hasScrolledIntoView) {
      setTimeout(() => {
        const scrollContainerTop = scrollContainer?.getBoundingClientRect().top;
        const eventTop = eventEl?.getBoundingClientRect().top;
        scrollContainer.scrollTop = eventTop - scrollContainerTop;
        hasScrolledIntoView = true;
      });
    }
  }

  return mountArg.el.parentElement?.parentElement
    ?.querySelectorAll<HTMLElement>(
      ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
    )
    .forEach((toolbarChunk) => {
      toolbarChunk.style.width = "0";
      toolbarChunk.style.height = "0";
    });
}

function eventDidMount(e: EventMountArg) {
  // Add place info to events
  const title = e.el.querySelector<HTMLElement>(".fc-list-event-title");
  const place = e.el.querySelector<HTMLElement>(".fc-list-event-place");
  if (title != null && place == null) {
    title.outerHTML = `
        <td class="fc-list-event-title">${e.event.title}</td>
        <td class="fc-list-event-place text-right">${e.event.extendedProps["place"]}</td>
    `;
  }
  // Change colspan of day header
  const prevSibling = e.el.previousElementSibling;
  if (prevSibling?.classList.contains("fc-list-day")) {
    prevSibling
      .getElementsByTagName("th")
      .item(0)
      ?.setAttribute("colspan", "5");
  }
}

function viewWillUnmount(mountArg: ViewMountArg) {
  hasScrolledIntoView = false;
  return mountArg.el.parentElement?.parentElement
    ?.querySelectorAll<HTMLElement>(
      ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
    )
    .forEach((toolbarChunk) => {
      toolbarChunk.style.width = "auto";
      toolbarChunk.style.height = "auto";
    });
}

export default function createListEternal(start: Date, end: Date): ViewOptions {
  return {
    type: "list",
    listDaySideFormat,
    listDayFormat: { month: "long", day: "numeric", year: "numeric" },
    buttonIcons: false,
    viewDidMount,
    viewWillUnmount,
    eventDidMount,
    visibleRange: () => ({
      start: start,
      end: end,
    }),
  };
}
