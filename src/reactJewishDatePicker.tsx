import * as React from 'react';
import "./reactJewishDatePicker.scss";

export interface ReactJewishDatePickerProps {

}

export const ReactJewishDatePicker: React.FC<ReactJewishDatePickerProps> = (props: ReactJewishDatePickerProps) => {
    return (
        <div className={"reactJewishDatePicker"}>
            Date Picker
        </div>
    )
}