type Props = {
  title: string;
  value?: string;
}

export function EventOverviewTableRow(props: Props) {
  if (props.value == null) {
    return <></>;
  }
  return (
    <tr className="border-x-0 border-b-0 border-t border-solid border-[rgba(0,0,0,0.5)] first:border-t-0">
      <td className="break-words border-0 py-1 pr-2 font-bold md:pr-4">
        {props.title}
      </td>
      <td className="border-0 py-1 pl-2 md:pl-4">{props.value}</td>
    </tr>
  );
}
