import { StateWrapper } from './store/StateWrapper';
import * as WCJ from './types/wcj';
import { EventSelection } from './event-selection/EventSelection';
import { Calendar } from './calendar/Calendar';
import { Header } from './Header';
import { Footer } from './Footer';
import { EventSeriesModal } from './shared/EventModal/EventSeriesModal';

type Props = WCJ.Context;

export default function App({ categories, events }: Props) {
	return (
		<StateWrapper categories={categories} events={events}>
			<div id="cw-filter-calendar-root" className="min-h-[calc(100dvh-128px)]">
				<Header />
				<div className="flex flex-row flex-wrap items-stretch bg-white">
					<aside className="flex max-h-[calc(100dvh-128px)] w-96 flex-grow flex-col">
						<EventSelection />
					</aside>
					<main
						className="min-h-[calc(100dvh-128px)] min-w-[calc(100%-384px)] flex-shrink-0 flex-grow"
						data-testid="calendar-wrapper"
					>
						<Calendar />
					</main>
				</div>
				<Footer />
			</div>
			<EventSeriesModal />
		</StateWrapper>
	);
}
