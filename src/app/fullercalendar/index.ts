import { FullCalendarCreator, FullCallendarHandlerCreator as FullerCalendarCreator } from "./types";
import { CalendarTimeFrame, calendarViews, CalendarViewType } from "./helpers";
import { defaultFCCreator } from "~app/default-objects";
import DayGridPlugin from '@fullcalendar/daygrid';
import ListPlugin from '@fullcalendar/list';
import TimeGridPlugin from '@fullcalendar/timegrid';
import { fcButtonGroup } from "./helpers";

/**
 * Initiates a FullCalendar and returns relevant handler methods for it
 * @param fcCreator A function that creates a FullCalendar given a HTMLElement and some options.
 * We use Dependency Injection to simplify testing. 
 * Normally, this will be the 2 parameter FullCalendar constructor.
 */
export default function FullerCalendarFactory(fcCreator: FullCalendarCreator = defaultFCCreator): FullerCalendarCreator {
    let isInited = false;
    return {
        createCalendar: calendarEl => {

            const timeFrameButtonGroup = fcButtonGroup(calendarEl, CalendarTimeFrame);
            const viewTypeButtonGroup = fcButtonGroup(calendarEl, CalendarViewType);

            const changeCalendarView = () => {
                const timeFrame = calendarViews[timeFrameButtonGroup.selected]
                const newView = timeFrame && timeFrame[viewTypeButtonGroup.selected];
                if (!newView) {
                    alert(`Unexpected view ${timeFrameButtonGroup.selected} ${viewTypeButtonGroup.selected}. Contact Jean-Philippe!`);
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

            const createViewTypeButton = (title: CalendarViewType) =>
                ({
                    text: CalendarViewType[title].toString(),
                    click: () => {
                        viewTypeButtonGroup.click(title);
                        changeCalendarView();
                    }
                });


            const calendar = fcCreator(calendarEl, {
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
                        timeFrameButtonGroup.click(CalendarTimeFrame.Week);
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

            calendar.render();
            
            return Object.assign(
                calendar,
                {
                    timeFrame: timeFrameButtonGroup.selected,
                    viewType: viewTypeButtonGroup.selected
                }
            );
        }
    }
}