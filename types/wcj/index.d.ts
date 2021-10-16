declare namespace Wcj {
  export type WcjEventCategory = {
    category: string, // also used as identifier,
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
    price: string,
    instructors: string
    /* colors in hex rgb */
    color: string,
    /* state */
    showInCalendar: boolean,
  };
}


declare var API_URL: string;