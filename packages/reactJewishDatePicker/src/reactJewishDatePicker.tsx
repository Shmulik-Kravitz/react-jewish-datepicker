import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { getJewishMonth, getWeekdays, getGregDate, BasicJewishDay, BasicJewishDate, isValidDate } from 'jewish-dates-core';

import { Day } from './day';
import { Weekday } from './weekday';
import { Navigation } from './navigation';
import { getTestID } from './utils';

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
    const dateInit = isValidDate(props.value) ? props.value : getGregDate(props.value);
    const [date, setDate] = React.useState(dateInit);
    const jewishMonth = getJewishMonth(date);

    const [selectedDay, setSelectedDay] = React.useState<BasicJewishDay>(props.value && jewishMonth.selectedDay);
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = (day: BasicJewishDay) => {
        const fullDate = props.isHebrew ? day.jewishDateStrHebrew : day.jewishDateStr;

        setSelectedDay(day);
        props?.onClick(day); 
        setOpen(!isOpen)
    };

    const setBasicJewishDate = (basicJewishDate: BasicJewishDate) => {
        const gregDate = getGregDate(basicJewishDate);
        setDate(gregDate);
    }; 

    const handleMonthClick = (month: string) => {
        const basicJewishDate: BasicJewishDate = { year: jewishMonth.jewishYear, monthName: month, day: jewishMonth.selectedDay.day } ;
        setBasicJewishDate(basicJewishDate);
    }; 
    const handleYearClick = (year: number) => {
        const basicJewishDate: BasicJewishDate = { year: year, monthName: jewishMonth.jewishMonthString, day: jewishMonth.selectedDay.day } ;
        setBasicJewishDate(basicJewishDate);
    }; 

    const handleNavigationClick = (month: string, year: number) => {
        const basicJewishDate: BasicJewishDate = { year: year, monthName: month, day: jewishMonth.selectedDay.day } ;
        setBasicJewishDate(basicJewishDate);
    }; 

    const classNames = `reactJewishDatePicker${props.isHebrew ? ` isHebrew` : ''}`;
    const selectedDayClass = selectedDay && (props.isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr);
    return (
        <div className={classNames}>
            <div  data-testid={getTestID('selectedDate')} onClick={() => setOpen(!isOpen)} className={`selectedDate`}>{selectedDayClass}</div>
            <div className={`monthWrapper ${isOpen ? `open` : ``}`}>
                <Navigation month={jewishMonth.jewishMonthString} year={jewishMonth.jewishYear} isHebrew={props.isHebrew} onClick={handleNavigationClick} />
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