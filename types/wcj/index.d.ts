declare namespace Wcj {
  export type WcjEventCategory = {
    category: string, // also used as identifier,
    color: string,
    events: WcjEvent[]
  }

  export type WcjEvent = {
    id: string,
    title: string,
    occasions: {
      start: Date,
      end: Date
    }[],
    description: string,
    registrationUrl: string,
    place: string
    /* colors in hex rgb */
    color: string,
    /* state */
    showInCalendar?: boolean,
    price: string,
    instructors: string
  };
}


declare var API_URL: string;