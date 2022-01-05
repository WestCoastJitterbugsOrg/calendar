import FullCalendar, {
  EventInput,
  EventSourceInput,
} from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/common";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import { StateContext } from "../App";
import "./fullcalendar-custom.css";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import { TailwindValues } from "tailwindcss/tailwind-config";

const fullConfig = resolveConfig(tailwindConfig);

type FullCalendarPropType = typeof FullCalendar.prototype.props;

const CalendarViewConfig = (
  start: Date,
  end: Date
): FullCalendarPropType["views"] => {
  return {
    dayGridMonth: {
      eventDidMount: (e) =>
        (e.el.title =
          e.event.title + "\nPlace: " + e.event.extendedProps["place"]),
      titleFormat: { year: "numeric", month: "long" },
      dayHeaderFormat: { weekday: "long" }
    },
    timeGridWeek: {
      scrollTimeReset: false,
      scrollTime: '09:00:00',
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
        hour12: false,
      },
      eventDidMount: (e) =>
        (e.el.title =
          e.event.title + "\nPlace: " + e.event.extendedProps["place"]),
      titleFormat: (args) =>
        `Week ${formatDate(args.date.marker, { week: "numeric" })}, 
          ${formatDate(args.date.marker, {
            year: "numeric",
            month: "long",
          })}`,
      dayHeaderFormat: (args) =>
        formatDate(args.date.marker, { weekday: "long" }) +
        "\n" +
        formatDate(args.date.marker, { day: "numeric" }),
    },
    listEternal: {
      type: "list",
      listDaySideFormat: (args) =>
        formatDate(args.date.marker, { weekday: "long" }) +
        ", Week " +
        formatDate(args.date.marker, { week: "numeric" }),
      listDayFormat: { month: "long", day: "numeric", year: "numeric" },

      buttonIcons: false,

      viewDidMount: () => {
        jQuery(
          ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
        ).css({
          visibility: "hidden",
          width: "0",
          height: "0",
        });
      },
      viewWillUnmount: () => {
        jQuery(
          ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
        ).css({
          visibility: "visible",
          width: "auto",
          height: "auto",
        });
      },
      eventDidMount: (e) => {
        // Add place info to events
        const title = jQuery(e.el).find(".fc-list-event-title").get(0);
        if (title != null) {
          title.outerHTML = `
            <td class="fc-list-event-title">${e.event.title}</td>
            <td class="text-right">${e.event.extendedProps["place"]}</td>
           `;
        }
        // Change colspan of day header
        const prevSibling = e.el.previousElementSibling;
        if (prevSibling?.classList.contains("fc-list-day")) {
          prevSibling
            .getElementsByTagName("th")
            .item(0)
            ?.setAttribute("colspan", "4");
        }
      },
      visibleRange: function () {
        return {
          start: start,
          end: end,
        };
      },
    },
  };
};

export default function Calendar() {
  const stateContext = React.useContext(StateContext);
  const wcjEvents = Object.values(stateContext.state.events.byId).filter(
    (event) => event.showInCalendar
  );
  const events = wcjEvents.map(wcj2fcEvent);
  const firstOccasion = Math.min(
    ...wcjEvents.flatMap((event) =>
      event.occasions.map((occ) => new Date(occ.start).getTime())
    )
  );
  const lastOccasion = Math.max(
    ...wcjEvents.flatMap((event) =>
      event.occasions.map((occ) => new Date(occ.end).getTime())
    )
  );
  return (
    <div className="wcjcal-fc">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        initialView={
          window.innerWidth <=
          parseInt((fullConfig.theme.screens as TailwindValues)["sm"])
            ? "listEternal"
            : "timeGridWeek"
        }
        height="100%"
        views={CalendarViewConfig(
          new Date(firstOccasion),
          new Date(lastOccasion)
        )}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          list: "List",
        }}
        headerToolbar={{
          start: "today,prev,next",
          center: "title",
          end: "timeGridWeek,dayGridMonth,listEternal",
        }}
        firstDay={1}
        nowIndicator
        timeZone="UTC"
        displayEventEnd
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        allDaySlot={false}
        eventSources={events}
        eventBackgroundColor="#AB2814"
        eventBorderColor="#AB2814"
      />
    </div>
  );
}

function wcj2fcEvent(wcjEvent: Wcj.Event): EventSourceInput {
  return {
    id: wcjEvent.id,
    events: wcjEvent.occasions.map<EventInput>((occasion) => ({
      id: `${wcjEvent.id}-${occasion.start}-${occasion.end}`,
      title: wcjEvent.title,
      start: occasion.start,
      end: occasion.end,
      groupId: wcjEvent.id,
      extendedProps: wcjEvent,
    })),
  };
}
