import { CalendarButtonCategory, CalendarTimeFrame, CalendarViewType, WcjEvent } from "./types";
import { Calendar as FullCalendar, CalendarOptions, EventInput } from '@fullcalendar/core';

import DayGridPlugin from '@fullcalendar/daygrid';
import ListPlugin from '@fullcalendar/list';
import TimeGridPlugin from '@fullcalendar/timegrid';

const calendarViews = {
    'Month': {
        'Grid': 'dayGridMonth',
        'List': 'listMonth'
    },
    'Week': {
        'Grid': 'timeGridWeek',
        'List': 'listWeek'
    }
}

/** 
 * @param calendarEl The HTMLElement that the FullCalendar will be rendered on.
 */
type FullCalendarHandler = {
    getCalendar: () => FullCalendar;
    getTimeFrame: () => CalendarTimeFrame;
    getViewType: () => CalendarViewType;
    changeView: () => void;
    setEvents: (_: WcjEvent[]) => void;
}

export function toFcEvent(gcEvent: WcjEvent): EventInput {

    return {
        id: gcEvent.id,
        title: gcEvent.title,
        start: gcEvent.start,
        end: gcEvent.end,
        groupId: gcEvent.title,
        backgroundColor: gcEvent.bgColor, // Gives each course its own background color to better distinguish them
        borderColor: gcEvent.bgColor,
        textColor: gcEvent.textColor
    }
}

// A type that describes a function that creates a FullCalendar. See below for more info
export type FullCalendarCreator = (el: HTMLElement, optionOverrides?: CalendarOptions) => FullCalendar;
type FullCallendarHandlerCreator = { createHandler: (el: HTMLElement) => FullCalendarHandler };

// Default for dependency injection into FullCalendarFactory below
const defaultFCCreator: FullCalendarCreator =
    (el: HTMLElement, optionOverrides: CalendarOptions) =>
        new FullCalendar(el, optionOverrides);

/**
 * Initiates a FullCalendar and returns relevant handler methods for it
 * @param fcCreator A function that creates a FullCalendar given a HTMLElement and some options.
 * We use Dependency Injection to simplify testing. 
 * Normally, this will be the 2 parameter FullCalendar constructor.
 */
export default function FullCalendarHandlerFactory(fcCreator: FullCalendarCreator = defaultFCCreator) : FullCallendarHandlerCreator {
    let isInited = false;
    let currentCalendarTimeFrame: CalendarTimeFrame = 'Month';
    let currentCalendarViewType: CalendarViewType = 'Grid';

    return {
        createHandler: calendarEl => {
            // Select one button and deselect the other (Used for month/week and grid/list switches)
            const handleCustomClickEvent = (select: CalendarTimeFrame | CalendarViewType,
                deselect: CalendarTimeFrame | CalendarViewType,
                category: CalendarButtonCategory) => {
                if (category === 'TimeFrame') {
                    currentCalendarTimeFrame = select as CalendarTimeFrame;
                } else if (category === 'ViewType') {
                    currentCalendarViewType = select as CalendarViewType;
                }
                calendarEl.querySelectorAll('.fc-button').forEach((button: HTMLButtonElement) => {
                    if (button.innerText === select) {
                        button.classList.add('fc-button-active')
                    } else if (button.innerText === deselect) {
                        button.classList.remove('fc-button-active');
                    }
                });

                changeCalendarView();
            }

            const createCustomButton = (buttonName: CalendarTimeFrame | CalendarViewType,
                deselect: CalendarTimeFrame | CalendarViewType,
                category: CalendarButtonCategory) => {
                return {
                    text: buttonName,
                    click: () => handleCustomClickEvent(buttonName, deselect, category)
                }
            }

            const calendar = fcCreator(calendarEl, {
                plugins: [DayGridPlugin, ListPlugin, TimeGridPlugin],
                customButtons: {
                    myMonth: createCustomButton("Month", "Week", "TimeFrame"),
                    myWeek: createCustomButton("Week", "Month", "TimeFrame"),
                    myGrid: createCustomButton("Grid", "List", "ViewType"),
                    myList: createCustomButton("List", "Grid", "ViewType")
                },
                viewDidMount: () => {
                    if (!isInited) {
                        handleCustomClickEvent("Month", "Week", "TimeFrame");
                        handleCustomClickEvent("Grid", "List", "ViewType");
                        isInited = true;
                    }
                },
                headerToolbar: { start: 'myMonth,myWeek', center: 'prev,title,next', end: 'myGrid,myList' },
                nowIndicator: true,
                initialView: 'dayGridMonth',
                firstDay: 1, // Monday
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false,
                    hour12: false
                }
            });

            const changeCalendarView = () => {
                const timeFrame = calendarViews[currentCalendarTimeFrame]
                const newView = timeFrame && timeFrame[currentCalendarViewType];
                if (!newView) {
                    alert(`Unexpected view ${currentCalendarTimeFrame} ${currentCalendarViewType}. Contact Jean-Philippe!`);
                    return;
                } else {
                    calendar.changeView(newView);
                }
            }

            const reloadCalendar = (selectedEvents: WcjEvent[]) => {

                // Each time I reload the calendar, I remove all old events and add the checked ones again
                for (const event of calendar.getEvents()) {
                    event.remove();
                }


                for (const event of selectedEvents) {
                    calendar.addEvent(toFcEvent(event));
                }

                calendar.render();

            }

            calendar.render();

            return {
                getCalendar: () => calendar,
                getTimeFrame: () => currentCalendarTimeFrame,
                getViewType: () => currentCalendarViewType,
                changeView: changeCalendarView,
                setEvents: reloadCalendar
            }
        }
    }
}