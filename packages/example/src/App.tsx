import * as React from 'react';
import { ReactJewishDatePickerExample } from './reactJewishDatePickerExample';
import './app.css';
import { BasicJewishDate } from 'react-jewish-datepicker';

export function App() {
  const date: Date = new Date();

  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5788
  };
 return (
    <div className="app">
      <ReactJewishDatePickerExample value={date} />
      <ReactJewishDatePickerExample value={basicJewishDate} isHebrew />
    </div>
  );
}
