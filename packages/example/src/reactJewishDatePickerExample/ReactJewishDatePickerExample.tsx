import * as React from "react";
import "./ReactJewishDatePickerExample.scss";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
  BasicJewishDate,
  RangeDays,
} from "react-jewish-datepicker";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { HiOutlineClipboard, HiOutlineClipboardCheck } from "react-icons/hi";

export interface ReactJewishDatePickerExampleProps {
  isHebrew?: boolean;
  value?: BasicJewishDate | Date;
  canSelect?: (day: BasicJewishDay, il?: boolean) => boolean;
  il?: boolean;
  minDate?: Date;
  maxDate?: Date;
  rangePicker?: boolean;
  code: string;
}

export const ReactJewishDatePickerExample: React.FC<ReactJewishDatePickerExampleProps> = (
  props: ReactJewishDatePickerExampleProps
) => {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay | undefined>(undefined);
  const [rangeDays, setRangeDays] = React.useState<RangeDays | undefined>(undefined);
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
        <div className="example">
          <ReactJewishDatePicker
            isHebrew={!!props.isHebrew}
            value={props.value}
            canSelect={props.canSelect}
            rangePicker={props.rangePicker}
            il={props.il}
            onClick={!props.rangePicker ? ((day: BasicJewishDay) => {              
              setBasicJewishDay(day);
            }): ((range: RangeDays) => {
              setRangeDays(range);
            })}
          ></ReactJewishDatePicker>
          <div className={"basicJewishDayInfo" + props.rangePicker ? " isRange" : ""}>
            {basicJewishDay ? <h5>Day value:</h5> : null}
            {rangeDays ? <h5>Range value:</h5> : null}
            <pre>{JSON.stringify(basicJewishDay, null, 2)}</pre>
            <pre>{JSON.stringify(rangeDays, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactJewishDatePickerExample.defaultProps = {
  isHebrew: false,
};
