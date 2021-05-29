
export type DansSeReponse = {
    cogwork: {
        events: {
            event: DansSeEvent
        }[]
    }
}

export type DansSeEvent = {
    eventId: string,
    title: string,
    longdescription: string,
    place: string,
    schedule: {
        occasions?: {
            occasion: {
                startDate: Date,
                endDate: Date
            }
        }[],
        startDate?: Date,
        endDate?: Date
    },
    categories: {
        category: string
    }[]
}
