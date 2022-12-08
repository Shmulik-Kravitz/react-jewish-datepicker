# jewish-dates-core

This package is core functionality of <a href="https://www.npmjs.com/package/react-jewish-datepicker">react-jewish-datepicker</a>

If you want to create a jewish date picker in vue.js or angular, this is the core dependency.

## Installation

```console
yarn add jewish-dates-core
```

Or with npm

```console
npm i jewish-dates-core --save
```

## Functions

<dl>
<dt><a href="#isValidDate">isValidDate</a></dt>
<dd><p>Returns whether a date is a Date object</p>
</dd>
<dt><a href="#isMeubar">isMeubar</a></dt>
<dd><p>Returns whether a hebrew year is meubar (leap year)</p>
</dd>
<dt><a href="#getHebWeekdays">getHebWeekdays</a></dt>
<dd><p>Returns an array of week days in hebrew</p>
</dd>
<dt><a href="#getEngWeekdays">getEngWeekdays</a></dt>
<dd><p>Returns an array of week days in english</p>
</dd>
<dt><a href="#getWeekdays">getWeekdays</a></dt>
<dd><p>Returns an array of week days</p>
</dd>
<dt><a href="#convertToHebrew">convertToHebrew</a></dt>
<dd><p>Converts a numerical value to a string of Hebrew letters (gematriya)</p>
</dd>
<dt><a href="#getHebJewishMonthById">getHebJewishMonthById</a></dt>
<dd><p>Takes a jewish month name in english and returns the name in hebrew</p>
</dd>
<dt><a href="#getHebJewishMonths">getHebJewishMonths</a></dt>
<dd><p>Returns an array of jewish months in hebrew</p>
</dd>
<dt><a href="#getEngJewishMonths">getEngJewishMonths</a></dt>
<dd><p>Returns an array of jewish months in english</p>
</dd>
<dt><a href="#getJewishMonths">getJewishMonths</a></dt>
<dd><p>Returns an array of jewish months according to year and language</p>
</dd>
<dt><a href="#getJewishYears">getJewishYears</a></dt>
<dd><p>Takes a number of a jewish year and returns array of 200 years around it</p>
</dd>
<dt><a href="#getPrevMonth">getPrevMonth</a></dt>
<dd><p>Takes a BasicJewishMonthInfo object and returns the equivalent of prev month</p>
</dd>
<dt><a href="#getNextMonth">getNextMonth</a></dt>
<dd><p>Takes a BasicJewishMonthInfo object and returns the equivalent of next month</p>
</dd>
<dt><a href="#getGregDate">getGregDate</a></dt>
<dd><p>Converts BasicJewishDate object to gregorian date</p>
</dd>
<dt><a href="#getJewishMonthInfo">getJewishMonthInfo</a></dt>
<dd><p>Takes a gregorian date and returns BasicJewishMonthInfo object</p>
</dd>
<dt><a href="#formatJewishDate">formatJewishDate</a></dt>
<dd><p>Takes a BasicJewishDate object and returns a string of the date in english</p>
</dd>
<dt><a href="#formatJewishDateHebrew">formatJewishDateHebrew</a></dt>
<dd><p>Takes a BasicJewishDate object and returns a string of the date in hebrew</p>
</dd>
<dt><a href="#getJewishDate">getJewishDate</a></dt>
<dd><p>Takes a gregorian date and returns a BasicJewishDate object</p>
</dd>
<dt><a href="#IsJewishDatesEqual">IsJewishDatesEqual</a></dt>
<dd><p>Compares jewish dates returning true if the dates match and false if not</p>
</dd>
<dt><a href="#getJewishDay">getJewishDay</a></dt>
<dd><p>Takes a dayjs date and returns a JewishDay object</p>
</dd>
<dt><a href="#getJewishMonth">getJewishMonth</a></dt>
<dd><p>Takes a gregorian date and returns a JewishMonth object</p>
</dd>
<dt><a href="#getHolidays">getHolidays</a></dt>
<dd><p>Returns an array of jewish holiday dates corresponding with the isIsrael param</p>
</dd>
<dt><a href="#dontSelectHolidays">dontSelectHolidays</a></dt>
<dd><p>Returns a function which can be passed to the `canSelect` prop, in order to prevent holidays selection</p>
</dd>
<dt><a href="#dontSelectShabat">dontSelectShabat</a></dt>
<dd><p>A function to be passed to the "canSelect" prop, in order to prevent shabat selection</p>
</dd>
<dt><a href="#dontSelectShabatAndHolidays">dontSelectShabatAndHolidays</a></dt>
<dd><p>Returns a function to be passed to the "canSelect" prop. combines "dontSelectHolidays" and "dontSelectShabat" in order to prevent both - shabat and holidays selection</p>
</dd>
<dt><a href="#dontSelectOutOfRange">dontSelectOutOfRange</a></dt>
<dd><p>Takes min date and max date and returns a function to be passed to the "canSelect" prop, in order to prevent selection out of the supplied range</p>
</dd>
<dt><a href="#addDates">addDates</a></dt>
<dd><p>Adds days to a given date</p>
</dd>
<dt><a href="#subtractDates">subtractDates</a></dt>
<dd><p>Subtracts days to a given date</p>
</dd>
<dl>

<a name="isValidDate"></a>

### isValidDate(date: `Date` | `BasicJewishDate`) ⇒ `boolean`

Returns whether a date is a Date object.

| Param | Type                        |
| ----- | --------------------------- |
| date  | `Date` \| `BasicJewishDate` |

**example:**
```js
const basicJewishDate: BasicJewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5788,
};

isValidDate(basicJewishDate); // ==> false
isValidDate(new Date()); // ==> true
```

<a name="isMeubar"></a>

### isMeubar(year: `number`) ⇒ `boolean`

Returns whether a hebrew year is meubar (leap year).

| Param | Type     |
| ----- | -------- |
| year  | `number` |

**example:**
```js
isMeubar(5781); // ==> false
isMeubar(5782); // ==> true
```

<a name="getHebWeekdays"></a>

### getHebWeekdays() ⇒ `string[]`

Returns an array of week days in hebrew.

**example:**
```js
getHebWeekdays(); // ==> ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
```

<a name="getEngWeekdays"></a>

### getEngWeekdays() ⇒ `string[]`

Returns an array of week days in english.

**example:**
```js
getEngWeekdays(); // ==> ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
```

<a name="getWeekdays"></a>

### getWeekdays(isHebrew: `boolean`) ⇒ `string[]`

Returns an array of week days corresponding with the isHebrew param.

| Param    | Type      |
| -------- | --------- |
| isHebrew | `boolean` |

**example:**
```js
getWeekdays(true); // ==> ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
getWeekdays(false); // ==> ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
```

<a name="convertToHebrew"></a>

### convertToHebrew(num: `number`, [addGeresh: `boolean`, addPunctuate: `boolean`]) ⇒ `string`

Converts a numerical value to a string of Hebrew letters (gematriya).

Based on [gematriya](https://github.com/Scimonster/js-gematriya) library:

> Setting false as the value for the punctuate key will remove double and single quotation marks in the returned string. Setting geresh to false will use ASCII single/double quotes instead of Hebrew geresh/gershayim Unicode characters. (see example bellow)

| Param        | Type      | Default |
| ------------ | --------- | ------- |
| num          | `number`  | n/a     |
| addGeresh    | `boolean` | `true`  |
| addPunctuate | `boolean` | `true`  |

**example:**
```js
convertToHebrew(5782); // ==> 'תשפ״ב'
convertToHebrew(5782, false); // ==> 'תשפ"ב'
convertToHebrew(5782, false, false); // ==> 'תשפב'
```

<a name="getHebJewishMonthById"></a>

### getHebJewishMonthById(monthId: `string`) ⇒ `string`

Takes a jewish month name in english and returns the name in hebrew.

| Param   | Type     |
| ------- | -------- |
| monthId | `string` |

**example:**
```js
getHebJewishMonthById("Tishri"); // ==> 'תשרי'
```

<a name="getHebJewishMonths"></a>

### getHebJewishMonths() ⇒ `IdText[]`

Returns an array of jewish months in hebrew.

**example:**
```js
getHebJewishMonths(); // ==> [{id: "Tishri", text: "תשרי"}, {id: "Cheshvan", text: "חשון"} ...]
```

<a name="getEngJewishMonths"></a>

### getEngJewishMonths() ⇒ `IdText[]`

Returns an array of jewish months in english.

**example:**
```js
getEngJewishMonths(); // ==> [{id: "Tishri", text: "Tishri"}, {id: "Cheshvan", text: "Cheshvan"} ...]
```

<a name="getJewishMonths"></a>

### getJewishMonths(year: `number`, [isHebrew?: `boolean`]) ⇒ `IdText[]`

Returns an array of jewish months according to year (regular/leap) and language.

| Param    | Type      | Default |
| -------- | --------- | ------- |
| year     | `number`  | n/a     |
| isHebrew | `boolean` | `false` |

**example:**
```js
getJewishMonths(5781, true); // ==> [... {id: "AdarI", text: "אדר"}, {id: "Nisan", text: "ניסן"} ...] regular year months in henrew
getJewishMonths(5782); // ==> [... {id: "AdarI", text: "AdarI"}, {id: "AdarII", text: "AdarII"} ...] leap year months in english
```

<a name="getJewishYears"></a>

### getJewishYears(year: `number`) ⇒ `number[]`

Takes a number of a jewish year and returns array of 200 years around it.

| Param | Type     |
| ----- | -------- |
| year  | `number` |

**example:**
```js
getJewishYears(5781); // ==> [5681, 5682, ... 5781, ... 5880, 5881]
getJewishYears(5781).length; // ==> 201
```

<a name="getPrevMonth"></a>

### getPrevMonth(basicJewishMonthInfo: `BasicJewishMonthInfo`) ⇒ `BasicJewishMonthInfo`

Takes a BasicJewishMonthInfo object and returns the equivalent of prev month.

| Param                | Type                   |
| -------------------- | ---------------------- |
| basicJewishMonthInfo | `BasicJewishMonthInfo` |

**example:**
```js
const tishriInfo: BasicJewishMonthInfo = {
  isHebrew: false,
  month: "Tishri",
  year: 5782,
};

getPrevMonth(tishriInfo); // ==> {isHebrew: false, month: 'Elul', year: 5781}
```

<a name="getNextMonth"></a>

### getNextMonth(basicJewishMonthInfo: `BasicJewishMonthInfo`) ⇒ `BasicJewishMonthInfo`

Takes a BasicJewishMonthInfo object and returns the equivalent of next month.

| Param                | Type                   |
| -------------------- | ---------------------- |
| basicJewishMonthInfo | `BasicJewishMonthInfo` |

**example:**
```js
const elulInfo: BasicJewishMonthInfo = {
  isHebrew: true,
  month: "Elul",
  year: 5781,
};

getNextMonth(elulInfo); // ==> {isHebrew: true, month: 'Tishri', year: 5782}
```

<a name="getGregDate"></a>

### getGregDate(props: BasicJewishDate) ⇒ `Date`

Converts BasicJewishDate object to gregorian date.

| Param | Type              |
| ----- | ----------------- |
| props | `BasicJewishDate` |

**example:**
```js
const basicJewishDate: BasicJewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
};

getGregDate(basicJewishDate); // ==> Sat Aug 21 2021 00:00:00 GMT+0300 (שעון ישראל (קיץ))
```

<a name="getJewishMonthInfo"></a>

### getJewishMonthInfo(date: Date) ⇒ `JewishMonthInfo`

Takes a gregorian date and returns BasicJewishMonthInfo object.

| Param | Type   |
| ----- | ------ |
| date  | `Date` |

**example:**
```js
getJewishMonthInfo(new Date(2022, 0, 27)); /* ==> { jewishDate: {year: 5782, month: 5, day: 25, monthName: 'Shevat'},
                                                    jewishMonth: 5,
                                                    startOfJewishMonth: Dayjs(new Date(2022, 0, 3)),
                                                    sundayStartOfTheMonth: Dayjs(new Date(2022, 0, 2))} */
```

<a name="formatJewishDate"></a>

### formatJewishDate(jewishDate: `JewishDate`) ⇒ `string`

Takes a BasicJewishDate object and returns a string of the date in english.

| Param      | Type         |
| ---------- | ------------ |
| jewishDate | `JewishDate` |

**example:**
```js
const jewishDate: JewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
  month: 13,
};

formatJewishDate(jewishDate); // ==> "13 Elul 5781"
```

<a name="formatJewishDateHebrew"></a>

### formatJewishDateHebrew(jewishDate: `JewishDate`) ⇒ `string`

Takes a BasicJewishDate object and returns a string of the date in hebrew.

| Param      | Type         |
| ---------- | ------------ |
| jewishDate | `JewishDate` |

**example:**
```js
const jewishDate: JewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
  month: 13,
};

formatJewishDateHebrew(jewishDate); // ==> "י״ג אלול התשפ״א"
```

<a name="getJewishDate"></a>

### getJewishDate(date: `Date`) ⇒ `JewishDate`

Takes a gregorian date and returns a BasicJewishDate object.

| Param | Type   |
| ----- | ------ |
| date  | `Date` |

**example:**
```js
getJewishDate(new Date(2021, 7, 21)); // ==> {day: 13, monthName: "Elul", year: 5781, month: 13}
```

<a name="IsJewishDatesEqual"></a>

### IsJewishDatesEqual(jewishDate1: `JewishDate`, jewishDate2: `JewishDate`) ⇒ `boolean`

Compares jewish dates returning true if the dates match and false if not.

| Param       | Type         |
| ----------- | ------------ |
| jewishDate1 | `JewishDate` |
| jewishDate2 | `JewishDate` |

**example:**
```js
const jewishDate1: JewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
  month: 13,
};
const jewishDate2: JewishDate = {
  day: 14,
  monthName: "Shevat",
  year: 5781,
  month: 5,
};

IsJewishDatesEqual(jewishDate1, jewishDate2); // ==> false
IsJewishDatesEqual(jewishDate2, jewishDate2); // ==> true
```

<a name="getJewishDay"></a>

### getJewishDay(dayjsDate: `Dayjs`) ⇒ `JewishDay`

Takes a gregorian date and returns a JewishMonth object.

| Param     | Type    |
| --------- | ------- |
| dayjsDate | `Dayjs` |

**example:**
```js
const date = Dayjs(new Date(2022, 0, 27));

getJewishDay(date); /* ==> { date: 2022-01-26T22:00:00.000Z,
                             day: 25,
                             dayjsDate: d {'$L': 'en', '$d': 2022-01-26T22:00:00.000Z, '$y': 2022, '$M': 0, '$D': 27, '$W': 4, '$H': 0, '$m': 0, '$s': 0, '$ms': 0},
                             isCurrentMonth: false,
                             jewishDate: { year: 5782, month: 5, day: 25, monthName: 'Shevat' },
                             jewishDateStr: '25 Shevat 5782',
                             jewishDateStrHebrew: 'כ״ה שבט התשפ״ב'} */
```

<a name="getJewishMonth"></a>

### getJewishMonth(date: `Date`) ⇒ `JewishMonth`

Takes a gregorian date and returns a JewishMonth object.

| Param | Type   |
| ----- | ------ |
| date  | `Date` |

**example:**
```js
getJewishMonth(new Date(2022, 0, 27)); /* ==> selectedDay: { day: 25, jewishDateStr: '25 Shevat 5782', ...},
                                              jewishMonth: 5,
                                              jewishYear: 5782,
                                              jewishMonthString: 'Shevat',
                                              days: [{day: 29, jewishDateStr: '29 Tevet 5782', ...}, { day: 1, jewishDateStr: '1 Shevat 5782', ...}, ...] */
```

<a name="getHolidays"></a>

### getHolidays(isIsrael: `boolean`) ⇒ `string[]`

Returns an array of jewish holiday dates corresponding with the isIsrael param.

| Param | Type   |
| ----- | ------ |
| isIsrael  | `boolean` |

**example:**
```js
getHolidays(true); // ==> ['1 Tishri', '2 Tishri', '10 Tishri', '15 Tishri', '22 Tishri', '15 Nisan', '21 Nisan', '6 Sivan']
getHolidays(false); // ==> ['1 Tishri', '2 Tishri', '10 Tishri', '15 Tishri', '22 Tishri', '15 Nisan', '21 Nisan', '6 Sivan', '16 Tishri', '23 Tishri', '16 Nisan', '22 Nisan', '7 Sivan']
```

<a name="dontSelectHolidays"></a>

### dontSelectHolidays([isIsrael: `boolean`]) ⇒ `(day: BasicJewishDay) => boolean`

Returns a function which can be passed to the `canSelect` prop, in order to prevent holidays (corresponding with `isIsrael` param) selection. The returned function takes a `BasicJewishDay` object, and returns `false` if it's an holiday and `true` otherwise.

| Param | Type   | Default |
| ----- | ------ | ----- |
| isIsrael  | `boolean` | `false` |

**example:**
full example [here](https://react-jewish-datepicker.js.org/#disableHolidays)

<a name="dontSelectShabat"></a>

### dontSelectShabat(day: `BasicJewishDay`) ⇒ `boolean`

A function to be passed to the `canSelect` prop, in order to prevent shabat selection. Takes a `BasicJewishDay` object, and returns `false` if it's an shabat and `true` otherwise.

| Param | Type   |
| ----- | ------ |
| day  | `BasicJewishDay` |

**example:**
full example [here](https://react-jewish-datepicker.js.org/#disableShabat)

<a name="dontSelectShabatAndHolidays"></a>

### dontSelectShabatAndHolidays([isIsrael: `boolean`]) ⇒ `(day: BasicJewishDay) => boolean`

Returns a function to be passed to the "canSelect" prop. combines `dontSelectHolidays` and `dontSelectShabat` in order to prevent both - shabat and holidays selection. The returned function takes a `BasicJewishDay` object, and returns `false` if it's an shabat or holiday and `true` otherwise.

| Param | Type   | Default |
| ----- | ------ | ----- |
| isIsrael  | `boolean` | `false` |

**example:**
full example [here](https://react-jewish-datepicker.js.org/#disableShabatAndHolidays)

<a name="dontSelectOutOfRange"></a>

### dontSelectOutOfRange(minDate: `Date` | `null`, maxDate: `Date` | `null`) ⇒ `(day: BasicJewishDay) => boolean`

Takes min date and max date and returns a function to be passed to the "canSelect" prop, in order to prevent selection out of the supplied range. The returned function takes a `BasicJewishDay` object, and returns `true` if it's within range (min date and max date included) and `false` otherwise.

You can pass a date only for one of the params and null to the other. In this case, the selectable range will be up to max date or from min date.

| Param | Type   |
| ----- | ------ |
| minDate  | `Date` \| `null` |
| maxDate  | `Date` \| `null` |

**example:**
full example [here](https://react-jewish-datepicker.js.org/#selectionWithinRange)

<a name="addDates"></a>

### addDates(date: `BasicJewishDate` | `Date`, numDays: `number`) ⇒ `Date`

Takes a `BasicJewishDate` object or a `Date`, adds a date interval (`numDays`) to the date and then returns the new date.

| Param | Type   |
| ----- | ------ |
| date  | `BasicJewishDate` \| `Date` |
| numDays  | `number` |

**example:**
```js
const date = new Date(2022, 3, 17);

addDates(date, 3)) // => Wed Apr 20 2022 00:00:00 GMT+0300 (שעון ישראל (קיץ))
```

<a name="subtractDates"></a>

### subtractDates(date: `BasicJewishDate` | `Date`, numDays: `number`) ⇒ `Date`

Takes a `BasicJewishDate` object or a `Date`, subtracts a date interval (`numDays`) from the date and then returns the new date.

| Param | Type   |
| ----- | ------ |
| date  | `BasicJewishDate` \| `Date` |
| numDays  | `number` |

**example:**
```js
const basicJewishDate: BasicJewishDate = {
  day: 13,
  monthName: "Elul",
  year: 5781,
};

subtractDates(basicJewishDate, 4)) // => Tue Aug 17 2021 00:00:00 GMT+0300 (שעון ישראל (קיץ))
```

- [Shmulik Kravitz](https://github.com/Shmulik-Kravitz)
- [Sagi Tawil](https://github.com/sagi770)
- [Yochanan Sheinberger](https://github.com/yochanan-sheinberger)
