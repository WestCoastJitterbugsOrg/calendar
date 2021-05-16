import GCEvent = gapi.client.calendar.Event;

export type WCJEventCreator = {
    createFromGoogleCal: (gcEvents: GCEvent[]) => {[id: string]: WcjEvent}
}

export type WcjEvent = {
    id: string,
    title: string,
    occasions: {
        start: Date,
        end: Date
    }[],
    /* colors in hex rgb */
    bgColor: string,
    textColor: string
    /* state */
    showInCalendar: boolean,
};
