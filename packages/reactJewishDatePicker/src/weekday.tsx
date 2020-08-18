import * as React from 'react';
import "./reactJewishDatePicker.scss";

export interface WeekdayProps {
    value: string;
}

export const Weekday: React.FC<WeekdayProps> = (props: WeekdayProps) => {

    return (
        <div className="weekday" >
            {props.value}
        </div>
    )
}