import { useState } from "react";
import { canStore, wcjcalAcceptStoringCookie } from "./services/cookies";
import { Button } from "./shared";

export function Header() {
  const [accepted, accept] = useState(false);

  const consent = () => {
    // Store cookie with highest possible expiration date
    document.cookie = `${wcjcalAcceptStoringCookie}=yes;expires=2147483647;secure`;
    accept(true);
  };

  if (!canStore() && !accepted) {
    return (
      <div className="bg-black min-h-[64px] flex flex-wrap items-center justify-between p-4">
        <div className="text-white">
          This calendar uses cookies to remember your settings (which events you
          have selected). {<br />}
          Press Consent to get this functionality.
        </div>
        <Button size="md" title="Consent" onClick={consent} />
      </div>
    );
  } else {
    return <></>;
  }
}
