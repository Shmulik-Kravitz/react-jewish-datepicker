import * as React from "react";

export interface WeekdayProps {
  value: string;
}

export const Weekday: React.FC<WeekdayProps> = (props: WeekdayProps) => {
  return <div className="weekday">{props.value}</div>;
};
