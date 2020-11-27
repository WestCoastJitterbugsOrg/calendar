import anyTest, { ExecutionContext, Macro, CbMacro, TestInterface } from 'ava';
import { WcjEvent } from '../src/app/types';
import * as dayjs from 'dayjs';
import FullCalendarHandlerFactory, { FullCalendarCreator } from '../src/app/fullcalendar-setup';
import { Calendar, EventApi } from '@fullcalendar/core';

import { fixture } from 'ava-browser-fixture'

import * as jqueryProxy from 'jquery'



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

test.beforeEach(t => {
	t.context.testTime = new Date();
	t.context.data = generateUniqueData(t.context.testTime);

	return fixture("src/index.html")(t);
	// 	document.body.innerHTML = `
	// <div class="container">
	// 	<div class="courseList-container">
	// 		<div class="courseList-actions">
	// 			<button id="selectAllCourses">Select all</button> 
	// 			<button class="button-link" id="deselectAllCourses">Deselect all</button>
	// 		</div>
	// 		<ul id="courseList"></ul>
	// 	</div>
	// 	<div class="calendar-container">
	// 		<div id="calendar"></div>
	// 	</div>
	// </div>`;
});

test.cb("Test JQuery", t => {
	jqueryProxy(t.context.document)
		.ready(function ($) {
			try {
				$('.container').append("test");
				t.log(t.context.document.body.innerHTML);
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
	const fcHandlerCreator = FullCalendarHandlerFactory(MockFcFactory);
	const fcHandler = fcHandlerCreator.createHandler(container);
	fcHandler.setEvents(t.context.data.events);
	t.is(t.context.data.events[0].id, fcHandler.getCalendar().getEvents()[0].id);
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


