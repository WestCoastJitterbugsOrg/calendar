import { WcjEvent } from "~app/event/types";

export type PageHandlerCreator = { createPageHandler: (events: WcjEvent[]) => void }
