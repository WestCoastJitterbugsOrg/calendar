/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}


declare module "jquery-modal" {
  interface ModalOptions {
    /** Close existing modals. Set this to false if you need to stack multiple modal instances. */
    closeExisting?: boolean;
    /** Allows the user to close the modal by pressing `ESC` */
    escapeClose?: boolean;
    /** Allows the user to close the modal by clicking the overlay */
    clickClose?: boolean;
    /** Text content for the close <a> tag. */
    closeText?: string;
    /** Add additional class(es) to the close <a> tag. */
    closeClass?: string;
    /** Shows a (X) icon/link in the top-right corner */
    showClose?: boolean;
    /** CSS class added to the element being displayed in the modal. */
    modalClass?: string;
    /** CSS class added to the overlay (blocker). */
    blockerClass?: string;
    /** HTML appended to the default spinner during AJAX requests.*/
    spinnerHtml?: string;
    /** Enable/disable the default spinner during AJAX requests. */
    showSpinner?: boolean;
    /** Number of milliseconds the fade transition takes (null means no transition) */
    fadeDuration?: null;
    /** Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.) */
    fadeDelay?: number;
  }
}

interface JQuery {
  // FIXME: Can't get ModalOption to resolve here
  modal(args?: ModalOptions): JQueryStatic;
}

declare namespace Wcj {
  export type EventCategory = {
    category: string; // also used as identifier,
    events: Event[];
  };

  export type Event = {
    id: string;
    title: string;
    occasions: {
      start: Date;
      end: Date;
    }[];
    description: string;
    registrationUrl: string;
    place: string;
    price: string;
    instructors: string;
    /* colors in hex rgb */
    color: string;
    /* state */
    showInCalendar?: boolean;
  };
}



declare var API_URL: string;