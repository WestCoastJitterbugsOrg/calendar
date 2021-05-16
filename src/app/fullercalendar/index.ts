import {Factory} from '../types';
import {FullerCalendarCreator} from "./types";
import {CalendarTimeFrame, calendarViews, CalendarViewType, fcButtonGroup, setEvents} from "./helpers";

import DayGridPlugin from '@fullcalendar/daygrid';
import ListPlugin from '@fullcalendar/list';
import TimeGridPlugin from '@fullcalendar/timegrid';
import {CustomButtonInput} from "@fullcalendar/core";
import {WcjEvent} from '~app/event/types';

/**
 * Initiates a FullCalendar and returns relevant handler methods for it
 * @param fcCreator A function that creates a FullCalendar given a HTMLElement and some options.
 * We use Dependency Injection to simplify testing. 
 * Normally, this will be the 2 parameter FullCalendar constructor.
 */
const makeInitFullCalendar: Factory<FullerCalendarCreator, 'initFullCalendar'> =
    ({initFullCalendar}) => {
        let isInited = false;
        return calendarEl => {
            const timeFrameButtonGroup = fcButtonGroup(calendarEl, CalendarTimeFrame);
            const viewTypeButtonGroup = fcButtonGroup(calendarEl, CalendarViewType);

            const changeCalendarView = () => {
                const timeFrame = calendarViews[timeFrameButtonGroup.getSelected()]
                const newView = timeFrame && timeFrame[viewTypeButtonGroup.getSelected()];

                if (!newView) {
                    alert(`Unexpected view ${timeFrameButtonGroup.getSelected()} ${viewTypeButtonGroup.getSelected()}. Contact Jean-Philippe!`);
                    return;
                } else {
                    calendar.changeView(newView);
                }
            }

            const createTimeFrameButton = (timeFrame: CalendarTimeFrame) =>
            ({
                text: CalendarTimeFrame[timeFrame].toString(),
                click: () => {
                    timeFrameButtonGroup.click(timeFrame);
                    changeCalendarView();
                }
            });

            const createViewTypeButton = (title: CalendarViewType): CustomButtonInput =>
            ({
                text: CalendarViewType[title].toString(),
                click: () => {
                    viewTypeButtonGroup.click(title);
                    changeCalendarView();
                }
            });

            const calendar = initFullCalendar(calendarEl, {
                plugins: [DayGridPlugin, ListPlugin, TimeGridPlugin],
                customButtons: {
                    myMonth: createTimeFrameButton(CalendarTimeFrame.Month),
                    myWeek: createTimeFrameButton(CalendarTimeFrame.Week),
                    myGrid: createViewTypeButton(CalendarViewType.Grid),
                    myList: createViewTypeButton(CalendarViewType.List)
                },
                viewDidMount: () => {
                    if (!isInited) {
                        // Make sure the correct buttons are selected (this won't set the view, just the state of the buttons)
                        timeFrameButtonGroup.click(CalendarTimeFrame.Month);
                        viewTypeButtonGroup.click(CalendarViewType.Grid);
                        isInited = true;
                    }
                },
                headerToolbar: {start: 'myMonth,myWeek', center: 'prev,title,next', end: 'myGrid,myList'},
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

            return Object.assign(
                calendar,
                {
                    timeFrame: timeFrameButtonGroup.getSelected,
                    viewType: viewTypeButtonGroup.getSelected,
                    setEvents: (events: WcjEvent[]) => setEvents(calendar, events)
                }
            );
        }
    }

export default makeInitFullCalendar;