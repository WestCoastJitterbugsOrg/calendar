import { StateContext } from "@app/store/StateWrapper";
import FullCalendar, { DateInput, PluginDef } from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useContext, useEffect, useState } from "react";
import tailwindConfig from "tailwindconfig";
import resolveConfig from "tailwindcss/resolveConfig";
import {
  TailwindValues,
  TailwindValuesColor,
} from "tailwindcss/tailwind-config";
import { wcj2fcEvent } from "./CalendarHelpers";
import { usePopperHandler } from "./popper/CalendarPopperHandler";
import { CalendarViewConfig } from "./views/CalendarViewConfig";

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme.colors as TailwindValuesColor;

interface Props {
  initialDate?: DateInput;
}

export default function Calendar({ initialDate }: Props) {
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

  const [plugins, setPlugins] = useState([listPlugin, timeGridPlugin]);

  useEffect(() => {
    const addPlugin = (importObject: { default: PluginDef }) => {
      setPlugins((p) => [...p, importObject.default]);
    };

    import("@fullcalendar/daygrid").then(addPlugin);
    import("@fullcalendar/interaction").then(addPlugin);
  }, []);

  return (
    <div className="wcjcal-fc">
      <FullCalendar
        plugins={plugins}
        initialDate={initialDate}
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
        eventBackgroundColor={colors["wcj-red"] as string}
        eventBorderColor="transparent"
        eventClick={popperHandler.handleEventClick}
        selectable={false}
      />
    </div>
  );
}
