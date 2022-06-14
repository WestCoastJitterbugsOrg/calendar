// Due to EU law, we need to check that user has consented to storing functional information
// There are two cookies that we check to see if the user has consented

const defaultConsentCookie = "wcjcal-accept-storing";

const consentCookies = [
  defaultConsentCookie,
  "cookielawinfo-checkbox-functional",
];

export function storeConsentCookie() {
  // Store cookie 1 year to comply with ePrivacy Regulation
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${defaultConsentCookie}=yes; max-age=${oneYear}`;
}

export function canStoreSelection() {
  return getCookies().some(
    (x) => consentCookies.includes(x.key) && x.value === "yes"
  );
}

function getCookies() {
  return document.cookie
    .replace(/\s/g, "") // remove all whitespace
    .split(";") // cookies are separated by ";"
    .map((x) => {
      const [key, value] = x.split("="); // cookies are stored as key=value
      return { key, value };
    });
}
