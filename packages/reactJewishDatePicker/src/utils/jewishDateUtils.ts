import * as hebrewDateN from 'hebrew-date';
import * as heDate from 'hebcal';
import gematriya from 'gematriya';

// import { HDate } from '@hebcal/core';

import * as Dayjs from 'dayjs';
import { JewishDate, JewishDay, JewishMonthInfo, JewishMonth, BasicJewishMonthInfo } from '../interfaces';
const dayjs = Dayjs.default;
const HeDate = heDate.default;
const hebrewDate = hebrewDateN.default;

export const isMeubar = (year) => {
    const yearindex = year % 19;
    return (yearindex === 0 || yearindex === 3 || yearindex === 6 || yearindex === 8 || yearindex === 11 || yearindex === 14 || yearindex === 17);
}

export const getHebWeekdays = () => {
    return ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז'];
};

export const getEngWeekdays = () => {
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
};

export const getWeekdays = (isHebrew: boolean) => {
    return isHebrew ? getHebWeekdays() : getEngWeekdays();
};

export const convertToHebrew = (num: number, addGeresh = true, addPunctuate = true) => {
    return gematriya(num, { geresh: addGeresh, punctuate: addPunctuate });
}

export const getHebJewishMonthById = (monthId: string) => {
    const months = getHebJewishMonths();
    const monthIndex = months.map((month) => month.id).indexOf(monthId);
    
    return months[monthIndex].text;
};

export const getHebJewishMonths = () => {

    return [{
        id: 'Tishri',
        text: 'תשרי',
    },
    {
        id: 'Heshvan',
        text: 'חשון',
    },
    {
        id: 'Kislev',
        text: 'כסלו',
    },
    {
        id: 'Tevet',
        text: 'טבת',
    },
    {
        id: 'Shevat',
        text: 'שבט',
    },
    {
        id: 'AdarI',
        text: 'אדר א',
    },
    {
        id: 'AdarII',
        text: 'אדר ב',
    },
    {
        id: 'Nisan',
        text: 'ניסן',
    },
    {
        id: 'Iyyar',
        text: 'אייר',
    },
    {
        id: 'Sivan',
        text: 'סיון',
    },
    {
        id: 'Tammuz',
        text: 'תמוז',
    },
    {
        id: 'Av',
        text: 'אב',
    },
    {
        id: 'Elul',
        text: 'אלול'
    }];
};

export const getEngJewishMonths = () => {

    return [{
        id: 'Tishri',
        text: 'Tishri',
    },
    {
        id: 'Heshvan',
        text: 'Heshvan',
    },
    {
        id: 'Kislev',
        text: 'Kislev',
    },
    {
        id: 'Tevet',
        text: 'Tevet',
    },
    {
        id: 'Shevat',
        text: 'Shevat',
    },
    {
        id: 'AdarI',
        text: 'AdarI',
    },
    {
        id: 'AdarII',
        text: 'AdarII',
    },
    {
        id: 'Nisan',
        text: 'Nisan',
    },
    {
        id: 'Iyyar',
        text: 'Iyyar',
    },
    {
        id: 'Sivan',
        text: 'Sivan',
    },
    {
        id: 'Tammuz',
        text: 'Tammuz',
    },
    {
        id: 'Av',
        text: 'Av',
    },
    {
        id: 'Elul',
        text: 'Elul',
    }];
};

export const getJewishMonths = (year: number, isHebrew?: boolean) => {
    const months = isHebrew ? getHebJewishMonths() : getEngJewishMonths();

    if (isMeubar(year)) {
        return months;
    } else {
        return months.filter(month => month.id !== 'AdarII')
    }
};

export const getJewishYears = (year: number = 5780) => {
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

export const getPrevMonth = (basicJewishMonthInfo: BasicJewishMonthInfo): BasicJewishMonthInfo => {
    const result = { ...basicJewishMonthInfo };
    const months = getJewishMonths(basicJewishMonthInfo.year, basicJewishMonthInfo.isHebrew);

    const monthIndex = months.map((month) => month.id).indexOf(basicJewishMonthInfo.month);

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

export const getNextMonth = (basicJewishMonthInfo: BasicJewishMonthInfo): BasicJewishMonthInfo => {
    const result = { ...basicJewishMonthInfo };
    const months = getJewishMonths(basicJewishMonthInfo.year);
    const monthIndex = months.map((month) => month.id).indexOf(basicJewishMonthInfo.month);

    if (monthIndex !== -1) {
        if (monthIndex === (months.length - 1)) {
            result.month = months[0].id;
            result.year++;

        } else {
            result.month = months[monthIndex + 1].id;
        }
    }
    return result;
};

export const getGregDate = (jewishMonth: string, jewishYear: number) => {
    if (jewishMonth === '' || jewishYear < 1) {
        return new Date();
    }
    if (jewishMonth === 'Heshvan') {
        jewishMonth = 'Cheshvan';
    }
    const day = new HeDate.HDate(1, jewishMonth, jewishYear);

    return day.greg();
}

export const getJewishMonthInfo = (date: Date): JewishMonthInfo => {
    const jewishDate: JewishDate = getJewishDate(date);
    const startOfJewishMonth = dayjs(date).subtract(jewishDate.date - 1, 'day');
    const dayOfWeek: number = Number(startOfJewishMonth.format("d"));
    const sundayStartOfTheMonth = startOfJewishMonth.subtract(dayOfWeek, 'day');
    return { jewishDate, jewishMonth: jewishDate.month, startOfJewishMonth, sundayStartOfTheMonth }
}

export const formatJewishDate = (jewishDate: JewishDate) => {
    return `${jewishDate.date} ${jewishDate.monthName} ${jewishDate.year}`;
}

export const formatJewishDateHebrew = (jewishDate: JewishDate) => {
    return `${convertToHebrew(jewishDate.date)} ${getHebJewishMonthById(jewishDate.monthName)} ${convertToHebrew(jewishDate.year)}`;
}

export const getJewishDate = (date: Date): JewishDate => {
    const hebDate = hebrewDate(date);

    return {
        year: hebDate.year,
        month: hebDate.month,
        date: hebDate.date,
        monthName: hebDate.month_name
    }
}

export const getJewishMonth = (date: Date) => {
    const jewishMonthInfo = getJewishMonthInfo(date);

    const jewishMonth: JewishMonth = { jewishMonth: jewishMonthInfo.jewishMonth, jewishYear: jewishMonthInfo.jewishDate.year, jewishMonthString: jewishMonthInfo.jewishDate.monthName, days: [] };
    let currentDate = jewishMonthInfo.sundayStartOfTheMonth;

    for (let i = 0; i < 35; i++) {

        const jewishDate: JewishDate = getJewishDate(currentDate.toDate());
        const day: JewishDay = {
            day: jewishDate.date,
            fullJewishDateString: formatJewishDate(jewishDate),
            fullHebrewJewishDateString: formatJewishDateHebrew(jewishDate),
            jewishDate: jewishDate,
            dayjsDate: currentDate,
            date: currentDate.toDate(),
            isCurrentMonth: jewishMonth.jewishMonth === jewishDate.month
        }
        jewishMonth.days.push(day);
        currentDate = currentDate.add(1, 'day');
    }

    return jewishMonth;
}