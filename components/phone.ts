// Country codes and phone rules for the contact form. Loaded on its own after the page renders,
// so the phone metadata stays out of the first page load.
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

export type { CountryCode };
export type Country = { code: CountryCode; name: string; dial: string };

/** Shown first in the country list: the Gulf, then where most guests call from. */
export const POPULAR: CountryCode[] = ["AE", "SA", "OM", "QA", "KW", "BH", "IN", "PK", "BD", "LK", "PH", "EG", "GB", "US"];

export const callingCode = (code: CountryCode) => getCountryCallingCode(code);

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryName = (code: CountryCode) => regionNames.of(code) ?? code;

/** "+971 50 123 4567" becomes "50 123 4567": the number as typed beside the country code chip, with no trunk "0". */
const withoutCode = (international: string) => international.replace(/^\+\d+\s*/, "");

/** A real-looking number for the country, e.g. "50 123 4567" (or "+971 50 123 4567") for the UAE. */
export function exampleNumber(code: CountryCode, international = false) {
  const example = getExampleNumber(code, examples)?.formatInternational() ?? "";
  return international ? example : withoutCode(example);
}

/** Every country, popular ones first, the rest A to Z. */
export function buildCountries(): Country[] {
  const toCountry = (code: CountryCode): Country => ({ code, name: countryName(code), dial: callingCode(code) });
  const rest = getCountries()
    .filter((code) => !POPULAR.includes(code))
    .map(toCountry)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...POPULAR.map(toCountry), ...rest];
}

/** Checks a number against the selected country, or against its own code when typed with a leading "+". */
export function validatePhone(value: string, country: CountryCode): string {
  const international = value.startsWith("+");
  const example = exampleNumber(country, international);
  const where = international ? "its country code" : countryName(country);
  if (!/^\+?[\d\s()-]+$/.test(value)) return `Please use digits only, like ${example}.`;
  const length = validatePhoneNumberLength(value, country);
  if (length === "TOO_SHORT") return `That number is too short for ${where}. Try something like ${example}.`;
  if (length === "TOO_LONG") return `That number is too long for ${where}. Try something like ${example}.`;
  if (!isValidPhoneNumber(value, country)) return `Please enter a valid number for ${where}, like ${example}.`;
  return "";
}

/** The number's own country, its digits as shown beside the chip, and its full international form; null if unreadable. */
export function formatPhone(value: string, country: CountryCode) {
  const parsed = parsePhoneNumberFromString(value, country);
  if (!parsed?.country) return null;
  const international = parsed.formatInternational();
  return { country: parsed.country, local: withoutCode(international), international };
}
