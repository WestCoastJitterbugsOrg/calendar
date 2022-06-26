declare const API_URL: string;

declare module "*.css";

declare const wcjcal_ajax_obj: {
  data: Cogwork.Response;
};

declare namespace Wcj {
  export type EventCategory = {
    category: string; // also used as identifier,
    events: Event[];
  };

  export type Event = {
    id: string;
    category: string;
    title: string;
    occasions: Occasion[];
    description?: string;
    registrationUrl: string;
    place: string;
    price: string;
    instructors: string;
    /* colors in hex rgb */
    color: string;
    /* state */
    showInCalendar?: boolean;
  };

  export type Occasion = {
    start: Date;
    end: Date;
  };
}

declare namespace Cogwork {
  interface Event {
    "@attributes": { eventId: string };
    title: string;
    longdescription?: string;
    schedule: Schedule;
    category: string;
    primaryEventGroup: string;
    requirements: {
      level: { "@attributes": { minValue: number } };
    };
    registration: {
      "@attributes": { status: "ONLY_INFO" | "STOPED_SHOWING" | "OPEN" };
      url: string;
    };
    place: string;
    pricing: {
      base: string;
    };
    instructors: { combinedTitle: string };
  }

  interface Schedule {
    occasions: {
      occasion: Occasion | Occasion[];
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
      event: Event[];
    };
  }
}

declare module "*.png" {
  const value: any;
  export default value;
}

type VCALENDAR = {
  new (): VCALENDAR;
  addProp: (
    name: string,
    value: unknown,
    props: Record = {},
    skipTransformer = false
  ) => void;
  addComponent: (component: VEVENT) => void;
  toString: () => string;
  toBlob: () => Blob;
  toBase64: () => string;
};

type VEVENT = {
  new (): VEVENT;
  addProp: (
    name: string,
    value?: unknown,
    props: Record = {},
    skipTransformer = false
  ) => void;
};

declare module "ics-js" {
  const VCALENDAR: VCALENDAR;
  const VEVENT: VEVENT;
}
