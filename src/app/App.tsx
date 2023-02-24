import appStyle from './App.module.scss';
import { EventSeriesModal } from './EventSeriesModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { Calendar } from './calendar/Calendar';
import { EventSelection } from './event-selection/EventSelection';
import { initContext } from './services/cogwork';
import { StateWrapper } from './store/StateWrapper';
import { useEffect, useState } from 'react';
import useSwr from 'swr';
import { CW } from 'types';
import { MaybeArray } from 'types/utils';

type Props = {
	ajaxUrl: string;
	org: string;
	pwHash: string;
	colors: Record<string, string>;
};

export default function App(props: Props) {
	const [rootRef, setRef] = useState<HTMLElement | null>(null);
	useEffect(() => {
		for (const color in props.colors) {
			const colorVal = props.colors[color];
			rootRef?.style.setProperty(`--cw-color-${color}`, colorVal);
		}
	}, [props.colors, rootRef]);

	const formData = new FormData();
	formData.append('action', 'cwfc_fetch');
	formData.append('org', props.org);
	formData.append('pw_hash', props.pwHash);

	const { isLoading, error, data } = useSwr<MaybeArray<CW.Event>, string>(
		'cwfc_fetch',
		() =>
			fetch(props.ajaxUrl, {
				method: 'POST',
				body: formData,
			}).then((res) =>
				res.ok ? res.json() : res.text().then((text) => Promise.reject(text))
			)
	);

	if (isLoading) {
		return <>Loading...</>;
	}

	if (error) {
		return (
			<>
				<h3>An error has occurred</h3>
				<pre>{error}</pre>
			</>
		);
	}

	if (!data) {
		return <h3>Didn&apos;t get any data</h3>;
	}

	const context = initContext(data);

	return (
		<StateWrapper categories={context.categories} events={context.events}>
			<div id="cw-filter-calendar-root" className={appStyle.root} ref={setRef}>
				<Header />
				<div className={appStyle.contentWrapper}>
					<aside className={appStyle.eventSelection}>
						<EventSelection />
					</aside>
					<main className={appStyle.calendar} data-testid="calendar-wrapper">
						<Calendar />
					</main>
				</div>
				<Footer />
				{rootRef && <EventSeriesModal parent={rootRef} />}
			</div>
		</StateWrapper>
	);
}
