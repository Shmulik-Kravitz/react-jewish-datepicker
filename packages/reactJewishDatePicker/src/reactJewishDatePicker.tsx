import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import useOnClickOutside from "use-onclickoutside";
import { MdDateRange } from "@react-icons/all-files/md/MdDateRange";
import {
  BasicJewishDay,
  BasicJewishDate,
} from "jewish-dates-core";
import { BasicJewishDateRange, DateRange } from "./interfaces";
import { Month } from "./month";
import { getTestID } from "./utils";

import "./reactJewishDatePicker.css";
import {
  getDateStringForSelectedDay,
} from "./utils/dateUtils";

export interface ReactJewishDatePickerProps {
  className?: string;
  onClick: (startDay: BasicJewishDay, endDay: BasicJewishDay) => void;
  value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
  isHebrew?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
}

export const ReactJewishDatePicker: FC<ReactJewishDatePickerProps> = (
  { className, value, isHebrew = false, isRange, onClick, canSelect, customizeDayStyle }: ReactJewishDatePickerProps
) => {
  if (typeof value === "string") {
    throw new Error(
      "ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}"
    );
  }

  const [selectedDay, setSelectedDay] = useState<BasicJewishDay>();
  const [startDay, setStartDay] = useState<BasicJewishDay>();
  const [endDay, setEndDay] = useState<BasicJewishDay>();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  const [selectedDaysToDisplay, setSelectedDaysToDisplay] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (selectedDay || startDay || endDay) {
        setSelectedDaysToDisplay(getDateStringForSelectedDay(isRange, isHebrew, selectedDay, startDay, endDay));
      }
    }, 0);

    return () => clearTimeout(handler);
  }, [isRange, isHebrew, selectedDay, startDay, endDay]);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const classNames = `reactJewishDatePicker${isHebrew ? " isHebrew" : ""} ${
    className || ""
  }`;

  return (
    <div ref={ref} className={classNames}>
      <div
        data-testid={getTestID("selectedDate")}
        onClick={() => setOpen(!isOpen)}
        className={`selectedDate`}
      >
        <MdDateRange className="calendarIcon" />
        {selectedDaysToDisplay}
      </div>
      <div className={`monthWrapper ${isOpen ? "open" : ``}`}>
      <Month 
        onClick={onClick}
        value={value}
        isHebrew={isHebrew}
        isRange={isRange}
        canSelect={canSelect}
        customizeDayStyle={customizeDayStyle}
        isOpen={isOpen}
        setOpen={setOpen}
        setSelectedDay={setSelectedDay}
        setStartDay={setStartDay}
        setEndDay={setEndDay}
      />
      </div>
    </div>
  );
};