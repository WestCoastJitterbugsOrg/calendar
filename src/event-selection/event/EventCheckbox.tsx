interface EventCheckboxProps {
  checked: boolean;
}

export default function EventCheckbox(props: EventCheckboxProps) {
  return (
    <label>
      <input
        type="checkbox"
        data-testid="event-checkbox"
        className={`
          checkbox
          h-6 w-6 rounded-full 
          border border-solid border-black border-opacity-50 
          after:top-[3px] after:left-[8px] after:h-[12px] after:w-[6px] after:rotate-45 
          after:border-0 after:border-solid after:border-white 
          checked:border-none checked:bg-primary 
          checked:after:border-b-[2px] checked:after:border-r-[2px]`}
        readOnly
        checked={props.checked}
      />
    </label>
  );
}
