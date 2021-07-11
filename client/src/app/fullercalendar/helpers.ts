import {Calendar as FullCalendar} from "@fullcalendar/core";
import {FcBtnGroup, FcBtnGroupButtons} from "./types";

export enum CalendarTimeFrame {
    Month = 'Month',
    Week = 'Week'
}

export enum CalendarViewType {
    Grid = 'Grid',
    List = 'List'
}

export const calendarViews: {[key in CalendarTimeFrame]: {[key in CalendarViewType]: string}} =
{
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
 * Defines a FullCalendar button group
 * @param element HTMLElement to define a button group on. This function will apply on all FullCalendars under this element. 
 * @param buttons An enum that includes all buttons in the group. The values of the enum values are the titles.
 */
export function 
fcButtonGroup<T extends FcBtnGroupButtons>(element: HTMLElement, buttons: T): FcBtnGroup<T> {
    let selected: keyof T;

    return {
        click: (btn: keyof T) => {

            element.querySelectorAll('.fc-button').forEach((button: HTMLButtonElement) => {
                if (button.innerText === buttons[btn].toString()) {
                    button.classList.add('fc-button-active')
                } else if (Object.keys(buttons).includes(button.innerText)) {
                    button.classList.remove('fc-button-active');
                }
            });
            selected = btn;
        },
        getSelected: () => selected
    }
}




export function setEvents(calendar: FullCalendar, selectedEvents: Wcj.WcjEvent[]): void {

    // Each time I reload the calendar, I remove non-selected events and add the checked ones again
    const events = calendar.getEvents();
    const nonSelectedEvents = events.filter(e => !selectedEvents.some(se => se.id === e.groupId));
    for (const event of nonSelectedEvents) {
        event.remove();
    }

    // Find which events are selected but not yet rendered in the calendar
    const nonRenderedSelectedEvents = selectedEvents.filter(se => !events.some(e => e.groupId === se.id));
    for (const wcjEvent of nonRenderedSelectedEvents) {
        for (const occasion of wcjEvent.occasions) {
            calendar.addEvent({
                id: `${wcjEvent.id}-${occasion.start}-${occasion.end}`,
                title: wcjEvent.title,
                start: occasion.start,
                end: occasion.end,
                groupId: wcjEvent.id,
                backgroundColor: wcjEvent.bgColor, // Gives each course its own background color to better distinguish them
                borderColor: wcjEvent.bgColor,
                textColor: wcjEvent.textColor,
                extendedProps: wcjEvent
            });
        }
    }

}