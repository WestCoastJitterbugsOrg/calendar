export { Cogwork };

declare global {
  var cw_error: WP_Error | undefined;
  var cw_data: Cogwork.Response | undefined;
}

interface WP_Error {
  errors: {
    broke: string[];
  };
  error_data: unknown[];
}

declare namespace Cogwork {
  interface Event {
    "@attributes": { eventId: string };
    title: string;
    longdescription?: string;
    schedule: Schedule;
    category: string;
    primaryEventGroup: string;
    requirements: MaybeArray<{
      level: { "@attributes": { minValue: number } };
    }>;
    registration: MaybeArray<{
      "@attributes": { status: "ONLY_INFO" | "STOPED_SHOWING" | "OPEN" };
      url: string;
    }>;
    place?: string;
    pricing?: {
      base: string;
    };
    instructors?: { combinedTitle: string };
  }

  interface Schedule {
    occasions: {
      occasion: MaybeArray<Occasion>;
    };
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
  }

  interface Occasion {
    startDateTime?: string;
    endDateTime?: string;
  }
  interface Response {
    events: {
      event: MaybeArray<Event>;
    };
  }
}
