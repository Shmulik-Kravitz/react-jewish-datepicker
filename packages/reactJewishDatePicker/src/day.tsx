import * as React from "react";
import {
  JewishDay,
  BasicJewishDay,
  JewishDate,
  IsJewishDatesEqual,
  getHolidayInfo,
  getHolidayNames,
  getHolidayClassNames,
  getShabbatClassNames,
} from "jewish-dates-core";
import { isFromTest } from "./utils";
import { DateDisplay } from "./interfaces";
import * as Dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { convertNumberToHebrew } from "jewish-date";
const dayjs = Dayjs.default;
dayjs.extend(isBetween);

export interface DayProps extends JewishDay {
  isHebrew?: boolean;
  selectedDay?: BasicJewishDay;
  onClick: (day: BasicJewishDay) => void;
  onMouseOver?: (day: BasicJewishDay) => void;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
  startDay?: BasicJewishDay;
  endDay?: BasicJewishDay;
  dateDisplay?: DateDisplay;
  showHolidays?: boolean;
  /** Marks Shabbat (and tags Friday as `isErevShabbat`). On by default. */
  showShabbat?: boolean;
  isIsrael?: boolean;
  /** Roving tabindex: 0 for the one entry point into the grid, -1 elsewhere. */
  tabIndex?: number;
}

const isInRange = (
  date: Date,
  startDay?: BasicJewishDay,
  endDay?: BasicJewishDay
): boolean => {
  if (startDay && endDay) {
    const start = dayjs(startDay.date);
    const end = dayjs(endDay.date);
    return dayjs(date).isBetween(start, end);
  }
  return false;
};

const isStartDay = (date: Date, startDay?: BasicJewishDay): boolean => {
  if (startDay) {
    const start = dayjs(startDay.date).startOf("d");
    return dayjs(date).startOf("d").isSame(start);
  }
  return false;
};

const isEndDay = (
  date: Date,
  startDay?: BasicJewishDay,
  endDay?: BasicJewishDay
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
    dateDisplay,
    showHolidays,
    showShabbat = true,
    isIsrael = true,
    tabIndex,
    ...basicJewishDay
  } = props;

  const isSelectable = canSelect ? canSelect(basicJewishDay) : true;

  const handleClick = () => {
    if (!isSelectable) return;
    props?.onClick(basicJewishDay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    // Space would otherwise scroll the calendar's scroll container.
    e.preventDefault();
    if (!isSelectable) return;
    props?.onClick(basicJewishDay);
  };

  const handleMouseOver = () => {
    props?.onMouseOver?.(basicJewishDay);
  };

  const resolvedDisplay: DateDisplay = dateDisplay ?? "jewish";
  const jewishNumeral = isHebrew ? convertNumberToHebrew(day, false, false) : day;
  const gregorianDay = props.date.getDate();

  let dayContent: React.ReactNode;
  if (resolvedDisplay === "gregorian") {
    dayContent = gregorianDay;
  } else if (resolvedDisplay === "both") {
    dayContent = (
      <span className="dayBoth">
        <span className="dayJewish">{jewishNumeral}</span>
        <span className="dayGregorian">{gregorianDay}</span>
      </span>
    );
  } else {
    dayContent = jewishNumeral;
  }

  // `getDateInfo` rebuilds several holiday lists per call and a grid is 42
  // cells, so this stays behind the opt-in prop and is memoized per date.
  const dateTime = props.date.getTime();
  const holidayInfo = React.useMemo(
    () =>
      showHolidays ? getHolidayInfo(props.date, isIsrael, isHebrew) : undefined,
    [showHolidays, isIsrael, isHebrew, dateTime]
  );
  const holidayNames = getHolidayNames(holidayInfo);
  const holidayClasses = [
    ...getHolidayClassNames(holidayInfo),
    // A plain `getDay()` check, so this is cheap enough to run unguarded by the
    // holiday memo — and the two helpers never emit the same class.
    ...(showShabbat ? getShabbatClassNames(props.date) : []),
  ];

  // `title` stays the bare date — it is also the test id. The holiday names go
  // on a separate label used for the tooltip and the accessible name.
  const title = props.isHebrew
    ? props.jewishDateStrHebrew
    : props.jewishDateStr;
  const label = holidayNames.length
    ? `${title} — ${holidayNames.join(", ")}`
    : title;

  const today = new Date();
  const isToday =
    props.date.getFullYear() === today.getFullYear() &&
    props.date.getMonth() === today.getMonth() &&
    props.date.getDate() === today.getDate();

  const otherMonthClass = !isCurrentMonth ? " otherMonth" : "";
  const isSelected = !!selectedDay &&
    IsJewishDatesEqual(props.jewishDate, selectedDay.jewishDate);
  const selectedDayClass = selectedDay && (isSelected ? " selectedDay" : "");
  const disableSelectClass = !isSelectable ? " noSelect" : "";
  const isInRangClass = isInRange(props.date, startDay, endDay)
    ? " isInRange"
    : "";
  const isStartDayClass = isStartDay(props.date, startDay) ? " startDay" : "";
  const isEndDayClass = isEndDay(props.date, startDay, endDay) ? " endDay" : "";
  const customDayClass = customizeDayStyle ? ` ${customizeDayStyle(basicJewishDay)}` : "";
  const isTodayClass = isToday ? " isToday" : "";
  const holidayClass = holidayClasses.length ? ` ${holidayClasses.join(" ")}` : "";
  const classNames = `day${otherMonthClass}${
    selectedDayClass || ""
  }${disableSelectClass}${isInRangClass}${isStartDayClass}${isEndDayClass}${customDayClass}${isTodayClass}${holidayClass}`;
  return (
    <div
      data-testid={isFromTest() ? title : undefined}
      data-date={props.date}
      className={classNames}
      title={label}
      role="option"
      tabIndex={tabIndex ?? -1}
      aria-label={label}
      aria-selected={isSelected}
      aria-disabled={!isSelectable || undefined}
      aria-current={isToday ? "date" : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseOver={handleMouseOver}
    >
      {dayContent}
      {holidayClasses.includes("hasHoliday") && (
        <span className="holidayMarker" aria-hidden="true" />
      )}
    </div>
  );
};
