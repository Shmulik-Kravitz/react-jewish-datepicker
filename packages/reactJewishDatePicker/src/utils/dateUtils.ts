import Dayjs from "dayjs";
import { getGregDate, isValidDate } from "jewish-dates-core";
import {
	BasicJewishDate,
	BasicJewishDateRange,
	BasicJewishDay,
	DateRange,
} from "../interfaces";

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
): string => {
	if (isRange) {
		if (startDay?.jewishDateStrHebrew) {
			return isHebrew
				? `${startDay?.jewishDateStrHebrew} - ${
						endDay?.jewishDateStrHebrew || ""
				  }`
				: `${startDay?.jewishDateStr} - ${endDay?.jewishDateStr || ""}`;
		} else {
			return isHebrew ? "בחר תאריכים" : "Pick Dates";
		}
	} else if (selectedDay) {
		return isHebrew
			? selectedDay.jewishDateStrHebrew
			: selectedDay.jewishDateStr;
	} else {
		return isHebrew ? "בחר תאריך" : "Pick Date";
	}
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
