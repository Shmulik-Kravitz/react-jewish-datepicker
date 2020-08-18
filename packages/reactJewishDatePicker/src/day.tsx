import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { JewishDay, BasicJewishDay } from './interfaces';
import { convertToHebrew } from './utils/jewishDateUtils';

export interface DayProps extends JewishDay {
    isHebrew?: boolean;
    value: string;
    onClick: (day: BasicJewishDay) => void;
}

export const Day: React.FC<DayProps> = (props: DayProps) => {
    const otherMonthClass = (!props.isCurrentMonth ? "otherMonth" : "");
    const selectedDayClass = (props.fullJewishDateString === props.value ? "selectedDayFlag" : "");

    const handleClick = () => {
        const { isHebrew, value, isCurrentMonth, day, dayjsDate, ...basicJewishDay } = props;
        props?.onClick(basicJewishDay);
    };

    return (
        <div className={`day ${otherMonthClass} ${selectedDayClass}`} onClick={handleClick}>
            {(props.isHebrew ? convertToHebrew(props.day, false, false) : props.day)}
        </div>
    )
}