import $ from 'jquery'
import { EventApi } from '@fullcalendar/core';
import { Dependencies } from './../src/app/types';

import dayjs from 'dayjs';
import { WcjEvent } from '../src/app/event/types';
import makeWcjEventCreator from '../src/app/event/wcj';
import initEventList from '../src/app/event-group-list';

type GCalEvent = gapi.client.calendar.Event;


type TestData = { events: GCalEvent[] }

function generateUniqueData(time: Date): TestData {
    const now = dayjs(time);
    const start = now.subtract(1, 'hour').toDate();
    const end = now.add(1, 'hour').toDate();

    const events: GCalEvent[] = [<GCalEvent>{
        summary: "Event 1",
        id: "event_1",
        start: {
            dateTime: start.toISOString()
        },
        end: {
            dateTime: end.toISOString()
        },

    }
    ]

    return { events }
}

describe('Page handler', () => {
    let testTime: Date;
    let data: TestData;
    let wcjEvents: WcjEvent[];
    let dependencies: Dependencies;

    beforeEach(() => {
        testTime = new Date(2020, 1, 1);
        data = generateUniqueData(testTime);

        let calendarEvents: EventApi[] = []
        dependencies = {
            initFullerCalendar: (el => ({
                //TODO: Add more
                timeFrame: () => 'Month',
                viewType: () => 'Grid',
                getEvents: () => calendarEvents,
                setEvents: events => { wcjEvents = events }
            })),
            initWcjColorHash: (_ => ({
                hex: _ => '#000000',
                hsl: _ => [0, 0, 0],
                rgb: _ => [0, 0, 0]
            }))
        } as Dependencies;

        document.body.innerHTML = `
        <div class="container">
            <div class="courseList-container">
                <div class="courseList-actions">
                    <button id="selectAllCourses">Select all</button>
                    <button class="button-link" id="deselectAllCourses">Deselect all</button>
                </div>
                <ul id="courseList"></ul>
            </div>
            
            <div class="calendar-container">
                <div id="calendar"></div>
            </div>
        </div>`
    })


    test('createFromGoogleCal', () => {
        // init page handler
        const wcjEventDict = makeWcjEventCreator(dependencies).createFromGoogleCal(data.events);
        expect(Object.keys(wcjEventDict).length).toEqual(data.events.length);
    })


    test('clicking `selectAllCourses` button selects all courses', () => {
        jest.useFakeTimers();
        const eventDict = makeWcjEventCreator(dependencies).createFromGoogleCal(data.events);
        const eventList = initEventList(eventDict, dependencies.initFullerCalendar(document.body));

        //        console.log(document.body.innerHTML);
        $('#selectAllCourses').trigger('click');
        jest.runAllTicks();
        jest.runAllTimers();
        expect(eventList.getSelected().length).toEqual(Object.keys(eventDict).length);
    });
})
