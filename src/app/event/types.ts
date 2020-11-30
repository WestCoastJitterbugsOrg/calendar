export interface WCJEventCreator {
    createFromGC: (gcEvent: gapi.client.calendar.Event) => WcjEvent
}

export type WcjEvent = {
    title: string,
    id: string,
    start: Date,
    end: Date,
    /* colors in hex rgb */
    bgColor: string,
    textColor: string
};
