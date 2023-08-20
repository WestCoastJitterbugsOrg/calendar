import type { FC } from 'src/types';

const viewOptions: FC.ViewOptions = {
	titleFormat: { year: 'numeric', month: 'long' },
	dayHeaderFormat: { weekday: 'long' },
};

export default viewOptions;
