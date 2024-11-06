import { defaultEventData } from '../__mocks__/cwEvents';
import { mockStore } from '../__mocks__/stateContext';
import '@testing-library/jest-dom';
import { act, render, waitFor } from '@testing-library/react';
import { App } from 'src/App';
import { initContext } from 'src/services/cogwork';
import * as ics from 'src/services/ics';

it('Clicking on Download calls exportICS', async () => {
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			isLoading={false}
		/>,
	);

	const exportICS = jest.spyOn(ics, 'exportICS').mockImplementation();

	const downloadButton = (await waitFor(() =>
		renderResult.findByText('Export iCal'),
	)) as HTMLButtonElement;

	act(() => {
		downloadButton.click();
	});

	expect(exportICS).toHaveBeenCalledTimes(1);
	jest.restoreAllMocks();
});

xit('exportICS creates an ics-file', async () => {
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
