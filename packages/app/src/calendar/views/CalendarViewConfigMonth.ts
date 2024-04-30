import { formatDate } from '@fullcalendar/core';
import { capitalizeFirstLetter } from 'src/services/utils';
import { FC } from 'src/types';

const viewOptions: FC.ViewOptions = {
	titleFormat: (args) =>
		capitalizeFirstLetter(
			formatDate(args.date.marker, {
				year: 'numeric',
				month: 'long',
				locale: 'sv',
			}),
		),
	dayHeaderFormat: (args) => {
		const weekday = formatDate(args.date.marker, {
			weekday: 'long',
			locale: 'sv',
		});
		return capitalizeFirstLetter(weekday);
	},
};

export default viewOptions;
