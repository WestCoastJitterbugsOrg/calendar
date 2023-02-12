import { mockStore } from '../__mocks__/stateContext';
import { Calendar } from '@app/calendar/Calendar';
import { StateWrapper } from '@app/store/StateWrapper';
import { createPopper } from '@popperjs/core';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';

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

it('Click event in calendar opens popper', () => {
	jest.useFakeTimers();

	const initialDate = mockStore.events['1'].occasions[0].start;

	const { baseElement } = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<Calendar initialDate={initialDate} />
		</StateWrapper>
	);

	const fcEventContainer = baseElement.querySelector<HTMLDivElement>(
		'.fc-event-title-container'
	);

	act(() => {
		fcEventContainer?.click();
		jest.runAllTicks();
	});

	expect(createPopper).toHaveBeenCalledTimes(1);
});

it('Can open list view', () => {
	const initialDate = mockStore.events['1'].occasions[0].start;

	const { baseElement } = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<Calendar initialDate={initialDate} />
		</StateWrapper>
	);

	const fcListRangeButton = baseElement.querySelector<HTMLDivElement>(
		'.fc-listRange-button'
	);

	act(() => {
		fcListRangeButton?.click();
	});

	expect(baseElement.querySelector('.fc-listRange-view')).toBeTruthy();
});
