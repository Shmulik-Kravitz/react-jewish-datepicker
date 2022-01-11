export const englishCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePicker
          value={date}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const hebrewCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
  BasicJewishDate
} from "react-jewish-datepicker";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5788
  };

  return (
      <div>
        <ReactJewishDatePicker
          value={basicJewishDate}
          isHebrew
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const disableHolidayCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import { disableHolidays } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePickerExample
          value={date}
          isHebrew
          canSelect={disableHolidays}
          il
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const disableShabatCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import { disableShabat } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePickerExample
          value={date}
          isHebrew
          canSelect={disableShabat}
          il
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const disableShabatAndHolidaysCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import { disableShabatAndHolidays } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePickerExample
          value={date}
          isHebrew
          canSelect={disableShabatAndHolidays}
          il
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const SelectionWithinRangeCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import {
  disableOutOfRange,
  addDates,
  subtractDates
} from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  const allowedSelectionRange = disableOutOfRange(subtractDates(date, 3), addDates(date, 5));

  return (
      <div>
        <ReactJewishDatePickerExample
          value={date}
          isHebrew
          canSelect={allowedSelectionRange}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const rangeCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  RangeDays
} from "react-jewish-datepicker";

export default function App() {
  const [rangeDays, setRangeDays] = React.useState<RangeDays | undefined>(undefined);
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePickerExample
          value={date}
          isHebrew
          rangePicker
          onClick={(range: RangeDays) => {
            setRangeDays(range);
          }}
        />
      </div>
  );
}`);
