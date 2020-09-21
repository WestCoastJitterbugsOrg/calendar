import { CalendarButtonCategory, CalendarTimeFrame, CalendarViewType, MyEvent } from "./types";
import { Calendar as FullCalendar, EventInput } from '@fullcalendar/core';
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

type FullCalendarHandler = {
    getCalendar: () => FullCalendar;
    getTimeFrame: () => CalendarTimeFrame;
    getViewType: () => CalendarViewType;
    changeView: () => void;
    setEvents: (_: MyEvent[]) => void;
    setup: (_: HTMLElement) => void;
}

export function toFcEvent(gcEvent: MyEvent): EventInput {

    return {
        id: gcEvent.id,
        title: gcEvent.summary,
        start: gcEvent.start.dateTime,
        end: gcEvent.end.dateTime,
        groupId: gcEvent.summary,
        backgroundColor: gcEvent.bgColor, // Gives each course its own background color to better distinguish them
        borderColor: gcEvent.bgColor,
        textColor: gcEvent.textColor
    }
}

export default function FullCalendarFactory(): FullCalendarHandler {
    let calendar: FullCalendar;
    let currentCalendarTimeFrame: CalendarTimeFrame = 'Month';
    let currentCalendarViewType: CalendarViewType = 'Grid';

    function changeCalendarView() {
        const timeFrame = calendarViews[currentCalendarTimeFrame]
        const newView = timeFrame && timeFrame[currentCalendarViewType];
        if (!newView) {
            alert(`Unexpected view ${currentCalendarTimeFrame} ${currentCalendarViewType}. Contact Jean-Philippe!`);
            return;
        } else {
            calendar.changeView(newView);
        }
    }

    function reloadCalendar(selectedEvents: MyEvent[]) {

        // Each time I reload the calendar, I remove all old events and add the checked ones again
        for (const event of calendar.getEvents()) {
            event.remove();
        }


        for (const event of selectedEvents) {
            calendar.addEvent(toFcEvent(event));
        }

        calendar.render();

    }

    function setupFullCalendar(calendarEl: HTMLElement) {
        let isInited = false;

        // Select one button and deselect the other (Used for month/week and grid/list switches)
        const handleCustomClickEvent = (select: CalendarTimeFrame | CalendarViewType,
            deselect: CalendarTimeFrame | CalendarViewType,
            category: CalendarButtonCategory) => {
            if (category === "TimeFrame") {
                currentCalendarTimeFrame = select as CalendarTimeFrame;
            } else if (category === "ViewType") {
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

        // Setup calendar
        calendar = new FullCalendar(calendarEl, {
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
            headerToolbar: { center: 'myMonth,myWeek myGrid,myList', end: 'prev,next' },
            nowIndicator: true,
            aspectRatio: 2,
            initialView: 'dayGridMonth',
            firstDay: 1, // Monday
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false,

            }
        });

        calendar.render();
    }

    return {
        getCalendar: () => calendar,
        getTimeFrame: () => currentCalendarTimeFrame,
        getViewType: () => currentCalendarViewType,
        changeView: changeCalendarView,
        setEvents: reloadCalendar,
        setup: setupFullCalendar
    }
}