import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext } from "react";
import { StateContext } from "../App";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import {
  TailwindValues,
  TailwindValuesColor,
} from "tailwindcss/tailwind-config";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import { CalendarViewConfig } from "./CalendarViewConfig";
import { usePopperHandler } from "./CalendarPopper";
import { wcj2fcEvent } from "./CalendarHelpers";
import "./fullcalendar-custom.css";

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme.colors as TailwindValuesColor;

export default function Calendar() {
  const stateContext = useContext(StateContext);
  const wcjEvents = Object.values(stateContext.state.events.byId).filter(
    (event) => event.showInCalendar
  );

  const allEvents = wcjEvents.flatMap((event) => event.occasions);

  const firstOccasion = Math.min(...allEvents.map((o) => o.start.getTime()));
  const lastOccasion = Math.max(...allEvents.map((o) => o.end.getTime()));

  const popperHandler = usePopperHandler();

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
        eventDisplay="block"
        allDaySlot={false}
        eventSources={wcjEvents.map(wcj2fcEvent)}
        eventBackgroundColor={colors["wcj-red"] as string}
        eventBorderColor="transparent"
        eventClick={popperHandler.handleEventClick}
        selectable={false}
      />
    </div>
  );
}
