import { EventApi, ViewApi, Calendar } from "@fullcalendar/core";
import dayjs from "dayjs";
import { FullCalendarCreator } from "../../src/app/fullercalendar/types";

const currentTime = new Date(2020, 1, 1);

export const MockFcCreator: FullCalendarCreator = (el, opts) => {
    let events: EventApi[] = [];
    let view: ViewApi = <ViewApi>{
        activeStart: currentTime,
        activeEnd: dayjs(currentTime).add(7, 'day').toDate(),
        calendar: null,
        currentStart: currentTime,
        currentEnd: dayjs(currentTime).add(7, 'day').toDate(),
        title: 'Day Grid Month',
        type: 'dayGridMonth'
    };
    return <Calendar>{
        render: () => { opts.viewDidMount({ el: el, view: view }) },
        getEvents: () => events,
        addEvent: (eventInput, _) => {
            const event = <EventApi>{
                id: eventInput.id,
                remove: () => { events = events.filter(x => x.id !== eventInput.id) }
            }
            events.push(event);
            return event;
        },
        changeView: (viewType, dateOrRange) => {
            Object.assign(view, { type: viewType })
        },

        view: view,
        getOption: (opt) => opts[opt]

    };
}
