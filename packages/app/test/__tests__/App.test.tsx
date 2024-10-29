import { defaultEventData } from '../__mocks__/cwEvents';
import { mockStore } from '../__mocks__/stateContext';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { App } from 'src/App';
import { initContext } from 'src/services/cogwork';
import * as ics from 'src/services/ics';

beforeEach(() => {
	document.cookie = '';
});

it('Cookie header is shown by default', async () => {
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			isLoading={false}
		/>,
	);

	const cookieHeader = await renderResult.findByText('Your consent is needed', {
		exact: false,
	});

	expect(cookieHeader).toBeTruthy();
});

it('Clicking on Download calls exportICS', () => {
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			isLoading={false}
		/>,
	);

	const exportICS = jest.spyOn(ics, 'exportICS').mockImplementation();

	const downloadButton = renderResult.getByText(
		'Export iCal',
	) as HTMLButtonElement;
	act(() => {
		downloadButton.click();
	});

	expect(exportICS).toHaveBeenCalledTimes(1);
	jest.restoreAllMocks();
});

it('exportICS creates an ics-file', async () => {
	const link = document.createElement('a');
	jest.spyOn(document, 'createElement').mockImplementation(() => link);
	URL.createObjectURL = jest.fn(() => 'data:mock');
	URL.revokeObjectURL = jest.fn(() => undefined);

	await ics.exportICS(mockStore.events);
	expect(link.download).toEqual('cw-events.ics');
	expect(link.href).toEqual('data:mock');
	jest.restoreAllMocks();
	jest.clearAllMocks();
});
