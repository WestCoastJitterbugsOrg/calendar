// eslint-disable-next-line import/no-unresolved -- Can't put app project in tsconfig references due to this issue https://github.com/microsoft/TypeScript/issues/33827
import style from '!@cwfc/app/build/index.css?raw';
import { render as appRender } from '@cwfc/app';
import { WpCwfc } from '@cwfc/shared';

export const render = (rootElement: Element, wpCwfc: WpCwfc) => {
	const appDiv = document.createElement('div');
	const styleContainer = document.createElement('style');
	styleContainer.textContent = style;
	const appContainer = document.createElement('div');

	rootElement.append(appDiv);

	const shadowRoot = appDiv.attachShadow({ mode: 'open' });
	shadowRoot?.appendChild(styleContainer);
	shadowRoot?.appendChild(appContainer);
	appRender(wpCwfc, appContainer);
};
