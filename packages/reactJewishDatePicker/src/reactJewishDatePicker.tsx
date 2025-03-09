import { useCallback, useState, useRef, useEffect } from "react";
import type { FC } from "react";
import useOnClickOutside from "use-onclickoutside";
import Dayjs from "dayjs";
import { MdDateRange } from "@react-icons/all-files/md/MdDateRange";
import {
  getJewishMonth,
  getWeekdays,
  getGregDate,
  getJewishDay,
  BasicJewishDay,
  BasicJewishDate,
  JewishMonth,
} from "jewish-dates-core";
import { BasicJewishDateRange, DateRange } from "./interfaces";
import { Day } from "./day";
import { Weekday } from "./weekday";
import { Navigation } from "./navigation";
import { getTestID } from "./utils";

import "./reactJewishDatePicker.css";
import {
  getDateInit,
  getDatesInOrder,
  getDateStringForSelectedDay,
  isDateRange,
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
  // const month = getJewishMonth(new Date("2020-05-24"));
  const dateInit = value ? getDateInit(value) : new Date();
  const endDateInit = isDateRange(value) && getDateInit(value.endDate);

  const [date, setDate] = useState(dateInit);
  const jewishMonthInfo = getJewishMonth(date);

  const [selectedDay, setSelectedDay] = useState<BasicJewishDay>(
    !isRange && value && jewishMonthInfo.selectedDay
  );
  const [startDay, setStartDay] = useState<BasicJewishDay>(
    isRange && isDateRange(value) && jewishMonthInfo.selectedDay
  );
  const [endDay, setEndDay] = useState<BasicJewishDay>(
    isRange && isDateRange(value) && getJewishDay(Dayjs(endDateInit))
  );
  const [isOpen, setOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const date = getDateInit(value);
    setDate(date);
    const jewishMonth = getJewishMonth(date);

    if (isRange && isDateRange(value)) {
      setStartDay(jewishMonth.selectedDay);
      const endDate = getDateInit(value.endDate);
      setEndDay(getJewishDay(Dayjs(endDate)));
    } else {
      setSelectedDay(jewishMonth.selectedDay);
    }
  }, [value]);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const handleClick = useCallback((day: BasicJewishDay) => {
    if (isRange) {
      if (!startDay || endDay) {
        setStartDay(day);
        setEndDay(null);
      } else {
        const [start, end] = getDatesInOrder(startDay, day);
        setStartDay(start);
        setEndDay(end);
        onClick?.call(null, start, end);
        setOpen(!isOpen);
      }
    } else {
      setSelectedDay(day);
      onClick?.call(null, day, undefined);
      setOpen(!isOpen);
    }
  }, [isRange, startDay, endDay, isOpen]);

  const handleMouseOver = useCallback((day: BasicJewishDay) => {
    setHoveredDay(day);
  }, []);

  const setBasicJewishDate = (basicJewishDate: BasicJewishDate) => {
    const gregDate = getGregDate(basicJewishDate);
    setDate(gregDate);
  };

  const handleNavigationClick = useCallback(
    (month: string, year: number) => {
      const basicJewishDate: BasicJewishDate = {
        year: year,
        monthName: JewishMonth[month],
        day: jewishMonthInfo.selectedDay.day,
      };
      // console.log(basicJewishDate);
      setBasicJewishDate(basicJewishDate);
    },
    [JewishMonth]
  );

  const [start, end] = getDatesInOrder(startDay, hoveredDay);

  const classNames = `reactJewishDatePicker${isHebrew ? " isHebrew" : ""} ${
    className || ""
  }`;
  const selectedDaysToDisplay = getDateStringForSelectedDay(
    isRange,
    isHebrew,
    selectedDay,
    startDay,
    endDay
  );

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
        <Navigation
          month={jewishMonthInfo.jewishMonthString}
          year={jewishMonthInfo.jewishYear}
          isHebrew={isHebrew}
          onClick={handleNavigationClick}
        />
        <div className="weekdayWrapper">
          {getWeekdays(isHebrew).map((weekday, index) => {
            return <Weekday key={weekday} value={weekday} />;
          })}
        </div>
        <div className={"month"}>
          {jewishMonthInfo.days.map((day, index) => {
            return (
              <Day
                key={day.jewishDateStr}
                {...day}
                canSelect={canSelect}
                customizeDayStyle={customizeDayStyle}
                onClick={handleClick}
                onMouseOver={isRange && handleMouseOver}
                selectedDay={selectedDay}
                isRange={isRange}
                isHebrew={isHebrew}
                startDay={!endDay ? start : startDay}
                endDay={endDay || end}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};