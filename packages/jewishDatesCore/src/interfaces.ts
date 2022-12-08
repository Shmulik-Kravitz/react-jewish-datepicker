import * as Dayjs from "dayjs";
import {
  BasicJewishDate as OrigBasicJewishDate,
  JewishDate as OrigJewishDate,
} from "jewish-date";

export type BasicJewishDate = OrigBasicJewishDate;
export type JewishDate = OrigJewishDate;


export interface BasicJewishDay {
  jewishDateStr: string;
  jewishDateStrHebrew: string;
  jewishDate: JewishDate;
  date: Date;
}

export interface JewishDay extends BasicJewishDay {
  day: number;
  isCurrentMonth: boolean;
  dayjsDate: Dayjs.Dayjs;
}

export interface Month {
  id: string;
  text: string;
}

export interface BasicJewishMonthInfo {
  month: string;
  year: number;
  isHebrew?: boolean;
}

export interface JewishMonthMetadata {
  jewishDate: JewishDate;
  jewishMonth: number;
  startOfJewishMonth: Dayjs.Dayjs;
  sundayStartOfTheMonth: Dayjs.Dayjs;
}

export interface JewishMonthInfo {
  selectedDay: JewishDay;
  jewishYear: number;
  jewishMonth: number;
  jewishMonthString: string;
  days: JewishDay[];
}

export interface IdText {
  id: string;
  text: string;
}
