import { useState } from "react";
import { canStoreSelection, storeConsentCookie } from "./services/cookies";
import Button from "./shared/Buttons/Button";

export function Header() {
  const [accepted, accept] = useState(false);

  const consent = () => {
    storeConsentCookie();
    accept(true);
  };

  if (canStoreSelection() || accepted) {
    return <></>;
  }
  return (
    <div
      data-testid="cookie-header"
      className="flex min-h-[64px] flex-wrap items-center justify-between bg-black p-4"
    >
      <div className="text-white">
        This calendar uses cookies to remember your settings (which events you
        have selected). {<br />}
        Press Consent to get this functionality.
      </div>
      <Button title="Consent" onClick={consent} />
    </div>
  );
}
