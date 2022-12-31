import React from "react";
import { BasicJewishDay, ReactJewishDatePicker } from "../src";

export const App: React.FC<{}> = (_props) => {
    const [value, setValue] = React.useState<Date>(new Date());
    const handleClick = React.useCallback((day: BasicJewishDay) => {
        setValue(day.date);
    },[])
    return (
        <div>
            <ReactJewishDatePicker
              value={value}
              onClick={handleClick}
            ></ReactJewishDatePicker>
        </div>
    );
};