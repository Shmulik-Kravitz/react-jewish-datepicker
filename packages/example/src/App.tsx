import * as React from 'react';
import { ReactJewishDatePicker, BasicJewishDay } from 'react-jewish-datepicker';
import {ReactJewishDatePickerExample} from './reactJewishDatePickerExample';

export function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const [displayIsHebrew, setDisplayIsHebrew] = React.useState<boolean>(false);

  return (
    <div className="App">
      <ReactJewishDatePicker isHebrew={displayIsHebrew} onClick={(day: BasicJewishDay) => {
        setBasicJewishDay(day);
      }} />

      <ReactJewishDatePickerExample basicJewishDay={basicJewishDay} displayIsHebrew={displayIsHebrew} setDisplayIsHebrew={setDisplayIsHebrew}/>
    </div>
  );
}
 