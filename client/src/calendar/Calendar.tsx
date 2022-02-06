import FullCalendar, {
  EventInput,
  EventSourceInput,
} from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/common";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useRef } from "react";
import { StateContext } from "../App";
import "./fullcalendar-custom.css";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import { TailwindValues } from "tailwindcss/tailwind-config";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable

const fullConfig = resolveConfig(tailwindConfig);

type FullCalendarPropType = typeof FullCalendar.prototype.props;

const CalendarViewConfig = (
  start: Date,
  end: Date
): FullCalendarPropType["views"] => {
  return {
    dayGridMonth: {
      titleFormat: { year: "numeric", month: "long" },
      dayHeaderFormat: { weekday: "long" },
    },
    timeGridWeek: {
      scrollTimeReset: false,
      scrollTime: "09:00:00",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
        hour12: false,
      },
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
        document
          .querySelectorAll<HTMLElement>(
            ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
          )
          .forEach((toolbarChunk) => {
            toolbarChunk.style.width = "0";
            toolbarChunk.style.height = "0";
          });
      },
      viewWillUnmount: () => {
        document
          .querySelectorAll<HTMLElement>(
            ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(-n+2)"
          )
          .forEach((toolbarChunk) => {
            toolbarChunk.style.width = "auto";
            toolbarChunk.style.height = "auto";
          });
      },
      eventDidMount: (e) => {
        // Add place info to events
        const title = e.el.querySelector(".fc-list-event-title");
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

function getEventRange(events: Wcj.Event[]) {
  const firstOccasion = Math.min(
    ...events.flatMap((event) =>
      event.occasions.map((occ) => occ.start.getTime())
    )
  );
  const lastOccasion = Math.max(
    ...events.flatMap((event) =>
      event.occasions.map((occ) => occ.end.getTime())
    )
  );

  return [firstOccasion, lastOccasion];
}

export default function Calendar() {
  const stateContext = React.useContext(StateContext);
  const wcjEvents = Object.values(stateContext.state.events.byId).filter(
    (event) => event.showInCalendar
  );
  const [firstOccasion, lastOccasion] = getEventRange(wcjEvents);

  const selected = useRef<Element>();
  const tooltip = useRef<HTMLDivElement>();
  return (
    <div className="wcjcal-fc">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
        initialView={
          window.innerWidth <=
          parseInt((fullConfig.theme.screens as TailwindValues)?.["sm"])
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
        eventSources={wcjEvents.map(wcj2fcEvent)}
        eventBackgroundColor="#AB2814"
        eventBorderColor="#AB2814"
        eventClick={(fc) => {
          if (
            (fc.view.type === "dayGridMonth" ||
              fc.view.type === "timeGridWeek") &&
            fc.el.parentNode
          ) {
            if (selected.current && selected?.current !== fc.el) {
              selected.current.classList.remove("bg-gray");
              selected.current.parentElement?.style.setProperty("z-index", "1");
              selected.current?.parentNode?.parentNode?.parentElement?.style.setProperty(
                "z-index",
                "1"
              );
              tooltip.current?.remove();
            }
            selected.current = fc.el;
            selected.current.parentElement?.style.setProperty("z-index", "10");
            selected.current?.parentNode?.parentNode?.parentElement?.style.setProperty(
              "z-index",
              "10"
            );
            tooltip.current = document.createElement("div");
            tooltip.current.appendChild(
              document.createTextNode(
                `${fc.event.title}\n${fc.event.extendedProps["place"]}`
              )
            );
            tooltip.current.className =
              "absolute p-2 bg-black/80 text-white rounded-md z-50 leading-6 w-64 left-1/2 -ml-32 shadow-lg shadow-black/50 whitespace-pre overflow-hidden text-ellipsis ";
            selected?.current.parentNode?.appendChild(tooltip.current);
          } else {
            return;
          }
        }}
        selectable={false}
        dateClick={() => {
          selected.current?.classList.remove("bg-gray");
          selected.current?.parentElement?.style.setProperty("z-index", "1");
          selected.current?.parentNode?.parentNode?.parentElement?.style.setProperty(
            "z-index",
            "1"
          );
          tooltip.current?.remove();
        }}
      />
    </div>
  );
}

function wcj2fcEvent(wcjEvent: Wcj.Event): EventSourceInput {
  return {
    id: wcjEvent.id,
    events: wcjEvent.occasions.map(
      (occasion): EventInput => ({
        id: `${wcjEvent.id}-${occasion.start}-${occasion.end}`,
        title: wcjEvent.title,
        start: occasion.start,
        end: occasion.end,
        groupId: wcjEvent.id,
        extendedProps: wcjEvent,
      })
    ),
  };
}
