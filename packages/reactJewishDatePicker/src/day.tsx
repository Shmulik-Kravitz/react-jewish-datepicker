import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { JewishDay, BasicJewishDay, convertToHebrew, JewishDate, IsJewishDatesEqual } from 'jewish-dates-core';
import { isFromTest } from './utils';

export interface DayProps extends JewishDay {
    isHebrew?: boolean;
    selectedDay: BasicJewishDay;
    onClick: (day: BasicJewishDay) => void;
}

export const Day: React.FC<DayProps> = (props: DayProps) => {
    

    const handleClick = () => {
        const { isHebrew, selectedDay, isCurrentMonth, day, dayjsDate, ...basicJewishDay } = props;
        props?.onClick(basicJewishDay);
    };

    const day = (props.isHebrew ? convertToHebrew(props.day, false, false) : props.day);
    const title = props.isHebrew ? props.jewishDateStrHebrew : props.jewishDateStr;


    const otherMonthClass = (!props.isCurrentMonth ? " otherMonth" : "");
    const selectedDayClass = props.selectedDay && (IsJewishDatesEqual(props.jewishDate, props.selectedDay.jewishDate) ? " selectedDay" : "");
    const classNames = `day${otherMonthClass}${selectedDayClass}`;

    return (
        <div data-testid={isFromTest() ? title : undefined} className={classNames} title={title} onClick={handleClick}>
            {day}
        </div>
    )
}
