import { EventApi, ViewApi, Calendar } from "@fullcalendar/core";
import dayjs from "dayjs";
import { FullCalendarCreator } from "~app/fullercalendar/types";


export function MockFcCreator(currentTime: Date): FullCalendarCreator {
    return (el, opts) => {
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
}