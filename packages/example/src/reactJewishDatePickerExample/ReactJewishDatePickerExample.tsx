import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
  BasicJewishDate,
  BasicJewishDateRange,
  DateRange,
} from "react-jewish-datepicker";
// import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { HiOutlineClipboard } from "@react-icons/all-files/hi/HiOutlineClipboard";
import { HiOutlineClipboardCheck } from "@react-icons/all-files/hi/HiOutlineClipboardCheck";
import { Code } from "./code";

import "./ReactJewishDatePickerExample.css";
import "../../../reactJewishDatePicker/dist/index.css";

export interface ReactJewishDatePickerExampleProps {
  isHebrew?: boolean;
  value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
  canSelect?: (day: BasicJewishDay) => boolean;
  isRange?: boolean;
  code: string;
  children?: JSX.Element | JSX.Element[];
}

export const ReactJewishDatePickerExample: React.FC<
  ReactJewishDatePickerExampleProps
> = (props: ReactJewishDatePickerExampleProps) => {
  const [basicJewishDay, setBasicJewishDay] = React.useState<
    BasicJewishDay | undefined
  >(undefined);
  const [startDay, setStartDay] = React.useState<BasicJewishDay | undefined>(
    undefined
  );
  const [endDay, setEndDay] = React.useState<BasicJewishDay | undefined>(
    undefined
  );
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    setBasicJewishDay(undefined);
    setStartDay(undefined);
    setEndDay(undefined);
  }, [props.value]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  // const scope = { ReactJewishDatePicker, BasicJewishDay, React };
  return (
    <div className="reactJewishDatePickerExample">
      {/* <LiveProvider code={props.code} scope={scope} language={"tsx"}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider> */}
      <div className="demo">
        <button className="copy" onClick={copyToClipboard}>
          {isCopied ? (
            <HiOutlineClipboardCheck size={23} />
          ) : (
            <HiOutlineClipboard size={23} />
          )}
        </button>
        <Code code={props.code} />
        <div className={`example${props.isHebrew ? " isHebrew" : ""}`}>
          <div className={`pickerWrapper${props.isRange ? " isRange" : ""}`}>
            <ReactJewishDatePicker
              isHebrew={!!props.isHebrew}
              value={props.value}
              canSelect={props.canSelect}
              isRange={props.isRange}
              onClick={
                !props.isRange
                  ? (day: BasicJewishDay) => {
                      setBasicJewishDay(day);
                    }
                  : (startDay: BasicJewishDay, endDay: BasicJewishDay) => {
                      setStartDay(startDay);
                      setEndDay(endDay);
                    }
              }
            ></ReactJewishDatePicker>
            {props.children}
          </div>
          <div className={"basicJewishDayInfo"}>
            {basicJewishDay ? <h5>Day value:</h5> : null}
            {startDay ? <h5>Range value:</h5> : null}
            {startDay ? (
              <pre>
                <h4>start day:</h4>
                {JSON.stringify(startDay, null, 2)}
                <h4>end day:</h4>
                {JSON.stringify(endDay, null, 2)}
              </pre>
            ) : (
              <pre>{JSON.stringify(basicJewishDay, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactJewishDatePickerExample.defaultProps = {
  isHebrew: false,
};
