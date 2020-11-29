import anyTest, { ExecutionContext, Macro, CbMacro, TestInterface } from 'ava';
import { WcjEvent } from '~app/types';
import dayjs from 'dayjs';
import FullerCalendarFactory from '~app/fullercalendar';
import { Calendar, EventApi, MountArg, ViewApi, ViewContentArg } from '@fullcalendar/core';

import { fixture } from 'ava-browser-fixture'

import jqueryProxy from 'jquery'
import { CalendarTimeFrame, CalendarViewType, setEvents } from '~app/fullercalendar/helpers';
import { FullCalendarCreator } from '~app/fullercalendar/types';



type TestData = { events: WcjEvent[] }
type TestContext = {
	// All mock data
	data: TestData,
	// I set the time the test begins so that the same time is used everywhere throughout the test
	testTime: Date,
	document: Document,
	fcFactory: FullCalendarCreator
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

test.beforeEach(fixture("src/index.html"));

test.beforeEach(t => {
	const currentTime = new Date();

	const mockFcFactory: FullCalendarCreator = (el, opts) => {
		let events: EventApi[] = [];
		let view: ViewApi = <ViewApi>{
			activeStart: currentTime,
			activeEnd: dayjs(currentTime).add(7, 'day').toDate(),
			calendar: null,
			currentStart: currentTime,
			currentEnd: dayjs(currentTime).add(7, 'day').toDate(),
			title: 'Day Grid Month',
			type: 'dayGridMonth'
		};
		return <Calendar>{
			render: () => { opts.viewDidMount({ el: el, view: view }) },
			getEvents: () => events,
			addEvent: (eventInput, _) => {
				const event = <EventApi>{
					id: eventInput.id,
					remove: () => { events = events.filter(x => x.id !== eventInput.id) }
				}
				events.push(event);
				return event;
			},
			changeView: (viewType, dateOrRange) => {
				Object.assign(view, { type: viewType })
			},

			view: view,
			getOption: (opt) => opts[opt]

		};
	}

	t.context.testTime = currentTime;
	t.context.data = generateUniqueData(currentTime);
	t.context.fcFactory = mockFcFactory;
});


test.cb("Example test for JQuery", t => {
	jqueryProxy(function ($: JQueryStatic) {
		try {
			const body = $('body');
			body.append('test');
			t.true(body.get(0).innerHTML.endsWith('test'));
			t.end();
		} catch (e) {
			t.log('failed', e);
			t.end(e);
		}
	})
});





test('`setEvents` sets selected events in the calendar', t => {
	const container = document.body.getElementsByClassName('container')[0] as HTMLElement;
	const fcHandlerCreator = FullerCalendarFactory(t.context.fcFactory);
	const calendar = fcHandlerCreator.createCalendar(container);
	setEvents(calendar, t.context.data.events);
	t.deepEqual(t.context.data.events.map(x => x.id), calendar.getEvents().map(x => x.id));
});

test('Clicking "week" and "list" buttons changes properties', t => {
	const container = jqueryProxy('.container')[0];
	const fcHandlerCreator = FullerCalendarFactory(t.context.fcFactory);
	const calendar = fcHandlerCreator.createCalendar(container);

	calendar.getOption("customButtons")["myWeek"].click(new MouseEvent("click"), container);
	calendar.getOption("customButtons")["myList"].click(new MouseEvent("click"), container);

	t.is(calendar.view.type, "listWeek");
})


// #region AVA Typescript recipes (for reference)
// From here https://github.com/avajs/ava/blob/master/docs/recipes/typescript.md
// There is more, click the link to learn about typing t.context and throws-assertions

// // Simple test
// const fn = () => 'foo';

// test('fn() returns foo', t => {
// 	t.is(fn(), 'foo');
// });

// // Using ExecutionContext macro
// const hasLength = (t: ExecutionContext, input: string, expected: number) => {
// 	t.is(input.length, expected);
// };

// test('bar has length 3', hasLength, 'bar', 3);

// // Assigning title property to macro
// const macro: Macro<[string, number]> = (t, input, expected) => {
// 	t.is(eval(input), expected);
// };
// macro.title = (providedTitle = '', input, expected) => `${providedTitle} ${input} = ${expected}`.trim();

// test(macro, '2 + 2', 4);
// test(macro, '2 * 3', 6);
// test('providedTitle', macro, '3 * 3', 9);

// // Expecting macro to be used with callback test
// const cbmacro: CbMacro<[]> = t => {
// 	t.pass();
// 	setTimeout(t.end, 100);
// };

// test.cb('providedTitle 2', cbmacro);


//#endregion


