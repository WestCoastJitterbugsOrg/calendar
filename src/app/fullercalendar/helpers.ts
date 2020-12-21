import { Calendar as FullCalendar } from "@fullcalendar/core";
import { WcjEvent } from "../event/types";
import { FcBtnGroup, FcBtnGroupButtons } from "./types";

export enum CalendarTimeFrame {
    Month = 'Month',
    Week = 'Week'
}

export enum CalendarViewType {
    Grid = 'Grid',
    List = 'List'
}

export const calendarViews: { [key in CalendarTimeFrame]: { [key in CalendarViewType]: string } } =
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
export function fcButtonGroup<T extends FcBtnGroupButtons>(element: HTMLElement, buttons: T): FcBtnGroup<T> {
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




export function setEvents(calendar: FullCalendar, selectedEvents: WcjEvent[]): void {

    // Each time I reload the calendar, I remove all old events and add the checked ones again
    const events = calendar.getEvents();
    console.log(events)
    for (const event of events) {
        event.remove();
    }


    for (const gcEvent of selectedEvents) {
        calendar.addEvent({
            id: gcEvent.id,
            title: gcEvent.title,
            start: gcEvent.start,
            end: gcEvent.end,
            groupId: gcEvent.title,
            backgroundColor: gcEvent.bgColor, // Gives each course its own background color to better distinguish them
            borderColor: gcEvent.bgColor,
            textColor: gcEvent.textColor
        });
    }

    calendar.render();

}