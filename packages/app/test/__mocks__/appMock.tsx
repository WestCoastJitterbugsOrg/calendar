import { App } from 'src/App';
import { mockStore } from './stateContext';
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
					isLoading={false}
					parent={rootRef}
					selectedEventIds={events.map((event) => event.id)}
					rememberSelection={true}
				/>
			)}
		</div>
	);
};

export default MockApp;
