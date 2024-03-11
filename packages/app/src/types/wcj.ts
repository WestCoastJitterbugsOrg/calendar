export type Event = {
	id: string;
	category: string;
	title: string;
	occasions: Occasion[];
	description?: string;
	registrationUrl: string;
	place?: string;
	price?: string;
	instructors?: string;
};

export type Occasion = {
	start: Date;
	end: Date;
};

export type Context = {
	categories: string[];
	events: Event[];
	selectedEventIds: string[];
};
