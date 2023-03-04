export type EventCategory = {
	category: string; // also used as identifier,
	events: Event[];
};

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
	/* state */
	showInCalendar?: boolean;
};

export type Occasion = {
	start: Date;
	end: Date;
};

export type Context = {
	categories: Record<string, { id: string; events: string[] }>;
	events: Record<string, Event>;
};

export type WpCwfc = {
	ajaxUrl: string;
	org: string;
	pwHash: string;
	colors: Record<string, string>;
};
