// Due to EU law, we need to check that user has consented to storing functional information
// There are two cookies that we check to see if the user has consented

export const wcjcalAcceptStoringCookie = "wcjcal-accept-storing";

export function canStore() {
  const val = document.cookie
    .split(";")
    .map((x) => x.split("="))
    .find(
      (x) =>
        x[0] === "cookielawinfo-checkbox-functional" ||
        x[0] === wcjcalAcceptStoringCookie
    )?.[1];

  return val === "yes";
}
