import {
	BaseOptionRefiners,
	RawOptionsFromRefiners,
} from '@fullcalendar/core/internal';

export type ViewOptions = RawOptionsFromRefiners<
	Required<BaseOptionRefiners>
> & { type?: string };
