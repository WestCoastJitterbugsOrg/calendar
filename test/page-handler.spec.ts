import 'jquery'
import { EventApi } from '@fullcalendar/core';
import { Dependencies } from './../src/app/types';

import dayjs from 'dayjs';
import { WcjEvent } from '../src/app/event/types';


jest.mock('jquery');

type TestData = { events: (WcjEvent & Partial<EventApi>)[] }

function generateUniqueData(currentTime: Date): TestData {
    const now = dayjs(currentTime);
    const start = now.subtract(1, 'hour').toDate();
    const end = now.add(1, 'hour').toDate();

    const events = [{
        title: "Event 1",
        id: "event_1",
        occasions: [{
            start: start,
            end: end
        }],
        bgColor: "black",
        textColor: "white",
        showInCalendar: true,
        remove: () => events.shift()
    }
    ]

    return { events }
}

describe('Page handler', () => {
    let testTime: Date;
    let data: TestData;
    let dependencies: Dependencies;

    beforeEach(() => {
        testTime = new Date();
        data = generateUniqueData(testTime);

        let calendarEvents: EventApi[] = []
        dependencies = {
            initFullerCalendar: (el => ({
                //TODO: Add more
                timeFrame: () => 'Month',
                viewType: () => 'Grid',
                getEvents: () => calendarEvents
            }))
        } as Dependencies;
    })


    test('courses gets added to course list on init', t => {
        // init page handler
        //makeWcjEventCreator(dependencies).createFromGoogleCal(data.events);
        const courseListEl = $('#courseList');
        const noOfChildren = courseListEl.get(0).children.length;
        expect(noOfChildren).toBe(data.events.length);
    })


    test('clicking `selectAllCourses` button selects all courses', t => {
        // init page handler
        // makeWcjEventCreator(dependencies).createFromGoogleCal(data.events);
        $('#selectAllCourses').trigger('click');

    });
})
