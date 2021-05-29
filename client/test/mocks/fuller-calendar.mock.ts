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
        render: () => {

            const createFcBtn = (text: string) => {
                const btn = document.createElement('button');
                btn.classList.add('fc-button');
                btn.innerHTML = text;
                return btn;
            }

            const weekBtn = createFcBtn('Week');
            const monthBtn = createFcBtn('Month');
            const listBtn = createFcBtn('List');
            const gridBtn = createFcBtn('Grid');

            el.appendChild(weekBtn);
            el.appendChild(monthBtn);
            el.appendChild(listBtn);
            el.appendChild(gridBtn);

            opts.viewDidMount({ el: el, view: view });

        },
        getEvents: () => events,
        addEvent: (eventInput, _) => {
            const event = <EventApi>{
                groupId: eventInput.groupId,
                remove: () => { events = events.filter(x => x.groupId !== eventInput.groupId) }
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
