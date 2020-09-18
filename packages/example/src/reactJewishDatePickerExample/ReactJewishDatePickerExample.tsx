import * as React from 'react';
import "./ReactJewishDatePickerExample.scss";
import { ReactJewishDatePicker, BasicJewishDay, BasicJewishDate } from 'react-jewish-datepicker';

export interface ReactJewishDatePickerExampleProps {
    isHebrew?: boolean;
    value?: BasicJewishDate | Date;
}

export const ReactJewishDatePickerExample: React.FC<ReactJewishDatePickerExampleProps> = (props: ReactJewishDatePickerExampleProps) => {
    const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay | undefined>(undefined);
    const [isHebrew, setIsHebrew] = React.useState<boolean>(!!props.isHebrew);


    return (
        <div className="reactJewishDatePickerExample">
            <label className="switch">
                <input type="checkbox" value="true" checked={isHebrew} onChange={() => setIsHebrew(!isHebrew)} />
                Hebrew View:
            </label>
            <ReactJewishDatePicker isHebrew={isHebrew} value={props.value} onClick={(day: BasicJewishDay) => {
                setBasicJewishDay(day);
            }}></ReactJewishDatePicker>
            <div className="basicJewishDayInfo">
                {basicJewishDay ? <div>Day value:</div> : null}
                <pre >{JSON.stringify(basicJewishDay, null, 2)}</pre>
            </div>
        </div >
    )
};

ReactJewishDatePickerExample.defaultProps = {
    isHebrew: false
};
