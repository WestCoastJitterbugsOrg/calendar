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
  const stateContext = useContext(StateContext);

  const allWcjEvents = Object.values(stateContext.events);
  const shownWcjEvents = allWcjEvents.filter((event) => event.showInCalendar);

  const shownOccasions = shownWcjEvents.flatMap((event) => event.occasions);

  const firstOccasion = Math.min(
    ...shownOccasions.map((occasion) => occasion.start.getTime())
  );
  const lastOccasion = Math.max(
    ...shownOccasions.map((occasion) => occasion.end.getTime())
  );

  const popperHandler = usePopperHandler();

  const [plugins, setPlugins] = useState([
    listPlugin,
    timeGridPlugin,
    dayGridPlugin,
  ]);

  const addPlugin = (importObject: { default: PluginDef }) => {
    setPlugins((p) => [...p, importObject.default]);
  };

  useEffect(() => {
    return () => {
      importInteraction.then((interaction) => {
        addPlugin(interaction);
      });
    };
  }, []);

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
        eventSources={shownWcjEvents.map(wcj2fcEvent)}
        eventClassNames={["bg-primary"]}
        eventBorderColor="transparent"
        eventClick={popperHandler.handleEventClick}
        selectable={false}
      />
    </div>
  );
}
