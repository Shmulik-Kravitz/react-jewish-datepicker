import * as React from 'react';
import { ReactJewishDatePicker, BasicJewishDay } from 'react-jewish-datepicker';
import {ReactJewishDatePickerExample} from './reactJewishDatePickerExample';
import './App.css';

export function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>({
    "fullJewishDateString": "20 Tishri 5781",
    "fullHebrewJewishDateString": "כ׳ תשרי התשפ״א",
    "jewishDate": {
      "year": 5781,
      "month": 1,
      "date": 20,
      "monthName": "Tishri"
    },
    "date": new Date("2020-10-07T21:00:00.000Z")
  });
  const [displayIsHebrew, setDisplayIsHebrew] = React.useState<boolean>(false);

  return (
    <div className="App">
      <ReactJewishDatePicker  isHebrew={displayIsHebrew} onClick={(day: BasicJewishDay) => {
        setBasicJewishDay(day);
      }}></ReactJewishDatePicker>
      <ReactJewishDatePickerExample basicJewishDay={basicJewishDay} displayIsHebrew={displayIsHebrew} setDisplayIsHebrew={setDisplayIsHebrew}/>
    </div>
  );
}
 