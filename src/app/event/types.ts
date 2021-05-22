import GCEvent = gapi.client.calendar.Event;

export type WCJEventCreator = {
    createFromGoogleCal: (gcEvents: GCEvent[]) => { [id: string]: WcjEvent },
    createFromDans: (dansEvents: DansSeEvent[]) => { [id: string]: WcjEvent }
}

export type DansSeEvent = {
    eventId: string,
    title: string,
    longdescription: string,
    place: string,
    schedule: {
        occasions?: [{
            occasion: {
                startDate: Date,
                endDate: Date
            }
        }],
        startDate?: Date,
        endDate?: Date
    },
    categories: [{
        category: string
    }]
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
