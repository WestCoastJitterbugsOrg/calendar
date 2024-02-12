import { App } from 'src/App';
import { mockStore } from './stateContext';
import styleMock from './styleMock';
import { useState } from 'react';

const { categories, events } = mockStore;

const MockApp = () => {
	const [rootRef, setRef] = useState<HTMLElement | null>(null);
	return (
		<div ref={setRef}>
			{rootRef && (
				<App
					events={events}
					categories={categories}
					colors={styleMock}
					isLoading={false}
					parent={rootRef}
					selectedEventIds={events.map((event) => event.id)}
				/>
			)}
		</div>
	);
};

export default MockApp;
