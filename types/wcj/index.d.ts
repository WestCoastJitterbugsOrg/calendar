declare namespace Wcj {
  export type WcjEventCategory = {
    name: string, // also used as identifier
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
    bgColor: string,
    textColor: string
    /* state */
    showInCalendar?: boolean,

  };
}


declare var API_URL: string;