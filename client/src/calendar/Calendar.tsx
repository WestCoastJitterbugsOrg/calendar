import FullCalendar, {
  EventInput,
  EventSourceInput,
} from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/common";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext } from "react";
import { StateContext } from "../App";
import "./fullcalendar-custom.css";

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
      dayHeaderFormat: { weekday: "long" },
    },
    timeGridWeek: {
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
          ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(2)"
        ).hide();
      },
      viewWillUnmount: () => {
        jQuery(
          ".fc-header-toolbar.fc-toolbar .fc-toolbar-chunk:nth-child(2)"
        ).show();
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
  const stateContext = useContext(StateContext);
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
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
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
    />
  );
}

function wcj2fcEvent(wcjEvent: Wcj.Event): EventSourceInput {
  return {
    id: wcjEvent.id,
    backgroundColor: wcjEvent.color,
    borderColor: wcjEvent.color,
    textColor: brightnessByColor(wcjEvent.color) > 127 ? "black" : "white",
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

/**
 * Calculate brightness value by RGB or HEX color.
 * @param color (String) The color value in RGB or HEX (for example: #000000 || #000 || rgb(0,0,0) || rgba(0,0,0,0))
 * @returns (Number) The brightness value (dark) 0 ... 255 (light)
 */
function brightnessByColor(color: string) {
  const isHEX = color.indexOf("#") === 0;
  const isRGB = color.indexOf("rgb") === 0;

  let rgb: [number, number, number] | undefined;

  if (isHEX) {
    const m = color
      .substr(1)
      .match(color.length === 7 ? /(\S{2})/g : /(\S{1})/g);
    if (m) {
      rgb = [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)];
    }
  }
  if (isRGB) {
    const m = color.match(/(\d+){3}/g);
    if (m) {
      rgb = [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
    }
  }
  if (rgb != null) {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  } else {
    return 255;
  }
}
