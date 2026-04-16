import Dayjs from "dayjs";
import { getGregDate, isValidDate } from "jewish-dates-core";
import {
	BasicJewishDate,
	BasicJewishDateRange,
	BasicJewishDay,
	DateDisplay,
	DateRange,
} from "../interfaces";

const formatGregorian = (date: Date): string =>
	Dayjs(date).format("D MMM YYYY");

export const getDatesInOrder = (
	day1: BasicJewishDay,
	day2: BasicJewishDay,
): BasicJewishDay[] => {
	if (day1 && day2) {
		return Dayjs(day1.date).isBefore(Dayjs(day2.date))
			? [day1, day2]
			: [day2, day1];
	} else {
		return [];
	}
};

export const getDateStringForSelectedDay = (
	isRange: boolean,
	isHebrew: boolean,
	selectedDay: BasicJewishDay,
	startDay: BasicJewishDay,
	endDay: BasicJewishDay,
	dateDisplay?: DateDisplay,
): string => {
	const display = dateDisplay ?? "jewish";

	if (isRange) {
		if (!startDay?.jewishDateStr) {
			return display === "gregorian" ? "Pick Dates" : isHebrew ? "בחר תאריכים" : "Pick Dates";
		}
		if (display === "gregorian") {
			const s = formatGregorian(startDay.date);
			const e = endDay ? ` - ${formatGregorian(endDay.date)}` : "";
			return `${s}${e}`;
		}
		if (display === "both") {
			const jS = isHebrew ? startDay.jewishDateStrHebrew : startDay.jewishDateStr;
			const jE = endDay ? ` - ${isHebrew ? endDay.jewishDateStrHebrew : endDay.jewishDateStr}` : "";
			const gS = formatGregorian(startDay.date);
			const gE = endDay ? ` - ${formatGregorian(endDay.date)}` : "";
			return `${jS}${jE}  ·  ${gS}${gE}`;
		}
		return isHebrew
			? `${startDay.jewishDateStrHebrew} - ${endDay?.jewishDateStrHebrew || ""}`
			: `${startDay.jewishDateStr} - ${endDay?.jewishDateStr || ""}`;
	}

	if (!selectedDay) {
		return display === "gregorian" ? "Pick Date" : isHebrew ? "בחר תאריך" : "Pick Date";
	}
	if (display === "gregorian") return formatGregorian(selectedDay.date);
	if (display === "both") {
		const jewish = isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr;
		return `${jewish}  ·  ${formatGregorian(selectedDay.date)}`;
	}
	return isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr;
};

export const isDateRange = (
	object = {},
): object is BasicJewishDateRange | DateRange => {
	return "startDate" in object;
};

export const getDateInit = (
	date: Date | BasicJewishDate | BasicJewishDateRange | DateRange,
): Date => {
	if (isDateRange(date)) {
		return isValidDate(date.startDate)
			? date.startDate
			: getGregDate(date.startDate);
	} else {
		return isValidDate(date) ? date : getGregDate(date);
	}
};
