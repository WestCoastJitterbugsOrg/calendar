import { GroupCheckbox } from "./EventGroupCheckbox";
import { ExpandIcon } from "./ExpandIcon";

interface EventGroupHeaderProps {
  title: string;
  expanded: boolean;
  checked: "all" | "some" | "none";
  toggleExpanded: () => void;
  toggleChecked: () => void;
}

export function EventGroupHeader({
  title,
  expanded,
  checked,
  toggleExpanded,
  toggleChecked,
}: EventGroupHeaderProps) {
  return (
    <div className="flex min-h-[32px] flex-row items-center bg-secondary p-2 font-bold text-white">
      <div
        className="flex flex-grow cursor-pointer items-center"
        onClick={toggleExpanded}
      >
        <ExpandIcon open={expanded} />
        <span className="ml-2">{title}</span>
      </div>

      <GroupCheckbox state={checked} onClick={toggleChecked} />
    </div>
  );
}
