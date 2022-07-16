type VCALENDAR = {
  new (): VCALENDAR;
  addProp: (
    name: string,
    value: unknown,
    props: Record = {},
    skipTransformer = false
  ) => void;
  addComponent: (component: VEVENT) => void;
  toString: () => string;
  toBlob: () => Blob;
  toBase64: () => string;
};

type VEVENT = {
  new (): VEVENT;
  addProp: (
    name: string,
    value?: unknown,
    props: Record = {},
    skipTransformer = false
  ) => void;
};

declare module "ics-js" {
  const VCALENDAR: VCALENDAR;
  const VEVENT: VEVENT;
}
