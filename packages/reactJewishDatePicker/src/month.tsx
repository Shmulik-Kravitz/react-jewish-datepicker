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
  getJewishMonths,
  IsJewishDatesEqual,
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
import { convertNumberToHebrew } from "jewish-date";

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
  showHolidays?: boolean;
  showShabbat?: boolean;
  isIsrael?: boolean;
}

function getAdjacentMonthDate(
  date: Date,
  direction: "next" | "prev",
  isHebrew: boolean
): Date {
  const info = getJewishMonth(date);
  const adjacent =
    direction === "next"
      ? getNextMonth({ month: JewishMonth[info.jewishMonthString as keyof typeof JewishMonth], year: info.jewishYear, isHebrew })
      : getPrevMonth({ month: JewishMonth[info.jewishMonthString as keyof typeof JewishMonth], year: info.jewishYear, isHebrew });
  return getGregDate({ year: adjacent.year, monthName: JewishMonth[adjacent.month as keyof typeof JewishMonth], day: 1 });
}

const hebrewGregorianMonths = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];

const englishGregorianMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getGregorianLabel(info: JewishMonthInfo, isHebrew: boolean): string {
  const monthNames = isHebrew ? hebrewGregorianMonths : englishGregorianMonths;
  const currentMonthDays = info.days.filter((d) => d.isCurrentMonth);
  if (currentMonthDays.length === 0) return "";

  const firstDate = currentMonthDays[0].date;
  const lastDate = currentMonthDays[currentMonthDays.length - 1].date;
  const firstMonth = firstDate.getMonth();
  const firstYear = firstDate.getFullYear();
  const lastMonth = lastDate.getMonth();
  const lastYear = lastDate.getFullYear();

  if (firstMonth === lastMonth && firstYear === lastYear) {
    return `${monthNames[firstMonth]} ${firstYear}`;
  }
  if (firstYear === lastYear) {
    return `${monthNames[firstMonth]} - ${monthNames[lastMonth]} ${firstYear}`;
  }
  return `${monthNames[firstMonth]} ${firstYear} - ${monthNames[lastMonth]} ${lastYear}`;
}

export const Month: FC<MonthProps> = (
  { value, isHebrew = false, isRange, onClick, canSelect, customizeDayStyle, isOpen, setOpen, slidingMonths, dateDisplay, showHolidays, showShabbat, isIsrael = true, ...props }: MonthProps
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

  const [selectedDay, setSelectedDay] = useState<BasicJewishDay | undefined>(
    !isRange && value ? jewishMonthInfo.selectedDay ?? undefined : undefined
  );
  const [startDay, setStartDay] = useState<BasicJewishDay | undefined>(
    isRange && isDateRange(value) ? jewishMonthInfo.selectedDay ?? undefined : undefined
  );
  const [endDay, setEndDay] = useState<BasicJewishDay | undefined>(
    isRange && isDateRange(value) && endDateInit ? getJewishDay(Dayjs(endDateInit)) : undefined
  );
  const [hoveredDay, setHoveredDay] = useState<BasicJewishDay | null>(null);

  // Sliding months state — infinite native horizontal scroll over a panel buffer.
  const trackRef = useRef<HTMLDivElement>(null);
  const skipExtendRef = useRef(false);
  // Whether the initial scroll offset has been applied. Until it has, scroll
  // events are the browser resetting us to 0, not the user navigating.
  const centeredRef = useRef(false);
  // Identifies the month the buffer is centered on. A string rather than the
  // `value`/`date` object so an unstable caller-supplied value can't re-trigger
  // the centering effect on every render.
  const centerMonthKey = `${jewishMonthInfo.jewishYear}-${jewishMonthInfo.jewishMonthString}`;
  const buildPanels = useCallback(
    (centerDate: Date): Date[] => {
      if (isHebrew) {
        return [
          getAdjacentMonthDate(centerDate, "next", isHebrew),
          centerDate,
          getAdjacentMonthDate(centerDate, "prev", isHebrew),
        ];
      }
      return [
        getAdjacentMonthDate(centerDate, "prev", isHebrew),
        centerDate,
        getAdjacentMonthDate(centerDate, "next", isHebrew),
      ];
    },
    [isHebrew]
  );
  const [panelDates, setPanelDates] = useState<Date[]>(() => buildPanels(dateInit));
  const [visibleIndex, setVisibleIndex] = useState(1);
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

  // A closed dropdown does not need its grid or its ~230-option year select in
  // the DOM. Render them from the first open onward — never unmount again, so
  // browsing position survives and the close animation still has content.
  // `isOpen` is undefined for an inline <Month>, which renders immediately.
  const [hasOpened, setHasOpened] = useState(isOpen !== false);
  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  useEffect(() => {
    const date = value ? getDateInit(value) : new Date();
    setDate(date);
    const jewishMonth = getJewishMonth(date);
    const start = jewishMonth.selectedDay;

    if (isRange && value && isDateRange(value)) {
      setStartDay(start!);
      props.setStartDay && props.setStartDay(start!);
      const endDate = getDateInit(value.endDate);
      const end = getJewishDay(Dayjs(endDate));
      setEndDay(end);
      props.setEndDay && props.setEndDay(end);
    } else {
      setSelectedDay(start!);
      props.setSelectedDay && props.setSelectedDay(start!);
    }
  }, [value]);

  const handleClick = useCallback(
    (day: BasicJewishDay) => {
      if (isRange) {
        if (!startDay || endDay) {
          setStartDay(day);
          setEndDay(null as any);
          props.setStartDay && props.setStartDay(day);
          props.setEndDay && props.setEndDay(null as any);
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
        onClick?.call(null, day, undefined as any);
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
    (month: string, year: number, format?: "jewish" | "gregorian") => {
      if (format === "gregorian") {
        setDate((prevDate) => {
          return Dayjs(prevDate).year(year).month(Number(month)).toDate();
        });
      } else {
        if (month === "prev" || month === "next") {
           const basicJewishMonthInfo = month === "prev" 
              ? getPrevMonth({ month: jewishMonthInfo.jewishMonthString as any, year: jewishMonthInfo.jewishYear, isHebrew })
              : getNextMonth({ month: jewishMonthInfo.jewishMonthString as any, year: jewishMonthInfo.jewishYear, isHebrew });
           
           const basicJewishDate: BasicJewishDate = {
             year: basicJewishMonthInfo.year,
             monthName: basicJewishMonthInfo.month,
             day: jewishMonthInfo.selectedDay?.day || 1,
           };
           setBasicJewishDate(basicJewishDate);
        } else {
           const basicJewishDate: BasicJewishDate = {
             year: year,
             monthName: JewishMonth[month as keyof typeof JewishMonth],
             day: jewishMonthInfo.selectedDay?.day || 1,
           };
           setBasicJewishDate(basicJewishDate);
        }
      }
    },
    [JewishMonth, jewishMonthInfo, isHebrew]
  );

  // Center the scroll position on the given panel. Returns whether the offset
  // actually took — the assignment is clamped while the panels are still
  // unlaid-out, which leaves the wrong month showing.
  const centerOnIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return false;
    const target = track.clientWidth * index;
    if (Math.abs(track.scrollLeft - target) >= 1) {
      skipExtendRef.current = true;
      // An explicit behavior overrides the track's CSS `scroll-behavior: smooth`,
      // so the offset lands synchronously and the check below is meaningful.
      track.scrollTo({ left: target, behavior: "instant" });
    }
    return Math.abs(track.scrollLeft - target) < 1;
  }, []);

  // Rebuild the buffer around the selected month and center on it whenever the
  // picker becomes visible. While the dropdown is closed the wrapper is only
  // hidden with opacity, so the track keeps a layout box and the browser can
  // reset its scroll offset without a scroll event we can act on — the offset
  // has to be re-asserted on open rather than only on mount.
  useEffect(() => {
    if (!effectiveSlidingMonths) return;
    // `isOpen` is undefined when <Month> is rendered inline (no dropdown).
    if (isOpen === false) {
      centeredRef.current = false;
      return;
    }

    setPanelDates(buildPanels(date));
    setVisibleIndex(1);
    centeredRef.current = false;

    // Try synchronously first: rAF never fires while the document is hidden,
    // and the offset for panel 1 is clientWidth regardless of panel contents.
    if (centerOnIndex(1)) {
      centeredRef.current = true;
      return;
    }

    let raf = 0;
    const attempt = (remaining: number) => {
      if (centerOnIndex(1)) {
        centeredRef.current = true;
        return;
      }
      if (remaining > 0) raf = requestAnimationFrame(() => attempt(remaining - 1));
    };
    // Otherwise wait for layout — the track has no width until the panels land.
    raf = requestAnimationFrame(() => attempt(10));
    return () => cancelAnimationFrame(raf);
    // `hasOpened` matters: on the first open this effect runs while the grid is
    // still the placeholder, so there is no track to scroll yet. Re-running once
    // the track is mounted lets the synchronous path handle it.
  }, [isOpen, hasOpened, centerMonthKey, effectiveSlidingMonths, isHebrew, buildPanels, centerOnIndex]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    if (skipExtendRef.current) {
      skipExtendRef.current = false;
      return;
    }
    // Before the initial offset lands, a scroll to 0 would satisfy the prepend
    // condition below and shift the buffer off the selected month.
    if (!centeredRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = track;
    const idx = Math.round(scrollLeft / clientWidth);
    setVisibleIndex(idx);

    // Append a panel when approaching the right edge.
    if (scrollLeft + clientWidth * 1.5 >= scrollWidth) {
      setPanelDates((prev) => [
        ...prev,
        getAdjacentMonthDate(prev[prev.length - 1], isHebrew ? "prev" : "next", isHebrew),
      ]);
    }

    // Prepend a panel when approaching the left edge; preserve scroll position.
    if (scrollLeft <= clientWidth * 0.5) {
      setPanelDates((prev) => [
        getAdjacentMonthDate(prev[0], isHebrew ? "next" : "prev", isHebrew),
        ...prev,
      ]);
      requestAnimationFrame(() => {
        const t = trackRef.current;
        if (!t) return;
        skipExtendRef.current = true;
        // Instant: this compensates for the newly prepended panel and must not
        // animate, or the view visibly slides back a month.
        t.scrollTo({ left: t.scrollLeft + t.clientWidth, behavior: "instant" });
        setVisibleIndex((i) => i + 1);
      });
    }
  }, [isHebrew]);

  const handleSlideNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  }, []);

  const handleSlidePrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  }, []);

  const [start, end] = getDatesInOrder(startDay, hoveredDay as BasicJewishDay);
  const resolvedDisplay = dateDisplay ?? "jewish";
  const classNames = `monthContainer${isHebrew ? " isHebrew" : ""}${resolvedDisplay === "both" ? " displayBoth" : ""}${effectiveSlidingMonths ? " slidingMonths" : ""}`;

  // Placeholder until first open. The value effect above still runs, so the
  // parent's trigger text is populated even while the grid is unrendered.
  if (!hasOpened) {
    return <div className={classNames} aria-hidden="true" />;
  }

  const monthLabel = (info: JewishMonthInfo) => {
    const months = getJewishMonths(info.jewishYear, isHebrew);
    const match = months.find((m) => m.id === info.jewishMonthString);
    const name = match ? match.text : info.jewishMonthString;
    return `${name} ${isHebrew ? convertNumberToHebrew(info.jewishYear, true, true) : info.jewishYear}`;
  };

  // The single day in a grid that is reachable by Tab. Arrow keys move focus
  // from there, so the calendar costs one tab stop instead of forty-two.
  const entryDayKey = (info: JewishMonthInfo): string | undefined => {
    const current = info.days.filter((d) => d.isCurrentMonth);
    const pool = current.length ? current : info.days;
    const active = selectedDay ?? startDay;
    const chosen = active
      ? pool.find((d) => IsJewishDatesEqual(d.jewishDate, active.jewishDate))
      : undefined;
    if (chosen) return chosen.jewishDateStr;
    const now = new Date();
    const today = pool.find(
      (d) =>
        d.date.getFullYear() === now.getFullYear() &&
        d.date.getMonth() === now.getMonth() &&
        d.date.getDate() === now.getDate()
    );
    return (today ?? pool[0])?.jewishDateStr;
  };

  // Arrow keys walk the day cells. Left/right are swapped in Hebrew so the
  // motion matches what is on screen rather than DOM order.
  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let delta: number;
    switch (e.key) {
      case "ArrowUp": delta = -7; break;
      case "ArrowDown": delta = 7; break;
      case "ArrowLeft": delta = isHebrew ? 1 : -1; break;
      case "ArrowRight": delta = isHebrew ? -1 : 1; break;
      case "Home": case "End": delta = 0; break;
      default: return;
    }
    const cells = Array.from(
      e.currentTarget.querySelectorAll<HTMLElement>('[role="option"]')
    );
    const current = cells.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? cells.length - 1 : current + delta;
    if (next < 0 || next >= cells.length) return;
    e.preventDefault();
    cells[next].focus();
  };

  // Render a month grid (weekdays + days) for a given JewishMonthInfo.
  // `focusable` is false for sliding panels scrolled out of view, so only the
  // months actually on screen contribute a tab stop.
  const renderMonthGrid = (info: JewishMonthInfo, focusable = true) => {
    const entryKey = focusable ? entryDayKey(info) : undefined;
    return (
      <>
        <div className="weekdayWrapper">
          {getWeekdays(isHebrew).map((weekday) => (
            <Weekday key={weekday} value={weekday} />
          ))}
        </div>
        <div
          className="month"
          role="listbox"
          aria-label={monthLabel(info)}
          onKeyDown={handleGridKeyDown}
        >
          {info.days.map((day) => (
            <Day
              key={day.jewishDateStr}
              {...day}
              tabIndex={day.jewishDateStr === entryKey ? 0 : -1}
              canSelect={canSelect}
              customizeDayStyle={customizeDayStyle}
              onClick={handleClick}
              onMouseOver={isRange ? handleMouseOver : undefined}
              selectedDay={selectedDay}
              isRange={isRange}
              isHebrew={isHebrew}
              startDay={!endDay ? start : startDay}
              endDay={endDay || end}
              dateDisplay={resolvedDisplay}
              showHolidays={showHolidays}
              showShabbat={showShabbat}
              isIsrael={isIsrael}
            />
          ))}
        </div>
      </>
    );
  };

  if (effectiveSlidingMonths) {
    const visibleDate = panelDates[visibleIndex] ?? panelDates[0];
    const visibleCurrentInfo = getJewishMonth(visibleDate);
    const visibleAdjacentInfo = getJewishMonth(getAdjacentMonthDate(visibleDate, "next", isHebrew));
    
    const visibleLeftInfo = isHebrew ? visibleAdjacentInfo : visibleCurrentInfo;
    const visibleRightInfo = isHebrew ? visibleCurrentInfo : visibleAdjacentInfo;

    const getMonthName = (info: JewishMonthInfo) => {
      const months = getJewishMonths(info.jewishYear, isHebrew);
      const match = months.find((m) => m.id === info.jewishMonthString);
      return match ? match.text : info.jewishMonthString;
    };

    const getYearText = (year: number) => {
      return isHebrew ? convertNumberToHebrew(year, true, true) : year;
    };

    const hebrewGregorianMonths = [
      "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
      "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    
    const englishGregorianMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const getGregMonthName = (info: JewishMonthInfo) => {
       const midDay = info.days[15];
       const midDate = midDay ? midDay.date : new Date();
       const mId = midDate.getMonth();
       return isHebrew ? hebrewGregorianMonths[mId] : englishGregorianMonths[mId];
    };
    const getGregYearText = (info: JewishMonthInfo) => {
       const midDay = info.days[15];
       const midDate = midDay ? midDay.date : new Date();
       return midDate.getFullYear(); 
    };

    return (
      <div className={classNames}>
        <div className="navigation slidingNav">
          {/* The track is laid out LTR even in Hebrew, so the left arrow moves
              forward in time when isHebrew and backward otherwise. */}
          <button
            type="button"
            className="arrowLeft"
            aria-label={isHebrew ? "החודש הבא" : "Previous month"}
            onClick={handleSlidePrev}
          >
            <span></span>
          </button>
          <div className="slidingMonthLabels">
            {resolvedDisplay === "gregorian" ? (
               <>
                 <span>{getGregMonthName(visibleLeftInfo)} {getGregYearText(visibleLeftInfo)}</span>
                 <span>{getGregMonthName(visibleRightInfo)} {getGregYearText(visibleRightInfo)}</span>
               </>
            ) : (
               <>
                 <span>
                   {getMonthName(visibleLeftInfo)} {getYearText(visibleLeftInfo.jewishYear)}
                   {resolvedDisplay === "both" && (
                     <span className="gregSlidingSubLabel">{getGregorianLabel(visibleLeftInfo, isHebrew)}</span>
                   )}
                 </span>
                 <span>
                   {getMonthName(visibleRightInfo)} {getYearText(visibleRightInfo.jewishYear)}
                   {resolvedDisplay === "both" && (
                     <span className="gregSlidingSubLabel">{getGregorianLabel(visibleRightInfo, isHebrew)}</span>
                   )}
                 </span>
               </>
            )}
          </div>
          <button
            type="button"
            className="arrowRight"
            aria-label={isHebrew ? "החודש הקודם" : "Next month"}
            onClick={handleSlideNext}
          >
            <span></span>
          </button>
        </div>

        <div ref={trackRef} className="slidingTrack" onScroll={handleScroll}>
          {panelDates.map((panelDate, panelIndex) => {
            const onScreen = panelIndex === visibleIndex;
            const currentInfo = getJewishMonth(panelDate);
            const adjacentInfo = getJewishMonth(getAdjacentMonthDate(panelDate, "next", isHebrew));
            
            const leftInfo = isHebrew ? adjacentInfo : currentInfo;
            const rightInfo = isHebrew ? currentInfo : adjacentInfo;
            const key = isHebrew 
               ? `${rightInfo.jewishYear}-${rightInfo.jewishMonth}` 
               : `${leftInfo.jewishYear}-${leftInfo.jewishMonth}`;

            return (
              <div key={key} className="slidePanel" aria-hidden={!onScreen || undefined}>
                <div className="monthGrid">{renderMonthGrid(leftInfo, onScreen)}</div>
                <div className="monthGrid">{renderMonthGrid(rightInfo, onScreen)}</div>
              </div>
            );
          })}
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
        dateDisplay={resolvedDisplay}
        gregorianDate={date}
        gregorianLabel={resolvedDisplay === "both" ? getGregorianLabel(jewishMonthInfo, isHebrew) : undefined}
      />
      {renderMonthGrid(jewishMonthInfo)}
    </div>
  );
};
