import { mockStore } from '../__mocks__/stateContext';
import '@testing-library/jest-dom';
import { act, render, RenderResult } from '@testing-library/react';
import { EventSelection } from 'src/event-selection/EventSelection';
import { StateWrapper } from 'src/store/StateWrapper';

it('EventSelection Snapshot', () => {
	const { baseElement } = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventSelection />
		</StateWrapper>,
	);
	expect(baseElement).toMatchSnapshot();
});

it('Events are selected at start', async () => {
	const renderResult = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventSelection />
		</StateWrapper>,
	);

	const [groupInput, eventInputs] = await getEventGroupInputs(renderResult);
	expect(groupInput).toBeChecked();
	eventInputs.forEach((eventInput) => expect(eventInput).toBeChecked());
});

it('Clicking deselect all deselects all events and groups', async () => {
	const renderResult = render(
		<StateWrapper categories={mockStore.categories} events={mockStore.events}>
			<EventSelection />
		</StateWrapper>,
	);
	const deselectAllBtn = await renderResult.findByText('Deselect all');

	act(() => deselectAllBtn.click());

	const [groupInput, eventInputs] = await getEventGroupInputs(renderResult);
	expect(groupInput).not.toBeChecked();
	eventInputs.forEach((eventInput) => expect(eventInput).not.toBeChecked());
});

async function getEventGroupInputs(
	renderResult: RenderResult,
	groupSelector = (collection: HTMLCollection) => collection[0],
) {
	const eventGroup = groupSelector(
		(await renderResult.findByRole('list')).children,
	).children;

	const group = eventGroup[0];
	const eventsWrapper = eventGroup[1];

	const groupInput = group.querySelector("[role='checkbox']");
	const eventInputs = Array.from(
		eventsWrapper.children[0].querySelectorAll("[role='checkbox']"),
	);

	return [groupInput, eventInputs] as const;
}
