import anyTest, { ExecutionContext, Macro, CbMacro, TestInterface } from 'ava';
import { WcjEvent } from '~app/types';
import dayjs from 'dayjs';
import { FullCalendarCreator } from '~app/fullercalendar/fullercalendar';
import FullerCalendarFactory from '~app/fullercalendar/fullercalendar.factory';
import { Calendar, EventApi } from '@fullcalendar/core';

import { fixture } from 'ava-browser-fixture'

import jqueryProxy from 'jquery'
import { setEvents } from '~app/fullercalendar/fullercalendar.helpers';



type TestData = { events: WcjEvent[] }
type TestContext = {
	// All mock data
	data: TestData,
	// I set the time the test begins so that the same time is used everywhere throughout the test
	testTime: Date,
	document: Document
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
	t.context.testTime = new Date();
	t.context.data = generateUniqueData(t.context.testTime);
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



const MockFcFactory: FullCalendarCreator = el => {
	let events: EventApi[] = [];
	return <Calendar>{
		render: () => { },
		getEvents: () => events,
		addEvent: (eventInput, _) => {
			const event = <EventApi>{
				id: eventInput.id,
				remove: () => { events = events.filter(x => x.id !== eventInput.id) }
			}
			events.push(event);
			return event;
		}
	};
}

test('First event has id event_1', t => {
	const container = document.body.getElementsByClassName('container')[0] as HTMLElement;
	const fcHandlerCreator = FullerCalendarFactory(MockFcFactory);
	const calendar = fcHandlerCreator.createCalendar(container);
	setEvents(calendar, t.context.data.events);
	t.is(t.context.data.events[0].id, calendar.getEvents()[0].id);
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


