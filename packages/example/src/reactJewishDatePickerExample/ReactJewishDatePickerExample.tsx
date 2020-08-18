import * as React from 'react';
import "./ReactJewishDatePickerExample.scss";
import { BasicJewishDay } from 'react-jewish-datepicker';

export interface ReactJewishDatePickerExampleProps {
    basicJewishDay?: BasicJewishDay;
    displayIsHebrew: boolean;
    setDisplayIsHebrew: (displayIsHebrew: boolean) => void;
}

export const ReactJewishDatePickerExample: React.FC<ReactJewishDatePickerExampleProps> = (props: ReactJewishDatePickerExampleProps) => {
    return (
        < div className="ReactJewishDatePickerExample" >
            {props.basicJewishDay ? <div>Day value:</div> : null}
            <pre >{JSON.stringify(props.basicJewishDay, null, 2)}</pre>
            <label className="switch">
                <input type="checkbox" value="true" onChange={() => props.setDisplayIsHebrew(!props.displayIsHebrew)} />
                Hebrew View:
            </label>
        </div >
    )
};

