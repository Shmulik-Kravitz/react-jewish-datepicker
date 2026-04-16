import { useCallback, useState, useEffect, useRef } from "react";
import type { FC } from "react";
import Dayjs from "dayjs";
import {
  getJewishMonth,
  getWeekdays,
  getGregDate,
  getJewishDay,
  getPrevMonth,
  getNextMonth,
  BasicJewishDay,
  BasicJewishDate,
  JewishMonthInfo,
  JewishMonth,
} from "jewish-dates-core";
import { BasicJewishDateRange, DateRange, DateDisplay } from "./interfaces";
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
  slidingMonths?: boolean;
  dateDisplay?: DateDisplay;
}

function getAdjacentMonthDate(
  date: Date,
  direction: "next" | "prev",
  isHebrew: boolean
): Date {
  const info = getJewishMonth(date);
  const adjacent =
    direction === "next"
      ? getNextMonth({ month: JewishMonth[info.jewishMonthString], year: info.jewishYear, isHebrew })
      : getPrevMonth({ month: JewishMonth[info.jewishMonthString], year: info.jewishYear, isHebrew });
  return getGregDate({ year: adjacent.year, monthName: JewishMonth[adjacent.month], day: 1 });
}

export const Month: FC<MonthProps> = (
  { value, isHebrew = false, isRange, onClick, canSelect, customizeDayStyle, isOpen, setOpen, slidingMonths, dateDisplay, ...props }: MonthProps
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

  // Sliding months state
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.innerWidth < 600
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(max-width: 600px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const effectiveSlidingMonths = slidingMonths && !isMobile;

  useEffect(() => {
    const date = getDateInit(value);
    setDate(date);
    const jewishMonth = getJewishMonth(date);
    const start = jewishMonth.selectedDay;

    if (isRange && isDateRange(value)) {
      setStartDay(start);
      props.setStartDay && props.setStartDay(start);
      const endDate = getDateInit(value.endDate);
      const end = getJewishDay(Dayjs(endDate));
      setEndDay(end);
      props.setEndDay && props.setEndDay(end);
    } else {
      setSelectedDay(start);
      props.setSelectedDay && props.setSelectedDay(start);
    }
  }, [value]);

  const handleClick = useCallback(
    (day: BasicJewishDay) => {
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
    },
    [isRange, startDay, endDay, isOpen]
  );

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

  // Sliding months navigation
  const handleSlideNext = useCallback(() => {
    if (isAnimating) return;
    setSlideDirection("left");
    setIsAnimating(true);
  }, [isAnimating]);

  const handleSlidePrev = useCallback(() => {
    if (isAnimating) return;
    setSlideDirection("right");
    setIsAnimating(true);
  }, [isAnimating]);

  const handleTransitionEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track || !slideDirection || !isAnimating) return;

    track.style.transition = "none";

    const newDate =
      slideDirection === "left"
        ? getAdjacentMonthDate(getAdjacentMonthDate(date, "next", isHebrew), "next", isHebrew)
        : getAdjacentMonthDate(getAdjacentMonthDate(date, "prev", isHebrew), "prev", isHebrew);

    setSlideDirection(null);
    setIsAnimating(false);
    setDate(newDate);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = "";
        }
      });
    });
  }, [slideDirection, isAnimating, date, isHebrew]);

  const [start, end] = getDatesInOrder(startDay, hoveredDay);
  const resolvedDisplay = dateDisplay ?? (isHebrew ? "hebrew" : "english");
  const classNames = `monthContainer${isHebrew ? " isHebrew" : ""}${resolvedDisplay === "both" ? " displayBoth" : ""}${effectiveSlidingMonths ? " slidingMonths" : ""}`;

  // Render a month grid (weekdays + days) for a given JewishMonthInfo
  const renderMonthGrid = (info: JewishMonthInfo) => (
    <>
      <div className="weekdayWrapper">
        {getWeekdays(isHebrew).map((weekday) => (
          <Weekday key={weekday} value={weekday} />
        ))}
      </div>
      <div className="month">
        {info.days.map((day) => (
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
            dateDisplay={resolvedDisplay}
          />
        ))}
      </div>
    </>
  );

  if (effectiveSlidingMonths) {
    // Compute the 3 panel pairs (prev pair, current pair, next pair)
    const leftDate = date;
    const rightDate = getAdjacentMonthDate(leftDate, "next", isHebrew);

    const prevLeftDate = getAdjacentMonthDate(leftDate, "prev", isHebrew);
    const prevRightDate = leftDate;

    const nextLeftDate = rightDate;
    const nextRightDate = getAdjacentMonthDate(rightDate, "next", isHebrew);

    const leftInfo = jewishMonthInfo;
    const rightInfo = getJewishMonth(rightDate);
    const prevLeftInfo = getJewishMonth(prevLeftDate);
    const prevRightInfo = getJewishMonth(prevRightDate);
    const nextLeftInfo = getJewishMonth(nextLeftDate);
    const nextRightInfo = getJewishMonth(nextRightDate);

    const leftLabel = isHebrew
      ? `${leftInfo.jewishMonthString} ${leftInfo.jewishYear}`
      : `${leftInfo.jewishMonthString} ${leftInfo.jewishYear}`;
    const rightLabel = isHebrew
      ? `${rightInfo.jewishMonthString} ${rightInfo.jewishYear}`
      : `${rightInfo.jewishMonthString} ${rightInfo.jewishYear}`;

    const slideClass = slideDirection ? ` slide-${slideDirection}` : "";

    return (
      <div className={classNames}>
        <div className="navigation slidingNav">
          <div className="arrowLeft" onClick={handleSlidePrev}>
            <span></span>
          </div>
          <div className="slidingMonthLabels">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>
          <div className="arrowRight" onClick={handleSlideNext}>
            <span></span>
          </div>
        </div>

        <div
          ref={trackRef}
          className={`slidingTrack${slideClass}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {/* Panel 0: prev pair */}
          <div className="slidePanel">
            <div className="monthGrid">{renderMonthGrid(prevLeftInfo)}</div>
            <div className="monthGrid">{renderMonthGrid(prevRightInfo)}</div>
          </div>
          {/* Panel 1: current pair (visible) */}
          <div className="slidePanel">
            <div className="monthGrid">{renderMonthGrid(leftInfo)}</div>
            <div className="monthGrid">{renderMonthGrid(rightInfo)}</div>
          </div>
          {/* Panel 2: next pair */}
          <div className="slidePanel">
            <div className="monthGrid">{renderMonthGrid(nextLeftInfo)}</div>
            <div className="monthGrid">{renderMonthGrid(nextRightInfo)}</div>
          </div>
        </div>
      </div>
    );
  }

  // Single month view (default)
  return (
    <div className={classNames}>
      <Navigation
        month={jewishMonthInfo.jewishMonthString}
        year={jewishMonthInfo.jewishYear}
        isHebrew={isHebrew}
        onClick={handleNavigationClick}
      />
      <div className="weekdayWrapper">
        {getWeekdays(isHebrew).map((weekday) => (
          <Weekday key={weekday} value={weekday} />
        ))}
      </div>
      <div className="month">
        {jewishMonthInfo.days.map((day) => (
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
            dateDisplay={resolvedDisplay}
          />
        ))}
      </div>
    </div>
  );
};
