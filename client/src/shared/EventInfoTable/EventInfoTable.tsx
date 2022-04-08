import { EventOverviewTableRow } from "./EventInfoTableRow";

function displayDate(date: Date) {
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

export default function EventInfoTable(props: { event: Wcj.Event }) {
  const event = props.event;

  const { first, last } = event.occasions.reduce(
    ({ first, last }, curr) => ({
      first: Math.min(first, curr.start.getTime()),
      last: Math.max(last, curr.end.getTime()),
    }),
    {
      first: Number.MAX_SAFE_INTEGER,
      last: Number.MIN_SAFE_INTEGER,
    }
  );

  const firstDate = displayDate(new Date(first));
  const lastDate = displayDate(new Date(last));

  return (
    <table>
      <tbody>
        <EventOverviewTableRow title="Place" value={event.place} />
        <EventOverviewTableRow title="Price" value={event.price} />
        <EventOverviewTableRow title="Instructors" value={event.instructors} />
        <EventOverviewTableRow
          title="First occasion starts"
          value={firstDate}
        />
        <EventOverviewTableRow title="Last occasion ends" value={lastDate} />
      </tbody>
    </table>
  );
}
