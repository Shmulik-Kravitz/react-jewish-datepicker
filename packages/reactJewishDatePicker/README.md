# react-jewish-datepicker

[![npm](https://img.shields.io/npm/v/react-jewish-datepicker.svg)](https://www.npmjs.com/package/react-jewish-datepicker)
![CI](https://github.com/Shmulik-Kravitz/react-jewish-datepicker/workflows/CI/badge.svg?branch=master)

## Demo:
https://react-jewish-datepicker-app.web.app/

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
import * as React from 'react';
import { ReactJewishDatePicker, BasicJewishDay } from 'react-jewish-datepicker';

export const Example: React.FC<{}> = (props: {}) => {
  const [basicJewishDay, setBasicJewishDay] = React.useState<BasicJewishDay>();
  return (
    <ReactJewishDatePicker isHebrew onClick={(day: BasicJewishDay) => {
      setBasicJewishDay(day);
    }} />
  );
}

```
[![Edit react-jewish-datepicker-typescript-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-jewish-datepicker-typescript-example-1myb0?fontsize=14&hidenavigation=1&theme=dark)

## JavaScript example:
```js
import * as React from 'react';
import { ReactJewishDatePicker, BasicJewishDay } from 'react-jewish-datepicker';

export function Example() {
  const [basicJewishDay, setBasicJewishDay] = React.useState();
  return (
    <ReactJewishDatePicker isHebrew onClick={(day) => {
      setBasicJewishDay(day);
    }} />
  );
}
```
[![Edit react-jewish-datepicker-javascript-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pedantic-gagarin-rdeov?fontsize=14&hidenavigation=1&theme=dark)