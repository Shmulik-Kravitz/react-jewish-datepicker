import * as React from "react";
import { ReactJewishDatePickerExample } from "../reactJewishDatePickerExample";
import "./examples.css";
import {
  BasicJewishDate,
  BasicJewishDay,
  BasicJewishDateRange,
  DateRange,
  Month,
} from "react-jewish-datepicker";
import { HiOutlineClipboard } from "@react-icons/all-files/hi/HiOutlineClipboard";
import { HiOutlineClipboardCheck } from "@react-icons/all-files/hi/HiOutlineClipboardCheck";

import {
  dontSelectHolidays,
  dontSelectShabat,
  dontSelectShabatAndHolidays,
  dontSelectOutOfRange,
  addDates,
  subtractDates,
  JewishMonth,
} from "jewish-dates-core";

import {
  englishCode,
  hebrewCode,
  dontSelectHolidayCode,
  dontSelectShabatCode,
  dontSelectShabatAndHolidaysCode,
  selectionWithinRangeCode,
  disableWithCustomFunctionCode,
  rangeCode,
  customizeDayStyleCode,
  inlineVersionCode,
} from "../code";

const dontSelectTuesdays = (day: BasicJewishDay): boolean => {
  if (day.date.getDay() === 2) {
    return false;
  }
  return true;
};

const highlightTuesday = (day: BasicJewishDay): string => {
  if (day.date.getDay() === 2) {
    return 'tuesday';
  }
  return '';
};

const ExampleLinkList = [ 
  { id: "english", title: "English View" },
  { id: "hebrew", title: "Hebrew View" },
  { id: "disableHolidays", title: "Holidays Selection Disabled" },
  { id: "disableShabat", title: "Shabat Selection Disabled" },
  { id: "disableShabatAndHolidays", title: "Shabat and Holidays Selection Disabled" },
  { id: "selectionWithinRange", title: "Selection Within Range" },
  { id: "disableWithCustomFunction", title: "Disable Days With Custom Function" },
  { id: "customizeDayStyle", title: "Customize Day Style" },
  { id: "rangePicker", title: "Range datepicker" },
  { id: "inlineVersion", title: "Inline Version" },
];

export function Examples() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = React.useState<
    BasicJewishDate | Date
  >(date);
  // const jewishDate = toJewishDate(date);
  // console.log(jewishDate);

  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5788,
  };

  const [dateRange, setDateRange] = React.useState<
    BasicJewishDateRange | DateRange
  >({
    startDate: {
      day: 13,
      monthName: "Elul",
      year: 5788,
    },
    endDate: {
      day: 18,
      monthName: "Elul",
      year: 5788,
    },
  });

  const handleAnchorClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    window.history.replaceState(null, document.title, `#${id}`);
    document
      .getElementById(id)!
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const excludeHolidays = dontSelectHolidays(true);
  const excludeShabatAndHolidays = dontSelectShabatAndHolidays();
  const allowedSelectionRange = dontSelectOutOfRange(
    subtractDates(date, 3),
    addDates(date, 5)
  );
  const [isYarnCopied, setIsYarnCopied] = React.useState(false);
  const [isNpmCopied, setIsNpmCopied] = React.useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    id === "yarn" ? setIsYarnCopied(true) : setIsNpmCopied(true);
    setTimeout(() => {
      id === "yarn" ? setIsYarnCopied(false) : setIsNpmCopied(false);
    }, 1500);
  };

  return (
    <div className="main">
      <header>
        <span>BH</span>
        <h1>React Jewish Datepicker</h1>
      </header>
      <div className="meta">
        <span>
          <a href="https://www.npmjs.com/package/react-jewish-datepicker">
            <img
              src="https://badge.fury.io/js/react-jewish-datepicker.svg"
              alt=""
            />
          </a>
        </span>
        <span>
          <img
            src="https://github.com/Shmulik-Kravitz/react-jewish-datepicker/workflows/CI_CD/badge.svg?branch=master"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://img.shields.io/bundlephobia/minzip/react-jewish-datepicker.svg"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://badgen.net/github/stars/Shmulik-Kravitz/react-jewish-datepicker"
            alt=""
          />
        </span>
      </div>
      <div className="examplesContainer">
        <div>
          <h2>Installation</h2>
          <p>Install the package via Yarn:</p>
          <code className="install">
            yarn add react-jewish-datepicker
            <button
              className="installCopy"
              onClick={() =>
                copyToClipboard("yarn add react-jewish-datepicker", "yarn")
              }
            >
              {isYarnCopied ? (
                <HiOutlineClipboardCheck />
              ) : (
                <HiOutlineClipboard />
              )}
            </button>
          </code>
          <p>Or via npm:</p>
          <code className="install">
            npm install react-jewish-datepicker --save
            <button
              className="installCopy"
              onClick={() =>
                copyToClipboard(
                  "npm install react-jewish-datepicker --save",
                  "npm"
                )
              }
            >
              {isNpmCopied ? (
                <HiOutlineClipboardCheck />
              ) : (
                <HiOutlineClipboard />
              )}
            </button>
          </code>
          <h2>Import the css</h2>
          <p>Copy the import to your project:</p>
          <code className="install">
            import "react-jewish-datepicker/dist/index.css";
            <button
              className="installCopy"
              onClick={() =>
                copyToClipboard(
                  'import "react-jewish-datepicker/dist/index.css"',
                  "import"
                )
              }
            >
              {isNpmCopied ? (
                <HiOutlineClipboardCheck />
              ) : (
                <HiOutlineClipboard />
              )}
            </button>
          </code>
        </div>
        <h2 className="examples-h2">Examples</h2>
        <div className="examples">
          <div>
            <ul>
              {ExampleLinkList.map((example) => (
                <li key={example.id}>
                  <a
                    href={`#${example.id}`}
                    onClick={(e) => handleAnchorClick(e, example.id)}
                  >
                    {example.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div id="english">
              <h3>English View</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                code={englishCode}
              >
                <button
                  className="button"
                  onClick={() => {
                    setSelectedDate(new Date());
                  }}
                >
                  Set date to now
                </button>

                <button
                  className="button"
                  onClick={() => {
                    setSelectedDate({
                      day: 11,
                      monthName: "Nisan",
                      year: 5783,
                    });
                  }}
                >
                  Set date to 11-Nisan-5783
                </button>
              </ReactJewishDatePickerExample>
            </div>
            <div id="hebrew">
              <h3>Hebrew View</h3>
              <ReactJewishDatePickerExample
                value={basicJewishDate}
                isHebrew
                code={hebrewCode}
              />
            </div>
            <div id="disableHolidays">
              <h3>Holidays Selection Disabled</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                canSelect={excludeHolidays}
                code={dontSelectHolidayCode}
              />
            </div>
            <div id="disableShabat">
              <h3>Shabat Selection Disabled</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                canSelect={dontSelectShabat}
                code={dontSelectShabatCode}
              />
            </div>
            <div id="disableShabatAndHolidays">
              <h3>Shabat and Holidays Selection Disabled</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                canSelect={excludeShabatAndHolidays}
                code={dontSelectShabatAndHolidaysCode}
              />
            </div>
            <div id="selectionWithinRange">
              <h3>Selection Within Range</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                canSelect={allowedSelectionRange}
                code={selectionWithinRangeCode}
              />
            </div>
            <div id="disableWithCustomFunction">
              <h3>Disable Days With Custom Function</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                canSelect={dontSelectTuesdays}
                code={disableWithCustomFunctionCode}
              />
            </div>
            <div id="customizeDayStyle">
              <h3>Customize Day Style</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                customizeDayStyle={highlightTuesday}
                code={customizeDayStyleCode}
              />
            </div>
            <div id="rangePicker">
              <h3>Range Datepicker</h3>
              <ReactJewishDatePickerExample
                value={dateRange}
                isHebrew
                code={rangeCode}
                isRange
              >
                <button
                  className="button"
                  onClick={() => {
                    const endDate = new Date();
                    var startDate = new Date(endDate);
                    startDate.setDate(date.getDate() - 3);
                    const dateRange: DateRange = {
                      startDate: startDate,
                      endDate: endDate,
                    };
                    console.log(dateRange);
                    setDateRange(dateRange);
                  }}
                >
                  Set date range to last 3 days
                </button>

                <button
                  className="button"
                  onClick={() => {
                    setDateRange({
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
                    });
                  }}
                >
                  Set date to 13-Elul-5788 - 18-Elul-5788
                </button>
              </ReactJewishDatePickerExample>
            </div>
            <div id="inlineVersion">
              <h3>Inline Version</h3>
              <ReactJewishDatePickerExample
                value={selectedDate}
                isHebrew
                isInline
                code={inlineVersionCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
