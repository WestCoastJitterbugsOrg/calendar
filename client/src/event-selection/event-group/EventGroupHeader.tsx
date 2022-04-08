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
    <div className="bg-wcj-cyan text-white font-bold min-h-8 py-2 flex flex-row items-center">
      <div
        className="cursor-pointer flex-grow flex items-center"
        onClick={toggleExpanded}
      >
        <ExpandIcon open={expanded} />
        {title}
      </div>

      <div className="mx-3 flex">
        <GroupCheckbox state={checked} onClick={toggleChecked} />
      </div>
    </div>
  );
}
