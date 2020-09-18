import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { getJewishMonth, getWeekdays, getGregDate, BasicJewishDay, BasicJewishDate, isValidDate } from 'jewish-dates-core';

import { Day } from './day';
import { Weekday } from './weekday';
import { Navigation } from './navigation';

export interface ReactJewishDatePickerProps {
    // jewishDate?: string;
    onClick: (day: BasicJewishDay) => void;
    value?: BasicJewishDate | Date;
    isHebrew: boolean;
}

export const ReactJewishDatePicker: React.FC<ReactJewishDatePickerProps> = (props: ReactJewishDatePickerProps) => {
    if (typeof props.value == 'string') {
        throw new Error("ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}");
    }
    // const month = getJewishMonth(new Date("2020-05-24"));
    const date = isValidDate(props.value) ? props.value : getGregDate(props.value);
    const jewishMonth = getJewishMonth(date);

    const [selectedDay, setSelectedDay] = React.useState<BasicJewishDay>(props.value && jewishMonth.selectedDay);
    const [month, setMonth] = React.useState(jewishMonth.jewishMonthString);
    const [year, setYear] = React.useState<number>(jewishMonth.jewishYear);
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = (day: BasicJewishDay) => {
        const fullDate = props.isHebrew ? day.jewishDateStrHebrew : day.jewishDateStr;

        setSelectedDay(day);
        props?.onClick(day);
        setOpen(!isOpen)
    };

    const classNames = `reactJewishDatePicker${props.isHebrew ? ` isHebrew` : ''}`;
    const selectedDayClass = selectedDay && (props.isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr);
    return (
        <div className={classNames}>
            <div onClick={() => setOpen(!isOpen)} className={`selectedDay`}>{selectedDayClass}</div>
            <div className={`monthWrapper ${isOpen ? `open` : ``}`}>
                <Navigation setMonth={setMonth} setYear={setYear} month={month} year={year} isHebrew={props.isHebrew} />
                <div className={`month`}>
                    {getWeekdays(props.isHebrew).map((weekday, index) => {
                        return <Weekday key={index} value={weekday} />
                    })}
                    {jewishMonth.days.map((day, index) => {
                        return <Day key={index} {...day} onClick={handleClick} selectedDay={selectedDay} isHebrew={props.isHebrew} />
                    })}
                </div>
            </div>
        </div>
    );
}