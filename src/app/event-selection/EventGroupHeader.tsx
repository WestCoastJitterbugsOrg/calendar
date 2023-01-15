import plusIcon from "../assets/plus.svg";
import { CategoryStore } from '../store/model';
import { GroupCheckbox } from './EventGroupCheckbox';

type Props = {
	category: CategoryStore;
	expanded: boolean;
	toggleExpanded: () => void;
};
export function EventGroupHeader(props: Props) {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			className="flex min-h-[32px] cursor-pointer flex-row items-center bg-secondary p-2 font-bold text-white"
			onClick={props.toggleExpanded}
		>
			<div className="flex flex-grow items-center">
				{/* eslint-disable-next-line jsx-a11y/alt-text*/}
				<img
					className={`h-4 w-4 flex-shrink-0 transform transition duration-200 ${
						props.expanded ? 'rotate-45' : ''
					}`}
					src={plusIcon}
				/>
				<span className="ml-2">{props.category.id}</span>
			</div>

			<div className="flex">
				<GroupCheckbox category={props.category} />
			</div>
		</div>
	);
}
