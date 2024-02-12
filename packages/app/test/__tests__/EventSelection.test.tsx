import '@testing-library/jest-dom';
import { act, render, RenderResult } from '@testing-library/react';
import AppMock from '../__mocks__/appMock';

it('EventSelection Snapshot', async () => {
	const app = render(<AppMock />);
	const element = await app.findByTestId('event-selection');
	expect(element).toMatchSnapshot();
});

it('Events are selected at start', async () => {
	const app = render(<AppMock />);
	const [groupInput, eventInputs] = await getEventGroupInputs(app);
	expect(groupInput).toBeChecked();
	eventInputs.forEach((eventInput) => {
		expect(eventInput).toBeChecked();
	});
});

it('Clicking deselect all deselects all events and groups', async () => {
	const app = render(<AppMock />);
	const deselectAllBtn = app.getByText('Deselect all');

	act(() => {
		deselectAllBtn.click();
	});

	const [groupInput, eventInputs] = await getEventGroupInputs(app);
	expect(groupInput).not.toBeChecked();
	eventInputs.forEach((eventInput) => {
		expect(eventInput).not.toBeChecked();
	});
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
