type IVCalendar = {
	/**
	 * Add property to a calendar
	 *
	 * @param {string}  name                    - Name of the property (e.g. DTSTAMP).
	 * @param {*}       [value]                 - Value of the property.
	 * @param {Object}  [props={}]              - Object of properties for the property. Object keys and values are directly injected.
	 * @param {boolean} [skipTransformer=false] - Explicitly determine if the property's value is transformed.
	 */
	addProp(
		name: string,
		value: unknown,
		props?: Record<string, unknown>,
		skipTransformer?: boolean
	): void;
	addComponent(component: IVEvent): void;
	toString(): string;
	toBlob(): Blob;
	toBase64(): string;
};

type IVEvent = {
	/**
	 * Add property to an event
	 *
	 * @param {string}  name                    - Name of the property (e.g. DTSTAMP).
	 * @param {*}       [value]                 - Value of the property.
	 * @param {Object}  [props={}]              - Object of properties for the property. Object keys and values are directly injected.
	 * @param {boolean} [skipTransformer=false] - Explicitly determine if the property's value is transformed.
	 */
	addProp(
		name: string,
		value?: unknown,
		props?: Record<string, unknown>,
		skipTransformer?: boolean
	): void;
};

declare module 'ics-js' {
	const VCALENDAR: IVCalendar & (new () => typeof VCALENDAR);
	const VEVENT: IVEvent & (new () => typeof VEVENT);
}
