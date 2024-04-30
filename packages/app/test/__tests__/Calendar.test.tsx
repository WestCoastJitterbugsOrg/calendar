import { mockStore } from '../__mocks__/stateContext';
import { createPopper } from '@popperjs/core';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { Calendar } from 'src/calendar/Calendar';

jest.mock('@popperjs/core', () => {
	const originalModule = jest.requireActual<{
		createPopper: typeof createPopper;
	}>('@popperjs/core');
	return {
		__esModule: true,
		...originalModule,
		createPopper: jest.fn(() => 'mocked createPopper'),
	};
});

it('Click event in calendar opens popper', async () => {
	jest.useFakeTimers();

	const initialDate = mockStore.events[0].occasions[0].start;

	const result = render(
		<Calendar
			initialDate={initialDate}
			events={mockStore.events}
			checkedEvents={mockStore.checkedEvents}
		/>,
	);

	const fcEventContainer = await result.findByText('Grundkurs Lindy Hop');

	act(() => {
		fcEventContainer.click();
	});
	jest.runAllTimers();

	expect(createPopper).toHaveBeenCalledTimes(1);
});

it('Can open list view', () => {
	const initialDate = mockStore.events[0].occasions[0].start;

	const result = render(
		<Calendar
			initialDate={initialDate}
			events={mockStore.events}
			checkedEvents={mockStore.checkedEvents}
			setEventModal={() => {}}
		/>,
	);

	const fcListRangeButton = result.getByText('Lista');

	act(() => {
		fcListRangeButton.click();
	});

	expect(result.baseElement.querySelector('.fc-listRange-view')).toBeTruthy();
});
