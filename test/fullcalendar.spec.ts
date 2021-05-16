import { Calendar, CalendarOptions, PluginDef } from "@fullcalendar/core";
import DayGridPlugin from "@fullcalendar/daygrid";
import ListPlugin from "@fullcalendar/list";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { MockFcCreator } from './mocks/fuller-calendar.mock';
import { WcjEvent } from '../src/app/event/types';
import dayjs from 'dayjs';
import FullerCalendarFactory from '../src/app/fullercalendar';
import { setEvents } from '../src/app/fullercalendar/helpers';

jest.mock('@fullcalendar/core',
	() => {
		return {
			Calendar: jest.fn<Calendar, [HTMLElement, CalendarOptions]>().mockImplementation(MockFcCreator)
		};
	});

jest.mock('@fullcalendar/daygrid',
	() => {
		return jest.fn<typeof DayGridPlugin, []>().mockImplementation(() => (
			<typeof DayGridPlugin>{

			}));
	});

jest.mock('@fullcalendar/list',
	() => {
		return jest.fn<typeof ListPlugin, []>().mockImplementation(() => (
			<typeof ListPlugin>{

			}));
	});

jest.mock('@fullcalendar/timegrid',
	() => {
		return jest.fn<typeof TimeGridPlugin, []>().mockImplementation(() => (
			<typeof TimeGridPlugin>{

			}));
	});

type TestData = { events: WcjEvent[] }

function generateUniqueData(currentTime: Date): TestData {
	const now = dayjs(currentTime);
	const start = now.subtract(1, 'hour').toDate();
	const end = now.add(1, 'hour').toDate();

	return {
		events: [{
			title: "Event 1",
			id: "event_1",
			occasions: [{
				start: start,
				end: end,
			}],
			showInCalendar: true,
			bgColor: "black",
			textColor: "white"
		}]
	}
}

describe('Full Calendar', () => {
	let testTime: Date;
	let data: TestData;

	beforeEach(t => {
		const currentTime = new Date();
		testTime = currentTime;
		data = generateUniqueData(currentTime);

	});

	test('`setEvents` sets selected events in the calendar', t => {
		const calendar = FullerCalendarFactory(<HTMLElement>{});
		setEvents(calendar, data.events);
		expect(data.events.map(x => x.id)).toBe(calendar.getEvents().map(x => x.id));
	});

	test('Clicking "week" and "list" buttons changes properties', t => {
		const container = <HTMLElement>{};
		const calendar = FullerCalendarFactory(container);

		const customButtons = calendar.getOption("customButtons");
		const myWeekClick = customButtons?.myWeek?.click;
		myWeekClick && myWeekClick(new MouseEvent("click"), container);

		const myListClick = customButtons?.myList?.click;

		myListClick && myListClick(new MouseEvent("click"), container);


		expect(calendar.view.type).toEqual("listWeek");
	})

});
