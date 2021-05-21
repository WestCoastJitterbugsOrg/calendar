import $ from 'jquery'
import { EventApi } from '@fullcalendar/core';
import { Dependencies } from '../src/app/types';
import { WcjEvent } from '../src/app/event/types';
import initEventList from '../src/app/event-group-list';
import { EventDict } from '../src/app/event-group-list/types';


describe('Page handler', () => {
    let wcjEvents: WcjEvent[];
    let dependencies: Dependencies;
    let eventDict: EventDict;

    beforeEach(() => {

        let calendarEvents: EventApi[] = []
        dependencies = {
            initFullerCalendar: (el => ({
                //TODO: Add more
                timeFrame: () => 'Month',
                viewType: () => 'Grid',
                getEvents: () => calendarEvents,
                setEvents: events => { wcjEvents = events }
            }))
        } as Dependencies;

        eventDict = {
            'event1': {
                bgColor: '#FFFFFF',
                textColor: '#000000',
                id: 'event1',
                occasions: [{ start: new Date(2020, 0, 0, 13), end: new Date(2020, 0, 0, 15) }],
                showInCalendar: true,
                title: 'Event 1'
            }
        }

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





    test('clicking `selectAllCourses` button selects all courses', () => {
        const eventList = initEventList(eventDict, dependencies.initFullerCalendar(document.body));

        $('#selectAllCourses').trigger('click');
        expect(eventList.getSelected().length).toEqual(Object.keys(eventDict).length);
    });
})
