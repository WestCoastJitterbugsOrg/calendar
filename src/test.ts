import anyTest, { ExecutionContext, Macro, CbMacro, TestInterface } from 'ava';
import { WcjEvent } from './app/types';
import * as dayjs from 'dayjs';
import FullCalendarFactory from './app/fullcalendar-setup';

type TestData = { events: WcjEvent [] }
type TestContext = {
	// All mock data
	data: TestData,
	// I set the time the test begins so that the same time is used everywhere throughout the test
	testTime: Date
};
const test = anyTest as TestInterface<TestContext>;


// #region AVA Typescript recipes
// From here https://github.com/avajs/ava/blob/master/docs/recipes/typescript.md
// There is more, click the link to learn about typing t.context and throws-assertions

// Simple test
const fn = () => 'foo';

test('fn() returns foo', t => {
	t.is(fn(), 'foo');
});

// Using ExecutionContext macro
const hasLength = (t: ExecutionContext, input: string, expected: number) => {
	t.is(input.length, expected);
};

test('bar has length 3', hasLength, 'bar', 3);

// Assigning title property to macro
const macro: Macro<[string, number]> = (t, input, expected) => {
	t.is(eval(input), expected);
};
macro.title = (providedTitle = '', input, expected) => `${providedTitle} ${input} = ${expected}`.trim();

test(macro, '2 + 2', 4);
test(macro, '2 * 3', 6);
test('providedTitle', macro, '3 * 3', 9);

// Expecting macro to be used with callback test
const cbmacro: CbMacro<[]> = t => {
	t.pass();
	setTimeout(t.end, 100);
};

test.cb('providedTitle 2', cbmacro);


//#endregion

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
});

test('First event has id event_1', t => {
	const calendar = FullCalendarFactory();
	calendar.setup(new HTMLElement());
	calendar.setEvents(t.context.data.events);
	t.is(t.context.data.events[0].id, calendar.getCalendar().getEvents()[0].id);
})