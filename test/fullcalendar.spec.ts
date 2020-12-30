import { Dependencies } from './../src/app/types';
import "@fullcalendar/core";
import { MockFcCreator } from './mocks/fuller-calendar.mock';
import anyTest, { TestInterface } from 'ava';
import { WcjEvent } from '~app/event/types';
import dayjs from 'dayjs';
import makeInitFullCalendar from '~app/fullercalendar';
import { fixture } from 'ava-browser-fixture'
import jqueryProxy from 'jquery'
import { readFile } from "fs"

type TestData = { events: WcjEvent[] }
type TestContext = {
	// All mock data
	data: TestData,
	// I set the time the test begins so that the same time is used everywhere throughout the test
	testTime: Date,
	document: Document,
	deps: Dependencies
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
	fixture("src/index.html")(t).then(() => {
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
	})
});

test.beforeEach(t => {
	const currentTime = new Date();
	t.context.testTime = currentTime;
	t.context.data = generateUniqueData(currentTime);
	t.context.deps = { initFullCalendar: MockFcCreator(currentTime) } as Dependencies;
});

test('`setEvents` sets selected events in the calendar', t => {
	const container = document.body.getElementsByClassName('container')[0] as HTMLElement;
	const calendar = makeInitFullCalendar(t.context.deps)(container);
	calendar.setEvents(t.context.data.events);
	t.deepEqual(t.context.data.events.map(x => x.id), calendar.getEvents().map(x => x.id));
});

test('Clicking "week" and "list" buttons changes properties', t => {
	const container = jqueryProxy('.container')[0];
	const calendar = makeInitFullCalendar(t.context.deps)(container);

	calendar.getOption("customButtons")["myWeek"].click(new MouseEvent("click"), container);
	calendar.getOption("customButtons")["myList"].click(new MouseEvent("click"), container);

	t.is(calendar.view.type, "listWeek");
})