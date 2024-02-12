import '@testing-library/jest-dom';
import { RenderResult, fireEvent, render, act } from '@testing-library/react';
import { EventSeriesModal } from 'src/EventSeriesModal';
import AppMock from '../__mocks__/appMock';
import { mockStore } from '../__mocks__/stateContext';

it('EventSeriesModal Snapshot', () => {
	const { baseElement } = render(
		<EventSeriesModal
			parent={document.body}
			event={mockStore.events[0]}
			close={() => {}}
		/>,
	);

	expect(baseElement).toMatchSnapshot();
});

it('EventSeriesModal clicking on close button closes modal', async () => {
	const result = render(<AppMock />);
	await openModal(result);

	const modalCloseButton = await result.findByLabelText('modal-close-button');

	act(() => {
		fireEvent.click(modalCloseButton);
	});

	const modal =
		result.baseElement.querySelector<HTMLElement>('.ReactModalPortal');

	expect(modal).toBeEmptyDOMElement();
});

it('EventSeriesModal clicking escape closes modal', async () => {
	const result = render(<AppMock />);
	await openModal(result);
	act(() => {
		fireEvent.keyDown(
			result.baseElement.ownerDocument.activeElement ?? document.body,
			{
				keyCode: 27, // Escape
			},
		);
	});

	const modalPortal =
		result.baseElement.querySelector<HTMLElement>('.ReactModalPortal');
	expect(modalPortal).toBeEmptyDOMElement();
});

async function openModal(app: RenderResult) {
	const categoryElement = await app.findByText(mockStore.categories[0]);

	act(() => {
		// Click on the category to expand it
		fireEvent.click(categoryElement);
	});

	const infoButton = await app.findByAltText('info');
	act(() => {
		fireEvent.click(infoButton);
	});
}
