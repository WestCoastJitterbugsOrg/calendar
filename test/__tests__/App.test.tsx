import { defaultColors, defaultEventData } from '../__mocks__/cwEvents';
import { mockStore } from '../__mocks__/stateContext';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { App } from 'app/App';
import { initContext } from 'app/services/cogwork';
import { storeConsentCookie } from 'app/services/cookies';
import * as ics from 'app/services/ics';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	document.cookie = '';
});

it('Cookie header is shown by default', async () => {
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			colors={defaultColors}
		/>
	);
	const cookieHeader = await renderResult.findByRole('banner');

	expect(cookieHeader).toBeTruthy();
});

it('Cookie header is hidden if there are cookies', () => {
	act(() => {
		storeConsentCookie('yes');
	});
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			colors={defaultColors}
		/>
	);
	const cookieHeader = renderResult.queryByRole('banner');
	expect(cookieHeader).toBeNull();
});

it('Clicking on Download calls exportICS', () => {
	const renderResult = render(
		<App
			parent={document.documentElement}
			{...initContext(defaultEventData)}
			colors={defaultColors}
		/>
	);

	const exportICS = jest.spyOn(ics, 'exportICS').mockImplementation();

	const downloadButton = renderResult.getByText(
		'Export iCal'
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
