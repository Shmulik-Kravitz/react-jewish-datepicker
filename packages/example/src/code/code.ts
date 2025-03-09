export const englishCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";

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
import "react-jewish-datepicker/dist/index.css";
import {
  JewishMonth,
} from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: JewishMonth.Elul,
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

export const dontSelectHolidayCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import { dontSelectHolidays } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  const isIsrael: boolean = true;
  const excludeHolidays = dontSelectHolidays(isIsrael);

  return (
      <div>
        <ReactJewishDatePicker
          value={date}
          isHebrew
          canSelect={excludeHolidays}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const dontSelectShabatCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import { dontSelectShabat } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePicker
          value={date}
          isHebrew
          canSelect={dontSelectShabat}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const dontSelectShabatAndHolidaysCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import { dontSelectShabatAndHolidays } from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();
  const excludeShabatAndHolidays = dontSelectShabatAndHolidays();

  return (
      <div>
        <ReactJewishDatePicker
          value={date}
          isHebrew
          canSelect={excludeShabatAndHolidays}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);

export const selectionWithinRangeCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import {
  dontSelectOutOfRange,
  addDates,
  subtractDates
} from "jewish-dates-core";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  const allowedSelectionRange = dontSelectOutOfRange(subtractDates(date, 3), addDates(date, 5));

  return (
      <div>
        <ReactJewishDatePicker
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

export const disableWithCustomFunctionCode = (`import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";

const dontSelectTuesdays = (day: BasicJewishDay): boolean => {
  if (day.date.getDay() === 2) {
    return false;
  }
  return true;
}

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const date: Date = new Date();

  return (
      <div>
        <ReactJewishDatePicker
          value={date}
          isHebrew
          canSelect={dontSelectTuesdays}
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
  );
}`);


export const customizeDayStyleCode = (`import * as React from "react";
  import {
    ReactJewishDatePicker,
    BasicJewishDay,
  } from "react-jewish-datepicker";
  import "react-jewish-datepicker/dist/index.css";
  
  const highlightTuesday = (day: BasicJewishDay): string => {
    if (day.date.getDay() === 2) {
      return 'tuesday';
    }
    return '';
  };
  
  export default function App() {
    const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
    const date: Date = new Date();
  
    return (
        <div>
          <ReactJewishDatePicker
            value={date}
            isHebrew
            customizeDayStyle={highlightTuesday}
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
  BasicJewishDateRange,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import {
  JewishMonth,
} from "jewish-dates-core";

export default function App() {
  const [startDay, setStartDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const [endDay, setEndDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const basicJewishDateRange: BasicJewishDateRange = {
    startDate: {
      day: 13,
      monthName: JewishMonth.Elul,
      year: 5788,
    },
    endDate: {
      day: 18,
      monthName: JewishMonth.Elul,
      year: 5788,
    },
  };

  return (
      <div>
        <ReactJewishDatePicker
          value={basicJewishDateRange}
          isHebrew
          rangePicker
          onClick={(startDay: BasicJewishDay, endDay: BasicJewishDay) => {
            setStartDay(startDay);
            setEndDay(endDay);
          }}
        />
      </div>
  );
}`);
