import anyTest, { TestInterface } from 'ava';
import { WcjEvent } from '~app/event/types';
import dayjs from 'dayjs';
import { fixture } from 'ava-browser-fixture'
import jqueryProxy from 'jquery'
import { FullerCalendar, FullerCalendarCreator } from '~app/fullercalendar/types';
import { readFile } from "fs"
import PageHandlerFactory from '~app/page-handler';

type TestData = { events: WcjEvent[] }
type TestContext = {
    // All mock data
    data: TestData,
    // I set the time the test begins so that the same time is used everywhere throughout the test
    testTime: Date,
    document: Document,
    fullerCalendarCreator: FullerCalendarCreator
};
const test = anyTest as TestInterface<TestContext>;

function generateUniqueData(currentTime: Date): TestData {
    const now = dayjs(currentTime);
    const start = now.subtract(1, 'hour').toDate();
    const end = now.add(1, 'hour').toDate();

    return {
        events: [{
            title: "Event 1",
            id: "event_1",
            start: start,
            end: end,
            bgColor: "black",
            textColor: "white"
        }]
    }
}

test.before.cb(t => {
    fixture("src/index.html")(t);

    readFile("test/mocks/rendered-calendar.html", (err, data) => {
        if (err) {
            t.log('Loading rendered-calendar.html failed', err);
            t.end(err);
        } else {
            try {
                const calendarEl = t.context.document.body.querySelectorAll(".calendar-container").item(0);
                calendarEl.innerHTML = data.toString().trim();
                t.end();
            } catch (e) {
                t.log('Replacing calendar element in DOM failed', e);
                t.end(e);
            }
        }
    });
}
);

test.beforeEach(t => {
    const currentTime = new Date();
    t.context.testTime = currentTime;
    t.context.data = generateUniqueData(currentTime);
    t.context.fullerCalendarCreator = {
        createCalendar: (el => ({
            //TODO: Add more
            timeFrame: () => 'Month',
            viewType: () => 'Grid'
        } as FullerCalendar))
    };

});

test('`setEvents` sets selected events in the calendar', t => {
    const container = document.body.getElementsByClassName('container')[0] as HTMLElement;
    const pageHandlerCreator = PageHandlerFactory($, t.context.fullerCalendarCreator);
	const calendar = pageHandlerCreator.createPageHandler([]);
	setEvents(calendar, t.context.data.events);
	t.deepEqual(t.context.data.events.map(x => x.id), calendar.getEvents().map(x => x.id));
});