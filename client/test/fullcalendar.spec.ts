import { Calendar, CalendarOptions, PluginDef } from "@fullcalendar/core";
import DayGridPlugin from "@fullcalendar/daygrid";
import ListPlugin from "@fullcalendar/list";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { MockFcCreator } from './mocks/fuller-calendar.mock';
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

type TestData = { events: Wcj.WcjEvent[] }

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

	beforeEach(() => {
		const currentTime = new Date();
		testTime = currentTime;
		data = generateUniqueData(currentTime);
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
	});

	test('`setEvents` sets selected events in the calendar', () => {
		const calendar = FullerCalendarFactory(document.getElementById('calendar'));
		setEvents(calendar, data.events);
		expect(data.events.map(x => x.id)).toEqual(calendar.getEvents().map(x => x.groupId));
	});

	test('Clicking "week" and "list" buttons changes properties', () => {
		const container = document.body.getElementsByClassName('calendar-container').item(0) as HTMLElement;
		const calendar = FullerCalendarFactory(container);
		calendar.render();

		const customButtons = calendar.getOption("customButtons");
		customButtons.myWeek.click(new MouseEvent("click"), container);
		customButtons.myList.click(new MouseEvent("click"), container);


		expect(calendar.view.type).toEqual("listWeek");
	})

});
