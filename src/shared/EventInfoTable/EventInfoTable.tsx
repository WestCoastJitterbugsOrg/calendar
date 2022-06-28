import { EventOverviewTableRow } from "./EventInfoTableRow";

interface Props {
  event: Wcj.Event;
}

export function EventInfoTable(props: Props) {

  const { first, last } = props.event.occasions.reduce(
    ({ first, last }, curr) => ({
      first: Math.min(first, curr.start.getTime()),
      last: Math.max(last, curr.start.getTime()),
    }),
    {
      first: Number.MAX_SAFE_INTEGER,
      last: Number.MIN_SAFE_INTEGER,
    }
  );

  const displayDate = (date: Date) =>
    date.toLocaleString("en-GB", {
      dateStyle: "medium",
      timeZone: "UTC",
    });

  const firstDate = displayDate(new Date(first));
  const lastDate = displayDate(new Date(last));

  return (
    <table className="w-full">
      <tbody>
        <EventOverviewTableRow title="Place" value={props.event.place} />
        <EventOverviewTableRow title="Price" value={props.event.price} />
        <EventOverviewTableRow title="Instructors" value={props.event.instructors} />
        <EventOverviewTableRow title="First occasion" value={firstDate} />
        <EventOverviewTableRow title="Last occasion" value={lastDate} />
      </tbody>
    </table>
  );
}
