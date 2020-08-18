import * as Dayjs from 'dayjs';

export interface JewishDate {
    date: number;
    month: number;
    year: number;
    monthName: string;
}

export interface BasicJewishDay {
    fullJewishDateString: string;
    fullHebrewJewishDateString: string;
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

export interface JewishMonthInfo {
    jewishDate: JewishDate;
    jewishMonth: number;
    startOfJewishMonth: Dayjs.Dayjs;
    sundayStartOfTheMonth: Dayjs.Dayjs;
}


export interface JewishMonth {
    jewishYear: number;
    jewishMonth: number;
    jewishMonthString: string;
    days: JewishDay[];
}
