declare namespace Wcj {
  export type EventCategory = {
    category: string; // also used as identifier,
    events: Event[];
  };

  export type Event = {
    id: string;
    title: string;
    occasions: {
      start: Date;
      end: Date;
    }[];
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
}

declare const API_URL: string;
