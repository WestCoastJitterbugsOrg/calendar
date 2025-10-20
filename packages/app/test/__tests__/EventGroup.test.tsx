import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import MockApp from '../__mocks__/appMock';
import { mockStore } from '../__mocks__/stateContext';

it('Unchecking a group causes all events to be unchecked', async () => {
	const result = render(<MockApp />);

	const el = (await result.findAllByAltText('☑'))[0];

	act(() => {
		fireEvent.click(el);
	});

	const allEventCheckboxes = (await result.findAllByRole(
		'checkbox',
	)) as HTMLInputElement[];
	expect(allEventCheckboxes.every((x) => x.checked)).toBeFalsy();
});

it('Unchecking an event causes it to be unchecked', () => {
	const result = render(<MockApp />);
	const el = result.getByText(mockStore.categories[0]);

	act(() => {
		// Click on the category to expand it
		fireEvent.click(el);
	});

	// First checkbox is the group checkbox, so we take the second one
	const eventCheckbox = result.getAllByRole('checkbox')[1] as HTMLInputElement;
	expect(eventCheckbox.checked).toBeFalsy();
});
