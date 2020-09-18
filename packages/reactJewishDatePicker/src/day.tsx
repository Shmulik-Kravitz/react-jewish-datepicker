import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { JewishDay, BasicJewishDay, convertToHebrew, JewishDate, IsJewishDatesEqual } from 'jewish-dates-core';

export interface DayProps extends JewishDay {
    isHebrew?: boolean;
    selectedDay: BasicJewishDay;
    onClick: (day: BasicJewishDay) => void;
}

export const Day: React.FC<DayProps> = (props: DayProps) => {
    const otherMonthClass = (!props.isCurrentMonth ? "otherMonth" : "");
    const selectedDayClass = props.selectedDay && (IsJewishDatesEqual(props.jewishDate, props.selectedDay.jewishDate) ? "selectedDayFlag" : "");

    const handleClick = () => {
        const { isHebrew, selectedDay, isCurrentMonth, day, dayjsDate, ...basicJewishDay } = props;
        props?.onClick(basicJewishDay);
    };

    return (
        <div className={`day ${otherMonthClass} ${selectedDayClass}`} onClick={handleClick}>
            {(props.isHebrew ? convertToHebrew(props.day, false, false) : props.day)}
        </div>
    )
}