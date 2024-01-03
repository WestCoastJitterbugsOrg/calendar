import { mockStore } from '../__mocks__/stateContext';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { EventGroup } from 'src/event-selection/EventGroup';
import { EventItem } from 'src/event-selection/EventItem';
import { StateWrapper } from 'src/state';

it('Unchecking a group causes all events to be unchecked', async () => {
	const result = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventGroup category="Lindy Hop" />
		</StateWrapper>,
	);

	const el = (await result.findAllByAltText('☑'))[0];

	act(() => {
		fireEvent.click(el);
	});

	const allEventCheckboxes = (await result.findAllByRole(
		'checkbox',
	)) as HTMLInputElement[];
	expect(allEventCheckboxes.every((x) => x.checked)).toBeFalsy();
});

it('Unchecking an event causes it to be unchecked', async () => {
	const result = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventItem event={Object.values(mockStore.events)[0]} expanded={true} />
		</StateWrapper>,
	);

	const el = await result.findByRole('listitem');

	act(() => {
		fireEvent.click(el);
	});

	const eventCheckbox = (await result.findByRole(
		'checkbox',
	)) as HTMLInputElement;
	expect(eventCheckbox.checked).toBeFalsy();
});

it('Click info button opens modal', async () => {
	const result = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventItem event={Object.values(mockStore.events)[0]} expanded={true} />
		</StateWrapper>,
	);

	const infoButton = await result.findByAltText('info');

	act(() => {
		infoButton.click();
	});

	const modalContent = result.findByRole('dialog');

	expect(modalContent).toBeTruthy();
});
