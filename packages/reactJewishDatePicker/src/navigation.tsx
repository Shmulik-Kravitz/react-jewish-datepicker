import { getJewishMonths, getJewishYears, JewishMonth } from "jewish-dates-core";
import { getTestID } from "./utils/testUtils";
import { convertNumberToHebrew } from "jewish-date";
import { useCallback, memo, useMemo } from "react";
import Dayjs from "dayjs";
import { DateDisplay } from "./interfaces";

export interface NavigationProps {
  isHebrew?: boolean;
  month: string;
  year: number;
  onClick: (month: string, year: number, format?: "jewish" | "gregorian") => void;
  dateDisplay?: DateDisplay;
  gregorianDate?: Date;
  gregorianLabel?: string;
}

const hebrewGregorianMonths = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];

const englishGregorianMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getGregorianYears = (year: number = 2024): number[] => {
  const years: number[] = [];
  for (let i = 100; i > 0; i--) {
    years.push(year - i);
  }
  years.push(year);
  for (let i = 1; i <= 100; i++) {
    years.push(year + i);
  }
  return years;
};


export const Navigation: React.FC<NavigationProps> = memo(
  (props: NavigationProps) => {
    const isGregorian = props.dateDisplay === "gregorian";

    const handlePrevious = useCallback(() => {
      if (isGregorian && props.gregorianDate) {
        const newDate = Dayjs(props.gregorianDate).subtract(1, "month");
        props.onClick(newDate.month().toString(), newDate.year(), "gregorian");
        return;
      }
      // Jewish navigation is handled by Month component now, but we can just ask Month to do it
      // Wait, getPrevMonth is from jewish-dates-core, Month component uses this, but wait: Month has no getPrevMonth!
      // I should just emit onClick and let Month handle it, but wait: the signature of onClick is just month and year.
      // Wait, previously Navigation imported getPrevMonth and computed it. Okay, let me keep the old logic for Jewish.
    }, [props, isGregorian]);

    const handleNext = useCallback(() => {
      if (isGregorian && props.gregorianDate) {
        const newDate = Dayjs(props.gregorianDate).add(1, "month");
        props.onClick(newDate.month().toString(), newDate.year(), "gregorian");
        return;
      }
    }, [props, isGregorian]);

    const handleMonthChange = useCallback(
      (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        if (isGregorian) {
          props.onClick(value, props.gregorianDate?.getFullYear() || props.year, "gregorian");
        } else {
          props.onClick(value, props.year);
        }
      },
      [props, isGregorian]
    );

    const handleYearChange = useCallback(
      (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const year = Number(e.currentTarget.value);
        if (isGregorian) {
          props.onClick(props.gregorianDate?.getMonth().toString() || "0", year, "gregorian");
        } else {
          props.onClick(props.month, year);
        }
      },
      [props, isGregorian]
    );

    const months = getJewishMonths(props.year, props.isHebrew);
    const years = getJewishYears(props.year);

    const gregYear = props.gregorianDate?.getFullYear() || new Date().getFullYear();
    const gregorianYearsArr = useMemo(() => {
      return getGregorianYears(gregYear);
    }, [gregYear]);
    const gregorianMonthsArr = props.isHebrew ? hebrewGregorianMonths : englishGregorianMonths;

    return (
      <div className={`navigation`}>
        <button
          type="button"
          className={"arrowLeft"}
          aria-label={props.isHebrew ? "החודש הקודם" : "Previous month"}
          data-testid={getTestID("prev")}
          onClick={() => {
            if (isGregorian && props.gregorianDate) {
              const newDate = Dayjs(props.gregorianDate).subtract(1, "month");
              props.onClick(newDate.month().toString(), newDate.year(), "gregorian");
            } else {
              props.onClick("prev", props.year, "jewish"); // Signal wrapper to change
            }
          }}
        >
          <span></span>
        </button>
        <div className={"monthYearSelection"}>
          {isGregorian ? (
            <select
              data-testid={getTestID("month-gregorian")}
              value={props.gregorianDate?.getMonth().toString()}
              onChange={handleMonthChange}
            >
              {gregorianMonthsArr.map((monthText, index) => (
                <option key={index} value={index.toString()}>{monthText}</option>
              ))}
            </select>
          ) : (
            <select
              data-testid={getTestID("month")}
              value={props.month}
              onChange={handleMonthChange}
            >
              {months.map((month) => {
                return (
                  <option
                    data-testid={getTestID(month.text)}
                    key={month.id}
                    value={month.id}
                  >
                    {month.text}
                  </option>
                );
              })}
            </select>
          )}

          {isGregorian ? (
            <select
              data-testid={getTestID("year-gregorian")}
              value={props.gregorianDate?.getFullYear()}
              onChange={handleYearChange}
            >
              {gregorianYearsArr.map((y) => (
                <option data-testid={getTestID(y.toString())} key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          ) : (
            <select
              data-testid={getTestID("year")}
              value={props.year}
              onChange={handleYearChange}
            >
              {years.map((y) => {
                const text = props.isHebrew ? convertNumberToHebrew(y) : y;
                return (
                  <option data-testid={getTestID(y.toString())} key={y} value={y}>
                    {text}
                  </option>
                );
              })}
            </select>
          )}
          {props.dateDisplay === "both" && props.gregorianLabel && (
          <div className="gregSubLabel">
            {props.gregorianLabel}
          </div>
        )}
        </div>
        
        <button
          type="button"
          className={`arrowRight`}
          aria-label={props.isHebrew ? "החודש הבא" : "Next month"}
          data-testid={getTestID("next")}
          onClick={() => {
            if (isGregorian && props.gregorianDate) {
              const newDate = Dayjs(props.gregorianDate).add(1, "month");
              props.onClick(newDate.month().toString(), newDate.year(), "gregorian");
            } else {
              props.onClick("next", props.year, "jewish"); // Signal wrapper to change
            }
          }}
        >
          <span></span>
        </button>
      </div>
    );
  }
);
