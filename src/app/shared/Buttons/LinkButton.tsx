import ExternalLink from "../../assets/external-link.svg";

type Props = {
  size: "sm" | "md" | "lg";
  href: string;
  children?: JSX.Element | string;
}

export function LinkButton(props: Props) {
  return (
    <a className="button" href={props.href} target="_blank" rel="noreferrer">
      <div className="flex items-center">
        <span>{props.children}</span>
        {/* eslint-disable-next-line jsx-a11y/alt-text*/}
        <img src={ExternalLink} height="24" width="24" />
      </div>
    </a>
  );
}
