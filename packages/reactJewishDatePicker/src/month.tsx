import { useCallback, useState, useRef, useEffect } from "react";
import type { FC } from "react";
import useOnClickOutside from "use-onclickoutside";
import Dayjs from "dayjs";
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
import {
  getDateInit,
  getDatesInOrder,
  isDateRange,
} from "./utils/dateUtils";

import "./month.css";

export interface MonthProps {
  onClick: (startDay: BasicJewishDay, endDay: BasicJewishDay) => void;
  value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
  isHebrew?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
  isOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
  setSelectedDay?: (day: BasicJewishDay) => void;
  setStartDay?: (day: BasicJewishDay) => void;
  setEndDay?: (day: BasicJewishDay) => void;
}

export const Month: FC<MonthProps> = (
  { value, isHebrew = false, isRange, onClick, canSelect, customizeDayStyle, isOpen, setOpen, ...props }: MonthProps
) => {
  if (typeof value === "string") {
    throw new Error(
      "ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}"
    );
  }

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
  const [hoveredDay, setHoveredDay] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const date = getDateInit(value);
    setDate(date);
    const jewishMonth = getJewishMonth(date);
    const start = jewishMonth.selectedDay

    if (isRange && isDateRange(value)) {
      setStartDay(start);
      props.setStartDay && props.setStartDay(start);
      const endDate = getDateInit(value.endDate);
      const end = getJewishDay(Dayjs(endDate))
      setEndDay(end);
      props.setEndDay && props.setEndDay(end);
    } else {
      setSelectedDay(start);
      props.setSelectedDay && props.setSelectedDay(start);
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
        props.setStartDay && props.setStartDay(day);
        props.setEndDay && props.setEndDay(null);
      } else {
        const [start, end] = getDatesInOrder(startDay, day);
        setStartDay(start);
        setEndDay(end);
        props.setStartDay && props.setStartDay(start);
        props.setEndDay && props.setEndDay(end);
        onClick?.call(null, start, end);
        setOpen && setOpen(!isOpen);
      }
    } else {
      setSelectedDay(day);
      props.setSelectedDay && props.setSelectedDay(day);
      onClick?.call(null, day, undefined);
      setOpen && setOpen(!isOpen);
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
      setBasicJewishDate(basicJewishDate);
    },
    [JewishMonth]
  );

  const [start, end] = getDatesInOrder(startDay, hoveredDay);
  const classNames = `monthContainer${isHebrew ? " isHebrew" : ""}`;
  return (
      <div className={classNames}>
        <Navigation
          month={jewishMonthInfo.jewishMonthString}
          year={jewishMonthInfo.jewishYear}
          isHebrew={isHebrew}
          onClick={handleNavigationClick}
        />
        <div className="weekdayWrapper">
          {getWeekdays(isHebrew).map((weekday) => {
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
  );
};