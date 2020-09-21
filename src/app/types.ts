import { GCalendar } from './google-calendar-tools';

export type CalendarTimeFrame = 'Month' | 'Week';
export type CalendarViewType = 'Grid' | 'List';
export type CalendarButtonCategory = 'TimeFrame' | 'ViewType';
export type MyEvent = GCalendar.Event & {
  /* colors in hex rgb */
  bgColor: string,
  textColor: string
};
