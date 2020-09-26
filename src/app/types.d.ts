export type CalendarTimeFrame = 'Month' | 'Week';
export type CalendarViewType = 'Grid' | 'List';
export type CalendarButtonCategory = 'TimeFrame' | 'ViewType';

export type WcjEvent = {
  title: string,
  id: string,
  start: Date,
  end: Date,
  /* colors in hex rgb */
  bgColor: string,
  textColor: string
};