interface props {
  title: string;
  value: string;
}

export function EventOverviewTableRow({ title, value }: props) {
  return (
    <tr className="border-solid border-[rgba(0,0,0,0.5)] border-x-0 border-b-0 first:border-t-0 border-t">
      <td className="font-bold py-1 pr-2 md:pr-4 border-0 break-words">
        {title}
      </td>
      <td className="py-1 pl-2 md:pl-4 border-0">{value}</td>
    </tr>
  );
}
