import { BasicJewishMonthInfo, getNextMonth, getPrevMonth, JewishMonth } from "../src";

let month: BasicJewishMonthInfo = {
    month: JewishMonth.Tishri,
    year: 5782,
    isHebrew: true,
};
for (let index = 0; index < 12; index++) {
    month = getNextMonth(month);
    console.log(month);
}
console.log('----------------------------------------------------------------');
for (let index = 0; index < 12; index++) {
    month = getPrevMonth(month);
    console.log(month);
}
