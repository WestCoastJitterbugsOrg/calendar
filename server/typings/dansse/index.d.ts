declare namespace DansSe {
    interface Event {
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

    interface Response {
        cogwork: {
            events: {
                event: Event
            }[]
        }
    }
}
