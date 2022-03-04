export function EventOverviewTableRow(props: { title: string; value: string }) {
  return (
    <tr className="border-solid border-[rgba(0,0,0,0.5)] border-x-0 border-b-0 first:border-t-0 border-t">
      <td className="font-bold py-1 px-2 md:px-4 border-0 break-words">
        {props.title}
      </td>
      <td className="py-1 px-2 md:px-4 border-0">{props.value}</td>
    </tr>
  );
}