import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { getJewishMonth, getWeekdays, getGregDate } from './utils/jewishDateUtils';

import { BasicJewishDay } from './interfaces';
import { Day } from './day';
import { Weekday } from './weekday';
import { Navigation } from './navigation';

export interface ReactJewishDatePickerProps {
    onClick: (day: BasicJewishDay) => void;
    isHebrew: boolean;
}

export const ReactJewishDatePicker: React.FC<ReactJewishDatePickerProps> = (props: ReactJewishDatePickerProps) => {
    const [value, setValue] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState<number>(5780);
    const [isOpen, setOpen] = React.useState(false);

    const date = getGregDate(month, year);

    const jewishMonth = getJewishMonth(date);
    // const month = getJewishMonth(new Date("2020-05-24"));

    if (jewishMonth.jewishMonthString !== month) {
        setMonth(jewishMonth.jewishMonthString);
    }

    if (jewishMonth.jewishYear !== year) {
        setYear(jewishMonth.jewishYear);
    }

    const handleClick = (day: BasicJewishDay) => {
        const fullDate = props.isHebrew ? day.fullHebrewJewishDateString : day.fullJewishDateString;

        setValue(fullDate);
        props?.onClick(day);
        setOpen(!isOpen)
    };

    return (
        <div className={`reactJewishDatePicker`}>
            <div className={`selectedDay`} onClick={() => setOpen(!isOpen)}>{value}</div>
            <div className={`monthWrapper ${isOpen ? `open` : ``}`}>
                <Navigation setMonth={setMonth} setYear={setYear} month={month} year={year} isHebrew={props.isHebrew} />
                <div className={`month`}>
                    {getWeekdays(props.isHebrew).map((weekday, index) => {
                        return <Weekday key={index} value={weekday} />
                    })}
                    {jewishMonth.days.map((day, index) => {
                        return <Day key={index} {...day} onClick={handleClick} value={value} isHebrew={props.isHebrew} />
                    })}
                </div>
            </div>
        </div>
    );
}