import { mockStore } from '../__mocks__/stateContext';
import { createPopper } from '@popperjs/core';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { Calendar } from 'app/calendar/Calendar';
import { StateWrapper } from 'app/store/StateWrapper';

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

	const initialDate = mockStore.events['1'].occasions[0].start;

	const result = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<Calendar initialDate={initialDate} />
		</StateWrapper>
	);

	const fcEventContainer = await result.findByText('Grundkurs Lindy Hop');

	act(() => {
		fcEventContainer.click();
		jest.runAllTicks();
	});

	expect(createPopper).toHaveBeenCalledTimes(1);
});

it('Can open list view', async () => {
	const initialDate = mockStore.events['1'].occasions[0].start;

	const result = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<Calendar initialDate={initialDate} />
		</StateWrapper>
	);

	const fcListRangeButton = await result.findByText('List');

	act(() => {
		fcListRangeButton.click();
	});

	expect(result.baseElement.querySelector('.fc-listRange-view')).toBeTruthy();
});
