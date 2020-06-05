'use strict';



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

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

___$insertStyle(".reactJewishDatePicker {\n  color: cornflowerblue;\n}");

var ReactJewishDatePicker = function (props) {
    return (React.createElement("div", { className: "reactJewishDatePicker" }, "Date Picker"));
};

exports.ReactJewishDatePicker = ReactJewishDatePicker;
//# sourceMappingURL=index.js.map
