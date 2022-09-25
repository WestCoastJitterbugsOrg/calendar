import { StateContext } from "@app/store/StateWrapper";
import FullCalendar, { DateInput, PluginDef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext, useEffect, useState } from "react";
import { wcj2fcEvent } from "./CalendarHelpers";
import { usePopperHandler } from "./popper/CalendarPopperHandler";
import { CalendarViewConfig } from "./views/CalendarViewConfig";

interface Props {
  initialDate?: DateInput;
}

const importInteraction = import("@fullcalendar/interaction");

export function Calendar(props: Props) {
  const { events } = useContext(StateContext);

  const allWcjEvents = Object.values(events);
  const shownWcjEvents = allWcjEvents.filter((event) => event.showInCalendar);

  const shownOccasions = shownWcjEvents.flatMap((event) => event.occasions);

  let firstOccasion = Number.MAX_SAFE_INTEGER;
  let lastOccasion = Number.MIN_SAFE_INTEGER;

  for (const occ of shownOccasions) {
    firstOccasion = Math.min(firstOccasion, occ.start.getTime());
    lastOccasion = Math.max(lastOccasion, occ.end.getTime());
  }

  const popperHandler = usePopperHandler();

  const [plugins, setPlugins] = useState([
    listPlugin,
    timeGridPlugin,
    dayGridPlugin,
  ]);

  const addPlugin = (importObject: { default: PluginDef }) => {
    setPlugins((p) => [...p, importObject.default]);
  };

  // lazy load interaction plugin to save on calendar bundle size
  useEffect(() => () => {
    void importInteraction.then(addPlugin), [];
  });

  return (
    <div className="wcjcal-fc" data-testid="fc-wrapper">
      <FullCalendar
        plugins={plugins}
        initialDate={props.initialDate}
        initialView={window.innerWidth <= 640 ? "listEternal" : "timeGridWeek"}
        height="100%"
        views={CalendarViewConfig(
          new Date(firstOccasion),
          new Date(lastOccasion)
        )}
        buttonText={{
          next: "▶",
          prev: "◀",
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
        displayEventEnd
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        eventDisplay="block"
        allDaySlot={false}
        eventSources={shownWcjEvents.map(wcj2fcEvent)}
        eventClassNames={["bg-primary"]}
        eventBorderColor="transparent"
        eventClick={popperHandler.handleEventClick}
        selectable={false}
      />
    </div>
  );
}
