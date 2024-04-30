import { FormatterInput, formatDate } from '@fullcalendar/core';
import { capitalizeFirstLetter } from 'src/services/utils';
import { FC } from 'src/types';

const titleFormat: FormatterInput = (args) => {
	const monthAndYear = formatDate(args.date.marker, {
		year: 'numeric',
		month: 'long',
		locale: 'sv',
	});
	const week = formatDate(args.date.marker, { week: 'numeric' });
	return `Vecka ${week}, ${capitalizeFirstLetter(monthAndYear)}`;
};

const dayHeaderFormat: FormatterInput = (args) => {
	const weekday = formatDate(args.date.marker, {
		weekday: 'long',
		locale: 'sv',
	});
	const dayOfTheMonth = formatDate(args.date.marker, { day: 'numeric' });
	return `${capitalizeFirstLetter(weekday)}\n${dayOfTheMonth}`;
};

const viewOptions: FC.ViewOptions = {
	scrollTimeReset: false,
	scrollTime: '09:00:00',
	slotLabelFormat: {
		hour: '2-digit',
		minute: '2-digit',
		meridiem: false,
		hour12: false,
	},
	titleFormat,
	dayHeaderFormat,
};

export default viewOptions;
