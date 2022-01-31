import * as React from "react";
import "./ReactJewishDatePickerExample.scss";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
  BasicJewishDate,
  BasicJewishDateRange,
  DateRange,
} from "react-jewish-datepicker";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { HiOutlineClipboard } from "@react-icons/all-files/hi/HiOutlineClipboard"; 
import { HiOutlineClipboardCheck } from "@react-icons/all-files/hi/HiOutlineClipboardCheck"; 
export interface ReactJewishDatePickerExampleProps {
  isHebrew?: boolean;
  value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
  canSelect?: (day: BasicJewishDay) => boolean;
  isRange?: boolean;
  code: string;
}

export const ReactJewishDatePickerExample: React.FC<ReactJewishDatePickerExampleProps> = (
  props: ReactJewishDatePickerExampleProps
) => {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const [startDay, setStartDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const [endDay, setEndDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.code);
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1500);
  }

  return (
    <div className="reactJewishDatePickerExample">
      <div className="demo">
        <button
          className="copy"
          onClick={copyToClipboard}
        >
          {isCopied ? <HiOutlineClipboardCheck size={23} /> :
          <HiOutlineClipboard size={23} />}
        </button>
        <SyntaxHighlighter
          language="jsx"
          style={atomOneLight}
          wrapLongLines
        >
          {props.code}
        </SyntaxHighlighter>
        <div className={`example${props.isHebrew ? " isHebrew" : ""}`}>
          <div className={`pickerWrapper${props.isRange ? " isRange" : ""}`}>
            <ReactJewishDatePicker
              isHebrew={!!props.isHebrew}
              value={props.value}
              canSelect={props.canSelect}
              isRange={props.isRange}
              onClick={!props.isRange ? ((day: BasicJewishDay) => {              
                setBasicJewishDay(day);
              }): ((startDay: BasicJewishDay, endDay: BasicJewishDay) => {                
                setStartDay(startDay);
                setEndDay(endDay);
              })}
            ></ReactJewishDatePicker>
          </div>
          <div className={"basicJewishDayInfo"}>
            {basicJewishDay ? <h5>Day value:</h5> : null}
            {startDay ? <h5>Range value:</h5> : null}
            {startDay ? <pre>
              <h4>start day:</h4>
              {JSON.stringify(startDay, null, 2)}
              <h4>end day:</h4>
              {JSON.stringify(endDay, null, 2)}
              </pre> :
            <pre>{JSON.stringify(basicJewishDay, null, 2)}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactJewishDatePickerExample.defaultProps = {
  isHebrew: false,
};
