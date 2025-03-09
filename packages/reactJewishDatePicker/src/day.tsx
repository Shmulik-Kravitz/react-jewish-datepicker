import * as React from "react";
import {
  JewishDay,
  BasicJewishDay,
  JewishDate,
  IsJewishDatesEqual,
} from "jewish-dates-core";
import { isFromTest } from "./utils";
import * as Dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { convertNumberToHebrew } from "jewish-date";
const dayjs = Dayjs.default;
dayjs.extend(isBetween);

export interface DayProps extends JewishDay {
  isHebrew?: boolean;
  selectedDay: BasicJewishDay;
  onClick: (day: BasicJewishDay) => void;
  onMouseOver?: (day: BasicJewishDay) => void;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
  startDay: BasicJewishDay;
  endDay: BasicJewishDay;
}

const isInRange = (
  date: Date,
  startDay: BasicJewishDay,
  endDay: BasicJewishDay
): boolean => {
  if (startDay && endDay) {
    const start = dayjs(startDay.date);
    const end = dayjs(endDay.date);
    return dayjs(date).isBetween(start, end);
  }
  return false;
};

const isStartDay = (date: Date, startDay: BasicJewishDay): boolean => {
  if (startDay) {
    const start = dayjs(startDay.date).startOf("d");
    return dayjs(date).startOf("d").isSame(start);
  }
  return false;
};

const isEndDay = (
  date: Date,
  startDay: BasicJewishDay,
  endDay: BasicJewishDay
): boolean => {
  if (endDay && startDay) {
    const day = dayjs(date).startOf("d");
    const start = dayjs(startDay.date).startOf("d");
    const end = dayjs(endDay.date).startOf("d");
    return day.isSame(end) && !day.isSame(start);
  }
  return false;
};

export const Day: React.FC<DayProps> = (props: DayProps) => {
  const {
    isHebrew,
    selectedDay,
    isCurrentMonth,
    day,
    dayjsDate,
    isRange,
    startDay,
    endDay,
    canSelect,
    onClick,
    onMouseOver,
    customizeDayStyle,
    ...basicJewishDay
  } = props;

  const handleClick = () => {
    props?.onClick(basicJewishDay);
  };

  const handleMouseOver = () => {
    props?.onMouseOver?.(basicJewishDay);
  };

  const dayToDisplay = isHebrew
    ? convertNumberToHebrew(day, false, false)
    : day;
  const title = props.isHebrew
    ? props.jewishDateStrHebrew
    : props.jewishDateStr;

  const otherMonthClass = !isCurrentMonth ? " otherMonth" : "";
  const selectedDayClass =
    selectedDay &&
    (IsJewishDatesEqual(props.jewishDate, selectedDay.jewishDate)
      ? " selectedDay"
      : "");
  const disableSelectClass =
    canSelect && !canSelect(basicJewishDay) ? " noSelect" : "";
  const isInRangClass = isInRange(props.date, startDay, endDay)
    ? " isInRange"
    : "";
  const isStartDayClass = isStartDay(props.date, startDay) ? " startDay" : "";
  const isEndDayClass = isEndDay(props.date, startDay, endDay) ? " endDay" : "";
  const customeDayClass = customizeDayStyle ? ` ${customizeDayStyle(basicJewishDay)}` : "";
  const classNames = `day${otherMonthClass}${
    selectedDayClass || ""
  }${disableSelectClass}${isInRangClass}${isStartDayClass}${isEndDayClass}${customeDayClass}`;
  return (
    <div
      data-testid={isFromTest() ? title : undefined}
      data-date={props.date}
      className={classNames}
      title={title}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      {dayToDisplay}
    </div>
  );
};
