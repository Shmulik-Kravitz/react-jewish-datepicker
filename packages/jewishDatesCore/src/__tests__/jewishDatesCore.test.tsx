import {
  isValidDate,
  getHebWeekdays,
  getEngWeekdays,
  getWeekdays,
  getHebJewishMonths,
  getEngJewishMonths,
  getJewishMonths,
  getJewishYears,
  getPrevMonth,
  getNextMonth,
  getGregDate,
  getJewishMonthInfo,
  getJewishDate,
  IsJewishDatesEqual,
  getJewishDay,
  getJewishMonth,
  getHolidays,
  dontSelectHolidays,
  dontSelectShabat,
  dontSelectShabatAndHolidays,
  dontSelectOutOfRange,
  addDates,
  subtractDates,
  BasicJewishDate,
  BasicJewishDay,
  JewishMonth
} from "../index";
import Dayjs from "dayjs";
import { BasicJewishMonthInfo, JewishDate } from "../interfaces";
import { it, expect, describe } from "vitest";


const basicJewishDate: BasicJewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
};
describe("jewishDatesCore", () => {
  it("is valid date", async () => {
    expect(isValidDate(new Date())).toBeTruthy();
  });

  it("is not valid date", async () => {
    expect(isValidDate(basicJewishDate)).toBeFalsy();
  });

  const hebWeekdays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const engWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  it("get hebrew weekdays", async () => {
    expect(getHebWeekdays()).toEqual(hebWeekdays);
  });

  it("get english weekdays", async () => {
    expect(getEngWeekdays()).toEqual(engWeekdays);
  });

  it("get weekdays in hebrew", async () => {
    expect(getWeekdays(true)).toEqual(hebWeekdays);
  });

  it("get weekdays in english", async () => {
    expect(getWeekdays(false)).toEqual(engWeekdays);
  });


  it("get hebrew jewish months", async () => {
    const hebJewishMonth = [
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

    expect(getHebJewishMonths()).toEqual(hebJewishMonth);
  });

  it("get english jewish months", async () => {
    const engJewishMonth = [
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

    expect(getEngJewishMonths()).toEqual(engJewishMonth);
  });

  it("get jewish months - hebrew, meubar", async () => {
    expect(getJewishMonths(5782, true)[5].text).toBe("אדר א");
  });

  it("get jewish months - english, meubar", async () => {
    expect(getJewishMonths(5784, false)[6].text).toEqual("AdarII");
  });

  it("get jewish months - hebrew, not meubar", async () => {
    expect(getJewishMonths(5781, true)[5].text).toBe("אדר");
  });

  it("get jewish months - english, not meubar", async () => {
    expect(getJewishMonths(5783, false)[5].text).toBe("Adar");
  });

  it("get jewish years", async () => {
    expect(getJewishYears(5785)[200]).toBe(5885);
    expect(getJewishYears(5785)[0]).toBe(5685);
  });

  const tishriInfo: BasicJewishMonthInfo = {
    isHebrew: false,
    month: JewishMonth.Tishri,
    year: 5782,
  };

  const elulInfo: BasicJewishMonthInfo = {
    isHebrew: false,
    month: JewishMonth.Elul,
    year: 5781,
  };

  it("get prev month", async () => {
    expect(getPrevMonth(tishriInfo)).toEqual(elulInfo);
  });

  it("get next month", async () => {
    expect(getNextMonth(elulInfo)).toEqual(tishriInfo);
  });

  it("get greg date", async () => {
    expect(getGregDate(basicJewishDate)).toEqual(new Date(2021, 7, 21));
  });

  it("get jewish month info", async () => {
    const jewishMonthInfo = {
      jewishDate: { year: 5782, month: 5, day: 25, monthName: "Shevat" },
      jewishMonth: 5,
      startOfJewishMonth: Dayjs(new Date(2022, 0, 3)),
      sundayStartOfTheMonth: Dayjs(new Date(2022, 0, 2)),
    };
    expect(getJewishMonthInfo(new Date(2022, 0, 27))).toEqual(jewishMonthInfo);
  });

  const jewishDate: JewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5781,
    month: 12,
  };


  it("get jewish date", async () => {
    expect(getJewishDate(new Date(2021, 7, 21))).toEqual(jewishDate);
  });

  const jewishDate2: JewishDate = {
    year: 5782,
    month: 5,
    day: 25,
    monthName: "Shevat",
  };

  it("Is jewish dates equal", async () => {
    expect(IsJewishDatesEqual(jewishDate, jewishDate)).toBeTruthy();
  });

  it("Is jewish dates not equal", async () => {
    expect(IsJewishDatesEqual(jewishDate, jewishDate2)).toBeFalsy();
  });

  it("get jewish day", async () => {
    const date = Dayjs(new Date(2022, 0, 27));
    const jewishDay = {
      date: date.toDate(),
      day: 25,
      dayjsDate: date,
      isCurrentMonth: false,
      jewishDate: { year: 5782, month: 5, day: 25, monthName: "Shevat" },
      jewishDateStr: "25 Shevat 5782",
      jewishDateStrHebrew: "כ״ה שבט התשפ״ב",
    };

    expect(getJewishDay(date)).toEqual(jewishDay);
  });

  it("get jewish month", async () => {
    const date = new Date(2022, 0, 27);
    const jewishDay = {
      date: date,
      day: 25,
      dayjsDate: Dayjs(date),
      isCurrentMonth: true,
      jewishDate: { year: 5782, month: 5, day: 25, monthName: "Shevat" },
      jewishDateStr: "25 Shevat 5782",
      jewishDateStrHebrew: "כ״ה שבט התשפ״ב",
    };

    expect(getJewishMonth(date).jewishMonth).toBe(5);
    expect(getJewishMonth(date).jewishYear).toBe(5782);
    expect(getJewishMonth(date).jewishMonthString).toBe("Shevat");
    expect(getJewishMonth(date).days[25]).toEqual(jewishDay);
    expect(getJewishMonth(date).selectedDay).toEqual(jewishDay);
  });

  it("get holidays of israel", async () => {
    const israelHolidays = [
      "1 Tishri",
      "2 Tishri",
      "10 Tishri",
      "15 Tishri",
      "22 Tishri",
      "15 Nisan",
      "21 Nisan",
      "6 Sivan",
    ];
    expect(getHolidays(true)).toEqual(israelHolidays);
  });

  it("get holidays of chul", async () => {
    const chulHolidays = [
      "1 Tishri",
      "2 Tishri",
      "10 Tishri",
      "15 Tishri",
      "22 Tishri",
      "15 Nisan",
      "21 Nisan",
      "6 Sivan",
      "16 Tishri",
      "23 Tishri",
      "16 Nisan",
      "22 Nisan",
      "7 Sivan",
    ];
    expect(getHolidays(false)).toEqual(chulHolidays);
  });

  const nisan_16_5782: BasicJewishDay = {
    date: new Date(2022, 3, 17),
    jewishDate: { year: 5782, month: 7, day: 16, monthName: "Nisan" },
    jewishDateStr: "16 Nisan 5782",
    jewishDateStrHebrew: "ט״ז ניסן התשפ״ב",
  };
  const nisan_21_5782: BasicJewishDay = {
    date: new Date(2022, 3, 22),
    jewishDate: { year: 5782, month: 7, day: 21, monthName: "Nisan" },
    jewishDateStr: "21 Nisan 5782",
    jewishDateStrHebrew: "כ״א ניסן התשפ״ב",
  };
  const nisan_22_5782: BasicJewishDay = {
    date: new Date(2022, 3, 23),
    jewishDate: { year: 5782, month: 7, day: 22, monthName: "Nisan" },
    jewishDateStr: "22 Nisan 5782",
    jewishDateStrHebrew: "כ״ב ניסן התשפ״ב",
  };

  it("dont select holidays - israel, yom tov rishon", async () => {
    expect(dontSelectHolidays(true)(nisan_21_5782)).toBeFalsy();
  });

  it("dont select holidays - israel, yom tov sheni", async () => {
    expect(dontSelectHolidays(true)(nisan_22_5782)).toBeTruthy();
  });

  it("dont select holidays - chul, yom tov sheni", async () => {
    expect(dontSelectHolidays(false)(nisan_22_5782)).toBeFalsy();
  });

  it("dont select shabat - shabat", async () => {
    expect(dontSelectShabat(nisan_22_5782)).toBeFalsy();
  });

  it("dont select shabat - not shabat", async () => {
    expect(dontSelectShabat(nisan_21_5782)).toBeTruthy();
  });

  it("dont select shabat and holidays - israel, yom tov rishon", async () => {
    expect(dontSelectShabatAndHolidays(true)(nisan_21_5782)).toBeFalsy();
  });

  it("dont select shabat and holidays - israel, shabat and yom tov sheni", async () => {
    expect(dontSelectShabatAndHolidays(true)(nisan_22_5782)).toBeFalsy();
  });

  it("dont select shabat and holidays - israel, not shabat and yom tov sheni", async () => {
    expect(dontSelectShabatAndHolidays(true)(nisan_16_5782)).toBeTruthy();
  });

  it("dont select shabat and holidays - chul, not shabat and yom tov sheni", async () => {
    expect(dontSelectShabatAndHolidays(false)(nisan_16_5782)).toBeFalsy();
  });

  it("dont select out of range - out of range", async () => {
    expect(
      dontSelectOutOfRange(
        new Date(2022, 3, 17),
        new Date(2022, 3, 22)
      )(nisan_22_5782)
    ).toBeFalsy();
  });

  it("dont select out of range - within range", async () => {
    expect(
      dontSelectOutOfRange(
        new Date(2022, 3, 17),
        new Date(2022, 3, 22)
      )(nisan_21_5782)
    ).toBeTruthy();
  });

  it("add dates on basicJewishDate", async () => {
    expect(addDates(basicJewishDate, 4)).toEqual(new Date(2021, 7, 25));
  });

  it("add dates on Date", async () => {
    expect(addDates(new Date(2022, 3, 17), 3)).toEqual(new Date(2022, 3, 20));
  });

  it("subtract dates from basicJewishDate", async () => {
    expect(subtractDates(basicJewishDate, 4)).toEqual(new Date(2021, 7, 17));
  });

  it("subtract dates from Date", async () => {
    expect(subtractDates(new Date(2022, 3, 17), 3)).toEqual(
      new Date(2022, 3, 14)
    );
  });
});
