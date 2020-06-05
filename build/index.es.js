function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

import { createElement } from 'react';

___$insertStyle(".reactJewishDatePicker {\n  color: cornflowerblue;\n}");

var ReactJewishDatePicker = function (props) {
    return (createElement("div", { className: "reactJewishDatePicker" }, "Date Picker"));
};

export { ReactJewishDatePicker };
//# sourceMappingURL=index.es.js.map
