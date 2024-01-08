import { Button } from '../shared/Button';
import { stateContext } from '../state';
import { EventGroup } from './EventGroup';
import style from './EventSelection.module.scss';
import { useContext } from 'react';

type Props = {
	isLoading: boolean;
};

export function EventSelection(props: Props) {
	const { events, categories, setCheckedEvents } = useContext(stateContext);

	const select = (show: boolean) => {
		if (show) {
			setCheckedEvents?.(() => events.map((event) => event.id));
		} else {
			setCheckedEvents?.(() => []);
		}
	};

	return (
		<>
			<div className={style.actionButtons}>
				<Button
					onClick={() => {
						select(true);
					}}
				>
					Select all
				</Button>
				<Button
					onClick={() => {
						select(false);
					}}
				>
					Deselect all
				</Button>
			</div>
			<div className={style.eventGroupList} role="list">
				{categories.map((categoryId) => (
					<EventGroup key={categoryId} category={categoryId} />
				))}

				{props.isLoading && (
					<div className={style.loader}>
						<div className={style.loaderBar}></div>
					</div>
				)}
			</div>
		</>
	);
}
