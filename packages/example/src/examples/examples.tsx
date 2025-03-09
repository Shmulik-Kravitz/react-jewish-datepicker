import * as React from "react";
import { ReactJewishDatePickerExample } from "../reactJewishDatePickerExample";
import "./examples.css";
import {
  BasicJewishDate,
  BasicJewishDay,
  BasicJewishDateRange,
  DateRange,
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
              src="https://camo.githubusercontent.com/df2b275fd607a2b248dc1d7645f26cabf040c1afac1a2b8a50b24191635dcf8b/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d6a65776973682d646174657069636b65722e737667"
              alt=""
            />
          </a>
        </span>
        <span>
          <img
            src="https://github.com/Shmulik-Kravitz/react-jewish-datepicker/workflows/CI/badge.svg?branch=master"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://camo.githubusercontent.com/1490f940d6bc796efc2edad780bf33f3fd01b86b194b1ae009d9a28fd6ac1dd9/68747470733a2f2f62616467656e2e6e65742f6e706d2f64742f72656163742d6a65776973682d646174657069636b6572"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://camo.githubusercontent.com/b61fde28036b7562db1cfc9091af9dab87a751a2d0f26fca916589d579f46a02/68747470733a2f2f62616467656e2e6e65742f6e706d2f6c6963656e73652f72656163742d6a65776973682d646174657069636b6572"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://camo.githubusercontent.com/942251b8989beb0a7757bca463a583d192bccf4977a310543e954130b601a5e5/68747470733a2f2f62616467656e2e6e65742f62756e646c6570686f6269612f6d696e2f72656163742d6a65776973682d646174657069636b6572"
            alt=""
          />
        </span>
        <span>
          <img
            src="https://camo.githubusercontent.com/34f06db740d21cb30e977379926f55683184b380b2d4c7be1de21ffc029e30a8/68747470733a2f2f62616467656e2e6e65742f6769746875622f73746172732f53686d756c696b2d4b72617669747a2f72656163742d6a65776973682d646174657069636b6572"
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
              <li>
                <a
                  href="#english"
                  onClick={(e) => handleAnchorClick(e, "english")}
                >
                  English View
                </a>
              </li>
              <li>
                <a
                  href="#hebrew"
                  onClick={(e) => handleAnchorClick(e, "hebrew")}
                >
                  Hebrew View
                </a>
              </li>
              <li>
                <a
                  href="#disableHolidays"
                  onClick={(e) => handleAnchorClick(e, "disableHolidays")}
                >
                  Holidays Selection Disabled
                </a>
              </li>
              <li>
                <a
                  href="#disableShabat"
                  onClick={(e) => handleAnchorClick(e, "disableShabat")}
                >
                  Shabat Selection Disabled
                </a>
              </li>
              <li>
                <a
                  href="#disableShabatAndHolidays"
                  onClick={(e) =>
                    handleAnchorClick(e, "disableShabatAndHolidays")
                  }
                >
                  Shabat and Holidays Selection Disabled
                </a>
              </li>
              <li>
                <a
                  href="#selectionWithinRange"
                  onClick={(e) => handleAnchorClick(e, "selectionWithinRange")}
                >
                  Selection Within Range
                </a>
              </li>
              <li>
                <a
                  href="#disableWithCustomFunction"
                  onClick={(e) =>
                    handleAnchorClick(e, "disableWithCustomFunction")
                  }
                >
                  Disable Days With Custom Function
                </a>
              </li>
              <li>
                <a
                  href="#customizeDayStyle"
                  onClick={(e) =>
                    handleAnchorClick(e, "customizeDayStyle")
                  }
                >
                  Customize Day Style
                </a>
              </li>
              <li>
                <a
                  href="#rangePicker"
                  onClick={(e) => handleAnchorClick(e, "rangePicker")}
                >
                  Range datepicker
                </a>
              </li>
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
          </div>
        </div>
      </div>
    </div>
  );
}
