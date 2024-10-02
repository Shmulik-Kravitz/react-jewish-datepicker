import type { FC } from "react";

export interface WeekdayProps {
  value: string;
}

export const Weekday: FC<WeekdayProps> = (props: WeekdayProps) => {
  return <div className="weekday">{props.value}</div>;
};
