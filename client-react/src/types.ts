export namespace Wcj {
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
    description: string;
    registrationUrl: string;
    place: string;
    /* colors in hex rgb */
    color: string;
    /* state */
    showInCalendar?: boolean;
    price: string;
    instructors: string;
  };
}
