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
      className="flex min-h-[64px] flex-wrap items-center justify-between border-8 border-solid border-primary bg-dark p-4"
    >
      <div className="text-white">
        This calendar can remember which events are selected between sessions.
        {<br />}
        We do not process this data for any other use.
        {<br />}
        Your consent is needed for this functionality.
      </div>
      <Button onClick={consent}>Consent</Button>
    </div>
  );
}
