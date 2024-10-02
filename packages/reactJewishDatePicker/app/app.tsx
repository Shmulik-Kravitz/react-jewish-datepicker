import { useState, useCallback } from "react";
import { BasicJewishDay, ReactJewishDatePicker } from "../src";

export const App: React.FC<{}> = (_props) => {
    const [value, setValue] = useState<Date>(new Date());
    const handleClick = useCallback((day: BasicJewishDay) => {
        console.log(day);
        setValue(day.date);
    },[]);

    // const handleClick = (day: BasicJewishDay) => {
    //     console.log(day);
    //     setValue(day.date);
    // };
    return (
        <div>
            <ReactJewishDatePicker
              value={value}
              onClick={handleClick}
            ></ReactJewishDatePicker>
        </div>
    );
};