declare namespace DansSe {
  interface Event {
    $: { eventId: string };
    title: [string];
    longdescription: [string];
    schedule: [Schedule];
    primaryEventGroup: [{ _: string }];
    registration: [
      {
        $: { status: "ONLY_INFO" | "STOPED_SHOWING" | "OPEN" };
        url: string[];
      }
    ];
    place: [string];
    pricing: [{
      base: [{ $: { currency: string }; _: string }];
    }];
    instructors: [{combinedTitle: [string]}]
  }

  interface Schedule {
    occasions?: [
      {
        occasion: Occasion[];
      }
    ];
    startDate?: [{ _: string }];
    startTime?: [string];
    endDate?: [{ _: string }];
    endTime?: [string];
  }

  interface Occasion {
    startDateTime?: [{ _: string }];
    endDateTime?: [{ _: string }];
  }
  interface Response {
    cogwork: {
      events: {
        event: [Event];
      }[];
    };
  }
}
