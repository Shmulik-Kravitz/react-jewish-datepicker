import {
  toJewishDate,
  toGregorianDate,
  formatJewishDateInHebrew,
  BasicJewishDate as BasicJewishDateConverter,
  JewishMonthType,
  JewishMonth as OrigJewishMonth,
  isLeapYear,
  formatJewishDate
} from "jewish-date";
import gematriya from "gematriya";
import Dayjs from "dayjs";
import {
  JewishDate,
  JewishDay,
  JewishMonthMetadata,
  JewishMonthInfo,
  BasicJewishMonthInfo,
  IdText,
  BasicJewishDate,
  BasicJewishDay,
} from "./interfaces";

export function isValidDate(date: Date | BasicJewishDate): date is Date {
  return date && Object.prototype.toString.call(date) === "[object Date]";
}

export const getHebWeekdays = (): string[] => {
  return ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
};

export const getEngWeekdays = (): string[] => {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
};

export const getWeekdays = (isHebrew: boolean): string[] => {
  return isHebrew ? getHebWeekdays() : getEngWeekdays();
};

export const convertToHebrew = (
  num: number,
  addGeresh = true,
  addPunctuate = true
): string => {
  return gematriya(num, { geresh: addGeresh, punctuate: addPunctuate });
};

export const getHebJewishMonths = (): IdText[] => {
  return [
    {
      id: "Tishri",
      text: "תשרי",
    },
    {
      id: "Cheshvan",
      text: "חשון",
    },
    {
      id: "Kislev",
      text: "כסלו",
    },
    {
      id: "Tevet",
      text: "טבת",
    },
    {
      id: "Shevat",
      text: "שבט",
    },
    {
      id: "AdarI",
      text: "אדר א",
    },
    {
      id: "AdarII",
      text: "אדר ב",
    },
    {
      id: "Nisan",
      text: "ניסן",
    },
    {
      id: "Iyyar",
      text: "אייר",
    },
    {
      id: "Sivan",
      text: "סיון",
    },
    {
      id: "Tammuz",
      text: "תמוז",
    },
    {
      id: "Av",
      text: "אב",
    },
    {
      id: "Elul",
      text: "אלול",
    },
  ];
};

export const getEngJewishMonths = (): IdText[] => {
  return [
    {
      id: "Tishri",
      text: "Tishri",
    },
    {
      id: "Cheshvan",
      text: "Cheshvan",
    },
    {
      id: "Kislev",
      text: "Kislev",
    },
    {
      id: "Tevet",
      text: "Tevet",
    },
    {
      id: "Shevat",
      text: "Shevat",
    },
    {
      id: "AdarI",
      text: "AdarI",
    },
    {
      id: "AdarII",
      text: "AdarII",
    },
    {
      id: "Nisan",
      text: "Nisan",
    },
    {
      id: "Iyyar",
      text: "Iyyar",
    },
    {
      id: "Sivan",
      text: "Sivan",
    },
    {
      id: "Tammuz",
      text: "Tammuz",
    },
    {
      id: "Av",
      text: "Av",
    },
    {
      id: "Elul",
      text: "Elul",
    },
  ];
};

export const getJewishMonths = (year: number, isHebrew?: boolean): IdText[] => {
  const months = isHebrew ? getHebJewishMonths() : getEngJewishMonths();

  if (isLeapYear(year)) {
    return months;
  } else {
    return months
      .filter((month) => month.id !== "AdarII")
      .map((month) => {
        if (month.id == "AdarI") {
          return {
            id: "AdarI",
            text: isHebrew ? "אדר" : "Adar",
          };
        } else {
          return month;
        }
      });
  }
};

export const getJewishYears = (year: number = 5780): number[] => {
  const years: number[] = [];
  for (let i = 100; i > 0; i--) {
    const element = year - i;
    years.push(element);
  }
  years.push(year);
  for (let i = 1; i <= 100; i++) {
    const element = year + i;
    years.push(element);
  }
  return years;
};

export const getPrevMonth = (
  basicJewishMonthInfo: BasicJewishMonthInfo
): BasicJewishMonthInfo => {
  const result = { ...basicJewishMonthInfo };
  const months = getJewishMonths(
    basicJewishMonthInfo.year,
    basicJewishMonthInfo.isHebrew
  );

  const monthIndex = months
    .map((month) => month.id)
    .indexOf(basicJewishMonthInfo.month);

  if (monthIndex !== -1) {
    if (monthIndex === 0) {
      result.month = months[months.length - 1].id;
      result.year--;
    } else {
      result.month = months[monthIndex - 1].id;
    }
  }

  return result;
};

export const getNextMonth = (
  basicJewishMonthInfo: BasicJewishMonthInfo
): BasicJewishMonthInfo => {
  const result = { ...basicJewishMonthInfo };
  const months = getJewishMonths(basicJewishMonthInfo.year);
  const monthIndex = months
    .map((month) => month.id)
    .indexOf(basicJewishMonthInfo.month);

  if (monthIndex !== -1) {
    if (monthIndex === months.length - 1) {
      result.month = months[0].id;
      result.year++;
    } else {
      result.month = months[monthIndex + 1].id;
    }
  }

  return result;
};

export const getGregDate = (props: BasicJewishDate): Date => {
  if (!props || props.monthName === OrigJewishMonth.None || props.year < 1 || props.day < 1) {
    return new Date();
  }

  // const day = new HeDate.HDate(props.day, props.monthName, props.year);
  // return day.greg();
  const jewishDate: BasicJewishDateConverter = {
    day: props.day,
    monthName: props.monthName as unknown as JewishMonthType,
    year: props.year,
  };
  const date = toGregorianDate(jewishDate);

  return date;
};

export const getJewishMonthInfo = (date: Date): JewishMonthMetadata => {
  const jewishDate: JewishDate = getJewishDate(date);
  const startOfJewishMonth = Dayjs(date).subtract(jewishDate.day - 1, "day");

  const dayOfWeek: number = Number(startOfJewishMonth.format("d"));
  const sundayStartOfTheMonth = startOfJewishMonth.subtract(dayOfWeek, "day");

  return {
    jewishDate,
    jewishMonth: jewishDate.month,
    startOfJewishMonth,
    sundayStartOfTheMonth,
  };
};

export const getJewishDate = (date: Date): JewishDate => {
  const hebDate = toJewishDate(date);

  const months = getEngJewishMonths();

  const month = months.findIndex((i) => i.id === hebDate.monthName) + 1;
  return {
    year: hebDate.year,
    month: month,
    day: hebDate.day,
    monthName: hebDate.monthName,
  };
};

export const IsJewishDatesEqual = (
  jewishDate1: JewishDate,
  jewishDate2: JewishDate
): boolean => {
  return (
    jewishDate1 &&
    jewishDate2 &&
    jewishDate1.day === jewishDate2.day &&
    jewishDate1.month === jewishDate2.month &&
    jewishDate1.year === jewishDate2.year
  );
};

export const getJewishDay = (dayjsDate: Dayjs.Dayjs): JewishDay => {
  const jewishDate: JewishDate = getJewishDate(dayjsDate.toDate());
  const day: JewishDay = {
    day: jewishDate.day,
    jewishDateStr: formatJewishDate(jewishDate),
    jewishDateStrHebrew: formatJewishDateInHebrew(jewishDate),
    jewishDate: jewishDate,
    dayjsDate: dayjsDate,
    date: dayjsDate.toDate(),
    isCurrentMonth: false,
  };

  return day;
};

export const getJewishMonth = (date: Date): JewishMonthInfo => {
  const jewishMonthInfo = getJewishMonthInfo(date);

  const jewishMonth: JewishMonthInfo = {
    selectedDay: null,
    jewishMonth: jewishMonthInfo.jewishMonth,
    jewishYear: jewishMonthInfo.jewishDate.year,
    jewishMonthString: jewishMonthInfo.jewishDate.monthName,
    days: [],
  };
  let currentDate = jewishMonthInfo.sundayStartOfTheMonth;

  for (let i = 0; i < 42; i++) {
    const day = getJewishDay(currentDate);
    day.isCurrentMonth = jewishMonth.jewishMonth === day.jewishDate.month;
    if (IsJewishDatesEqual(jewishMonthInfo.jewishDate, day.jewishDate)) {
      jewishMonth.selectedDay = day;
    }
    if (i < 7 || day.isCurrentMonth || day.date.getDay() > 0) {
      jewishMonth.days.push(day);
      currentDate = currentDate.add(1, "day");
    }
  }

  return jewishMonth;
};

export const getHolidays = (isIsrael: boolean): string[] => {
  const holidays = [
    "1 Tishri",
    "2 Tishri",
    "10 Tishri",
    "15 Tishri",
    "22 Tishri",
    "15 Nisan",
    "21 Nisan",
    "6 Sivan",
  ];
  if (!isIsrael) {
    holidays.push("16 Tishri", "23 Tishri", "16 Nisan", "22 Nisan", "7 Sivan");
  }

  return holidays;
};

export const dontSelectHolidays = (isIsrael?: boolean): any => {
  const holidays = getHolidays(isIsrael);

  return (day: BasicJewishDay): boolean => {
    return !holidays.includes(
      `${day.jewishDate.day} ${day.jewishDate.monthName}`
    );
  };
};

export const dontSelectShabat = (day: BasicJewishDay): boolean => {
  const dayOfWeek = day.date.getDay();

  return dayOfWeek !== 6;
};

export const dontSelectShabatAndHolidays = (isIsrael?: boolean): any => {
  return (day: BasicJewishDay): boolean => {
    return dontSelectShabat(day) && dontSelectHolidays(isIsrael)(day);
  };
};

export const dontSelectOutOfRange = (
  minDate: Date | null,
  maxDate: Date | null
): any => {
  const min = minDate && Dayjs(minDate).subtract(1, "day").startOf("date");
  const max = maxDate && Dayjs(maxDate).add(1, "day").startOf("date");

  return (day: BasicJewishDay) => {
    const date = Dayjs(day.date).startOf("date");

    if (min && max) {
      return date.isAfter(min) && date.isBefore(max);
    } else if (min) {
      return date.isAfter(min);
    } else if (max) {
      return date.isBefore(max);
    }
    return false;
  };
};

export const addDates = (
  date: BasicJewishDate | Date,
  numDays: number
): Date => {
  const formatedDate = isValidDate(date) ? date : getGregDate(date);

  return Dayjs(formatedDate).add(numDays, "day").toDate();
};

export const subtractDates = (
  date: BasicJewishDate | Date,
  numDays: number
): Date => {
  const formatedDate = isValidDate(date) ? date : getGregDate(date);

  return Dayjs(formatedDate).subtract(numDays, "day").toDate();
};


