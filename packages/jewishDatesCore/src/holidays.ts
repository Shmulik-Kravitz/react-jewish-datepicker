import { getDateInfo, DateInfo, TzomInfo } from "jewish-holidays";
import { BasicJewishDate } from "./interfaces";

export type JewishHolidayInfo = DateInfo;
export type JewishTzomInfo = TzomInfo;

/**
 * Holiday/observance summary for a date.
 *
 * Two conventions are reconciled here so they never meet anywhere else:
 * `jewish-holidays` takes `isChutzLaaretz` where the rest of this package takes
 * `isIsrael` (see `getHolidays`, `dontSelectHolidays`), and it takes a language
 * code where this package takes `isHebrew`.
 *
 * The language belongs on this call rather than on `getHolidayNames` because
 * `jewish-holidays` resolves the names itself - asking for `"he"` returns
 * `["ראש השנה", "ראש חודש"]` directly, including the specific fast and Purim
 * names that no lookup table here could keep up with.
 */
export const getHolidayInfo = (
  date: Date | BasicJewishDate,
  isIsrael: boolean = true,
  isHebrew: boolean = false
): JewishHolidayInfo => {
  return getDateInfo(date, !isIsrael, isHebrew ? "he" : "en");
};

/**
 * The holiday names for a date, already in the language `getHolidayInfo` was
 * asked for.
 */
export const getHolidayNames = (
  info: JewishHolidayInfo | undefined
): string[] => {
  return info?.holidays ?? [];
};

/**
 * The fast observed on a date, or `undefined`. Carries the specific fast name
 * and, when the fast moved off Shabbat, which way it moved.
 */
export const getTzomInfo = (
  info: JewishHolidayInfo | undefined
): JewishTzomInfo | undefined => {
  return info?.tzom;
};

/** Shabbat itself. Matches `dontSelectShabat`, which also keys off `getDay()`. */
export const isShabbatDay = (date: Date): boolean => date.getDay() === 6;

/** Friday. */
export const isErevShabbatDay = (date: Date): boolean => date.getDay() === 5;

/**
 * Class names for Shabbat, for styling day cells.
 *
 * Separate from `getHolidayClassNames` because this is the cheap half: it is a
 * `getDay()` check with no `jewish-holidays` lookup, which is why the picker can
 * afford to turn it on by default while `showHolidays` stays opt-in.
 */
export const getShabbatClassNames = (date: Date): string[] => {
  if (isShabbatDay(date)) {
    return ["isShabbat"];
  }
  if (isErevShabbatDay(date)) {
    return ["isErevShabbat"];
  }
  return [];
};

/**
 * Class names describing a date's observances, for styling day cells.
 *
 * `hasHoliday` excludes Shabbat — marking two days every week would drain the
 * marker of meaning. Shabbat is not emitted here at all; it has its own
 * `getShabbatClassNames`, so the two can be toggled independently and neither
 * can emit a class the other already did.
 */
export const getHolidayClassNames = (
  info: JewishHolidayInfo | undefined
): string[] => {
  if (!info) {
    return [];
  }

  const classNames: string[] = [];
  const hasHoliday =
    info.isYomTov ||
    info.isCholHaMoed ||
    info.isRoshChodesh ||
    info.isChanukah ||
    info.isPurim ||
    info.isTzom;

  if (hasHoliday) classNames.push("hasHoliday");
  if (info.isYomTov) classNames.push("isYomTov");
  if (info.isErevYomTov) classNames.push("isErevYomTov");
  if (info.isCholHaMoed) classNames.push("isCholHaMoed");
  if (info.isRoshChodesh) classNames.push("isRoshChodesh");
  if (info.isChanukah) classNames.push("isChanukah");
  if (info.isPurim) classNames.push("isPurim");
  if (info.isTzom) classNames.push("isTzom");

  return classNames;
};
