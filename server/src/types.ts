
export type WCJEventCreator = {
    createFromGoogleCal: (gcEvents: Wcj.GCEvent[]) => { [id: string]: Wcj.WcjEvent },
    createFromDans: (dansEvents: DansSeEvent[]) => { [id: string]: Wcj.WcjEvent }
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
