import FullCalendar, {
  EventInput,
  EventSourceInput,
  ToolbarInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { formatDate } from "@fullcalendar/common";
import "./fullcalendar-custom.css";
import { StateContext } from "../App";
import { useContext } from "react";
import { Wcj } from "../types";

type FullCalendarPropType = typeof FullCalendar.prototype.props;

const CalendarViewConfig: FullCalendarPropType["views"] = {
  dayGridMonth: {
    eventDidMount: (e) =>
      (e.el.title =
        e.event.title + "\nPlace: " + e.event.extendedProps["place"]),
    titleFormat: { year: "numeric", month: "long" },
  },
  timeGridWeek: {
    titleFormat: (args) =>
      `Week ${formatDate(args.date.marker, { week: "numeric" })}, 
      ${formatDate(args.date.marker, {
        year: "numeric",
        month: "long",
      })}`,
    dayHeaderFormat: {
      weekday: "short",
      day: "2-digit",
      month: "short"
    },
  },
  listEternal: {
    type: "list",
    titleFormat: { year: "numeric", month: "long" },
    visibleRange: (currentDate) => ({
      start: currentDate,
      end: new Date(currentDate).setFullYear(currentDate.getFullYear() + 1),
    }),
    viewDidMount: function () {
      if (this) {
        (this.headerToolbar as ToolbarInput).center = "";
      }
    },
  },
};

export default function Calendar() {
  const stateContext = useContext(StateContext);
  const events = Object.values(stateContext.state.events.byId)
    .filter((event) => event.showInCalendar)
    .map(wcj2fcEvent);
  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      height="100vh"
      views={CalendarViewConfig}
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
