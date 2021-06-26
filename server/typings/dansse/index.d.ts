declare namespace DansSe {
    interface Event {
        $: {eventId: string},
        title: [string],
        longdescription: string,
        place: string,
        schedule: [Schedule],
        categories: {
            category: string
        }[]
    }

    interface Schedule {
            occasions?: {
                occasion: [Occasion]
            }[],
            startDate?: [{_: string}],
            startTime?: [string],
            endDate?: [{_: string}],
            endTime?: [string]
    }


    interface Occasion {
        startDateTime?: [{_: string}],
        endDateTime?: [{_: string}]
    }
    interface Response {
        cogwork: {
            events: {
                event: [Event]
            }[]
        }
    }
}
