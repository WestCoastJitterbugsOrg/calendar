import tailwindConfig from "tailwindconfig";
import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindValuesColor } from "tailwindcss/tailwind-config";

interface EventCheckboxProps {
  color: string;
  checked: boolean;
}

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme.colors as TailwindValuesColor;

export default function EventCheckbox(props: EventCheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`
        appearance-none w-6 h-6 border rounded-full border-opacity-50 border-solid border-black

        after:content-[''] after:relative after:block after:opacity-0 
        after:left-[8px] after:top-[3px] after:w-[6px] after:h-[12px]
        after:rotate-45 after:border-solid after:border-white after:border-0
        
        checked:after:border-b-[2px] checked:after:border-r-[2px] checked:after:opacity-100
      `}
      style={
        props.checked
          ? { backgroundColor: colors[props.color].toString(), border: "none" }
          : {}
      }
      readOnly
      checked={props.checked}
    />
  );
}
