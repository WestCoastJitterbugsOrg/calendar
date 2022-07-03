import {
  EventApi,
  EventMountArg,
  formatDate,
  VerboseFormattingArg,
  ViewMountArg,
} from "@fullcalendar/react";
import { ViewOptions } from "./CalendarViewConfig";

function byStartTime(a: EventApi, b: EventApi) {
  if (a.start == null) {
    return -1;
  } else if (b.start == null) {
    return 1;
  } else {
    return a.start.getTime() - b.start.getTime();
  }
}

function viewDidMount(mountArg: ViewMountArg) {
  // In the listview, we want to scroll down to the next visible event if possible.
  // 1. We first find the next event in the EventApi array
  // 2. Then we find the header element that corresponds to that event
  // 3. Finally we compare the position of the event header element to that of the scroll container
  //    and set the scrollcontainer's position to that of the event header element

  const currTime = new Date().getTime();

  const nextEvent = mountArg.view.calendar
    .getEvents()
    .sort(byStartTime)
    .find((event) => event.start && currTime <= event.start.getTime());

  if (nextEvent != null) {
    const eventStr = nextEvent.start?.toISOString().slice(0, 10);
    const eventEl = mountArg.el.querySelector(`[data-date="${eventStr}"]`);
    const scrollContainer =
      eventEl?.parentElement?.parentElement?.parentElement;

    if (scrollContainer) {
      const scrollContainerTop = scrollContainer?.getBoundingClientRect().top;
      const eventTop = eventEl?.getBoundingClientRect().top;

      // React often takes us here twice, and the calculation of getBoundingClientRect
      // goes wrong and we don't end up where we want.
      // To combat this, we check that the scroll hasn't already been set
      // and then use setTimeout to cause a javascript tick. I hope to find a better solution
      // going forward. Using react-big-calendar instead of fullcalendar should make this
      // easier.

      if (eventTop - scrollContainerTop > 0) {
        setTimeout(() => {
          scrollContainer.scrollTop = eventTop - scrollContainerTop;
        });
      }
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
  return mountArg.el.parentElement?.parentElement
    ?.querySelectorAll<HTMLElement>(
      ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
    )
    .forEach((toolbarChunk) => {
      toolbarChunk.style.width = "auto";
      toolbarChunk.style.height = "auto";
    });
}

function listDaySideFormat(args: VerboseFormattingArg) {
  return (
    formatDate(args.date.marker, { weekday: "long" }) +
    ", Week " +
    formatDate(args.date.marker, { week: "numeric" })
  );
}

export function createListEternal(start: Date, end: Date): ViewOptions {
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
