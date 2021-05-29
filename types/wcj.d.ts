declare namespace Wcj {
  export type WcjEvent = {
    id: string,
    title: string,
    occasions: {
      start: Date,
      end: Date
    }[],
    /* colors in hex rgb */
    bgColor: string,
    textColor: string
    /* state */
    showInCalendar: boolean,
  };
}


declare var API_URL: string;