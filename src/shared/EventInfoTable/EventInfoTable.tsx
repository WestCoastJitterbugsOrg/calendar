import { EventOverviewTableRow } from "./EventInfoTableRow";

function displayDate(date: Date) {
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
}

export default function EventInfoTable(event: Wcj.Event) {
  const { first, last } = event.occasions.reduce(
    ({ first, last }, curr) => ({
      first: Math.min(first, curr.start.getTime()),
      last: Math.max(last, curr.start.getTime()),
    }),
    {
      first: Number.MAX_SAFE_INTEGER,
      last: Number.MIN_SAFE_INTEGER,
    }
  );

  const firstDate = displayDate(new Date(first));
  const lastDate = displayDate(new Date(last));

  return (
    <table className="w-full">
      <tbody>
        <EventOverviewTableRow title="Place" value={event.place} />
        <EventOverviewTableRow title="Price" value={event.price} />
        <EventOverviewTableRow title="Instructors" value={event.instructors} />
        <EventOverviewTableRow title="First occasion" value={firstDate} />
        <EventOverviewTableRow title="Last occasion" value={lastDate} />
      </tbody>
    </table>
  );
}
