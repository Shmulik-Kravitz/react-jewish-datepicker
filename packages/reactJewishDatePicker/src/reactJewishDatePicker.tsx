import * as React from 'react';
import useOnClickOutside from 'use-onclickoutside';
import "./reactJewishDatePicker.scss";
import { getJewishMonth, getWeekdays, getGregDate, BasicJewishDay, BasicJewishDate, isValidDate, RangeDays } from 'jewish-dates-core';
import { MdDateRange } from "react-icons/md";
import { Day } from './day';
import { Weekday } from './weekday';
import { Navigation } from './navigation';
import { getTestID } from './utils';
import * as Dayjs from "dayjs";
const dayjs = Dayjs.default;

export interface ReactJewishDatePickerProps {
    className?: string;
    onClick: ((day: BasicJewishDay) => void) & ((range: RangeDays) => void);
    value?: BasicJewishDate | Date;
    isHebrew: boolean;
    canSelect?: (day: BasicJewishDay, il?: boolean) => boolean;
    il?: boolean;
    rangePicker?: boolean;
}

const getDatesInOrder = (day1: BasicJewishDay, day2: BasicJewishDay): BasicJewishDay[] => {
    if (day1 && day2) {
        return dayjs(day1.date).isBefore(dayjs(day2.date)) ? [day1, day2] : [day2, day1];
    } else {
        return [];
    } 
}

const getselectedRangeToDisplay = (isHebrew: boolean, startDay: BasicJewishDay, endDay: BasicJewishDay): string => {
    if (isHebrew) {
        return `${startDay?.jewishDateStrHebrew || 'בחר תאריכים'}${endDay ? ' - ' + endDay.jewishDateStrHebrew : ''}`;
    } else {
        return `${startDay?.jewishDateStr || 'Pick Dates'}${endDay ? ' - ' + endDay.jewishDateStr: ''}`;
    } 
}

export const ReactJewishDatePicker: React.FC<ReactJewishDatePickerProps> = (props: ReactJewishDatePickerProps) => {
    const { className, value, isHebrew, il, rangePicker, onClick, canSelect } = props;
    if (typeof value == 'string') {
        throw new Error("ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}");
    }
    // const month = getJewishMonth(new Date("2020-05-24"));
    const dateInit = isValidDate(value) ? value : getGregDate(value);
    const [date, setDate] = React.useState(dateInit);
    const jewishMonth = getJewishMonth(date);

    const [selectedDay, setSelectedDay] = React.useState<BasicJewishDay>(!rangePicker && value && jewishMonth.selectedDay);
    const [startDay, setStartDay] = React.useState<BasicJewishDay>(null);
    const [endDay, setEndDay] = React.useState<BasicJewishDay>(null);
    const [isOpen, setOpen] = React.useState(false);
    const [hoveredDay, setHoveredDay] = React.useState(null);
    const ref = React.useRef(null);
    const monthRef = React.useRef(null);

    useOnClickOutside(ref, () => {
        setOpen(false);
    });
    
    const handleClick = (day: BasicJewishDay) => {        
        if (rangePicker) {
            if (!startDay || endDay) {
                setStartDay(day);
                setEndDay(null);
            } else {
                const [start, end] = getDatesInOrder(startDay, day);
                setStartDay(start);
                setEndDay(end);
                props?.onClick({startDay: start, endDay: end});
                setOpen(!isOpen);
            }
        } else {
            setSelectedDay(day);
            props?.onClick(day); 
            setOpen(!isOpen)
        }
    };
    
    const handleMouseOver = (day: BasicJewishDay) => {
        setHoveredDay(day);
    };

    const setBasicJewishDate = (basicJewishDate: BasicJewishDate) => {
        const gregDate = getGregDate(basicJewishDate);
        setDate(gregDate);
    }; 

    const handleNavigationClick = (month: string, year: number) => {
        const basicJewishDate: BasicJewishDate = { year: year, monthName: month, day: jewishMonth.selectedDay.day } ;
        setBasicJewishDate(basicJewishDate);
    }; 

    const [start, end] = getDatesInOrder(startDay, hoveredDay);


    const classNames = `reactJewishDatePicker${isHebrew ? ` isHebrew` : ''} ${className || ''}`;
    const selectedDayToDisplay = selectedDay && (isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr);
    const selectedRangeToDisplay = getselectedRangeToDisplay(isHebrew, startDay, endDay);
    const selectedDayClass = rangePicker ? `selectedRange` : `selectedDate`;

    return (
        <div ref={ref} className={classNames}>
            <div data-testid={getTestID('selectedDate')} onClick={() => setOpen(!isOpen)} className={selectedDayClass}>
                <MdDateRange className="calendarIcon" />
                {rangePicker ? selectedRangeToDisplay : selectedDayToDisplay}
            </div>
            <div className={`monthWrapper ${isOpen ? `open` : ``}`}>
                <Navigation month={jewishMonth.jewishMonthString} year={jewishMonth.jewishYear} isHebrew={isHebrew} onClick={handleNavigationClick} />
                <div className='weekdayWrapper'>
                    {getWeekdays(isHebrew).map((weekday, index) => {
                        return <Weekday key={index} value={weekday} />
                    })}
                </div>
                <div className={`month`} ref={monthRef} >
                    {jewishMonth.days.map((day, index) => {                        
                        return <Day
                            key={index}
                            {...day}
                            canSelect={canSelect}
                            onClick={handleClick}
                            onMouseOver={rangePicker && handleMouseOver}
                            selectedDay={selectedDay}
                            il={il}
                            rangePicker={rangePicker}
                            isHebrew={isHebrew}
                            startDay={!endDay ? start : startDay}
                            endDay={endDay || end}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}