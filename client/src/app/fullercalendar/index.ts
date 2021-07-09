import { FullerCalendarCreator } from "./types";
import { CalendarTimeFrame, calendarViews, CalendarViewType, fcButtonGroup, setEvents } from "./helpers";

import { Calendar as FullCalendar, CustomButtonInput } from "@fullcalendar/core";
import DayGridPlugin from '@fullcalendar/daygrid';
import ListPlugin from '@fullcalendar/list';
import TimeGridPlugin from '@fullcalendar/timegrid';

/**
 * Initiates a FullCalendar and returns relevant handler methods for it
 */
const initFullerCalendar: FullerCalendarCreator
    = calendarEl => {
        let isInited = false;
        const timeFrameButtonGroup = fcButtonGroup(calendarEl, CalendarTimeFrame);
        const viewTypeButtonGroup = fcButtonGroup(calendarEl, CalendarViewType);

        const changeCalendarView = () => {
            const selectedTimeFrame = timeFrameButtonGroup.getSelected();
            const timeFrame = calendarViews[selectedTimeFrame];
            const newView = timeFrame?.[viewTypeButtonGroup.getSelected()];
            calendar.changeView(newView);

            const toolbarTitleClassList = $('.fc-toolbar-title').get(0).classList;

            if(selectedTimeFrame === 'Week') {
                // The .week-title class adds "Week " before the title as content in css
                toolbarTitleClassList.add('week-title');
            }else {
                toolbarTitleClassList.remove('week-title');
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


        const calendar = new FullCalendar(calendarEl, {
            plugins: [DayGridPlugin, ListPlugin, TimeGridPlugin],
            customButtons: {
                myMonth: createTimeFrameButton(CalendarTimeFrame.Month),
                myWeek: createTimeFrameButton(CalendarTimeFrame.Week),
                myGrid: createViewTypeButton(CalendarViewType.Grid),
                myList: createViewTypeButton(CalendarViewType.List)
            },
            viewDidMount: e => {
                if (!isInited) {
                    // Make sure the correct buttons are selected (this won't set the view, just the state of the buttons)
                    timeFrameButtonGroup.click(CalendarTimeFrame.Month);
                    viewTypeButtonGroup.click(CalendarViewType.Grid);
                    isInited = true;
                }
            },
            headerToolbar: { start: 'myMonth,myWeek', center: 'prev,title,next', end: 'myGrid,myList' },
            views: {
                dayGridMonth: { 
                  // Set HTML title attribute to the event title,
                  // so that you can hover with the mouse
                  eventDidMount: e => e.el.title = e.event.title,
                  titleFormat: { year: 'numeric', month: 'short' },

                },
                listMonth: { 
                    titleFormat: { year: 'numeric', month: 'short' },
                },
                timeGridWeek: {
                    titleFormat: { week: 'numeric'},
                    dayHeaderFormat: {weekday: 'short',day:'numeric',month:'short'}
                },
                listWeek: {
                    titleFormat: { week: 'numeric'}
                }
            },
            nowIndicator: true,
            initialView: 'dayGridMonth',
            timeZone: 'UTC',
            firstDay: 1, // Monday
            displayEventEnd: true,
            weekText: 'Week',
            eventTimeFormat: {
                hour: '2-digit', minute: '2-digit',
                
                meridiem: false, hour12: false
            }
        });

        return Object.assign(
            calendar,
            {
                timeFrame: timeFrameButtonGroup.getSelected,
                viewType: viewTypeButtonGroup.getSelected,
                setEvents: (events: Wcj.WcjEvent[]) => setEvents(calendar, events)
            }
        );
    }

export default initFullerCalendar;