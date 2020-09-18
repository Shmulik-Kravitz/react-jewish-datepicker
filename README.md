# react-jewish-datepicker

[![npm](https://badgen.net/npm/v/react-jewish-datepicker)](https://www.npmjs.com/package/react-jewish-datepicker)
![CI](https://github.com/Shmulik-Kravitz/react-jewish-datepicker/workflows/CI/badge.svg?branch=master)
![license](https://badgen.net/npm/license/react-jewish-datepicker)
![size](https://badgen.net/bundlephobia/min/react-jewish-datepicker)
![size minzip](https://badgen.net/bundlephobia/minzip/react-jewish-datepicker)
![stars](https://badgen.net/github/stars/Shmulik-Kravitz/react-jewish-datepicker)
![open issues](https://badgen.net/github/open-issues/Shmulik-Kravitz/react-jewish-datepicker)
![watchers](https://badgen.net/github/watchers/Shmulik-Kravitz/react-jewish-datepicker)



![npm](https://raw.githubusercontent.com/Shmulik-Kravitz/react-jewish-datepicker/master/images/snapshot.png)




## Demo:
https://react-jewish-datepicker.js.org/

### Installation

```console
yarn add react-jewish-datepicker
```

Or with npm
```console
npm install react-jewish-datepicker --save
```



## TypeScript example:
```js
import * as React from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDay,
  BasicJewishDate
} from "react-jewish-datepicker";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5788
  };

  return (
    <>
      <div>
        Hebrew:
        <ReactJewishDatePicker
          value={basicJewishDate}
          isHebrew
          onClick={(day: BasicJewishDay) => {
            setBasicJewishDay(day);
          }}
        />
      </div>
    </>
  );
}


```
[![Edit react-jewish-datepicker-typescript-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-jewish-datepicker-typescript-example-1myb0?fontsize=14&hidenavigation=1&theme=dark)

## JavaScript example:
```js
import * as React from "react";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";

export default function App() {
  const [basicJewishDay, setBasicJewishDay] = React.useState();
  return (
    <ReactJewishDatePicker
      value={new Date()}
      isHebrew
      onClick={(day) => {
        setBasicJewishDay(day);
      }}
    />
  );
}



```
[![Edit react-jewish-datepicker-javascript-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pedantic-gagarin-rdeov?fontsize=14&hidenavigation=1&theme=dark)

## Contributors
<div>Shmulik Kravitz</div>
<div>Sagi Tawil</div>