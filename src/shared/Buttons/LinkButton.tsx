interface Props {
  size: "sm" | "md" | "lg";
  href: string;
  children?: JSX.Element | string;
}

export function LinkButton(props: Props) {
  return (
    <a className="button" href={props.href} target="_blank" rel="noreferrer">
      <div className="flex items-center">
        <span>{props.children}</span>
        <svg width="24px" height="24px" viewBox="0 0 24 24">
          <g
            strokeWidth="2.1"
            stroke="white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="17 13.5 17 19.5 5 19.5 5 7.5 11 7.5"></polyline>
            <path d="M14,4.5 L20,4.5 L20,10.5 M20,4.5 L11,13.5"></path>
          </g>
        </svg>
      </div>
    </a>
  );
}
