import {
  getJewishMonths,
  getJewishYears,
  getPrevMonth,
  getNextMonth,
  JewishMonth,
} from "jewish-dates-core";
import { getTestID } from "./utils";
import { convertNumberToHebrew } from "jewish-date";
import { useCallback, memo } from "react";

export interface NavigationProps {
  isHebrew?: boolean;
  month: string;
  year: number;
  onClick: (month: string, year: number) => void;
}

export const Navigation: React.FC<NavigationProps> = memo(
  (props: NavigationProps) => {
    const handlePrevious = useCallback(() => {
      const basicJewishMonthInfo = getPrevMonth({
        month: JewishMonth[props.month],
        year: props.year,
        isHebrew: props.isHebrew,
      });
      props.onClick(basicJewishMonthInfo.month, basicJewishMonthInfo.year);
    }, [props, props.month, props.year, props.isHebrew]);

    const handleNext = useCallback(() => {
      const basicJewishMonthInfo = getNextMonth({
        month: JewishMonth[props.month],
        year: props.year,
        isHebrew: props.isHebrew,
      });
      props.onClick(basicJewishMonthInfo.month, basicJewishMonthInfo.year);
    }, [props, props.month, props.year, props.isHebrew]);

    const handleMonthChange = useCallback(
      (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const month = e.currentTarget.value;
        props.onClick(month, props.year);
      },
      [props, props.month, props.year]
    );

    const handleYearChange = useCallback(
      (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const year = Number(e.currentTarget.value);
        props.onClick(props.month, year);
      },
      [props, props.month, props.year]
    );

    const months = getJewishMonths(props.year, props.isHebrew);
    const years = getJewishYears(props.year);

    return (
      <div className={`navigation`}>
        <div
          className={"arrowLeft"}
          data-testid={getTestID("prev")}
          onClick={handlePrevious}
        >
          <span></span>
        </div>
        <div className={"monthYearSelection"}>
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
        </div>
        <div
          className={`arrowRight`}
          data-testid={getTestID("next")}
          onClick={handleNext}
        >
          <span></span>
        </div>
      </div>
    );
  }
);
