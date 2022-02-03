import * as React from 'react';
import useOnClickOutside from 'use-onclickoutside';
import "./reactJewishDatePicker.scss";
import { getJewishMonth, getWeekdays, getGregDate, getJewishDay, BasicJewishDay, BasicJewishDate, isValidDate } from 'jewish-dates-core';
import { BasicJewishDateRange, DateRange} from './interfaces';
import { MdDateRange } from "@react-icons/all-files/md/MdDateRange"; 

import { Day } from './day';
import { Weekday } from './weekday';
import { Navigation } from './navigation';
import { getTestID } from './utils';
import Dayjs from "dayjs";

export interface ReactJewishDatePickerProps {
    className?: string;
    onClick: (startDay: BasicJewishDay, endDay: BasicJewishDay) => void;
    value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
    isHebrew: boolean;
    canSelect?: (day: BasicJewishDay) => boolean;
    isRange?: boolean;
}

const getDatesInOrder = (day1: BasicJewishDay, day2: BasicJewishDay): BasicJewishDay[] => {
    if (day1 && day2) {
        return Dayjs(day1.date).isBefore(Dayjs(day2.date)) ? [day1, day2] : [day2, day1];
    } else {
        return [];
    } 
}

const getDateStringForSelectedDay = (isRange: boolean, isHebrew: boolean, selectedDay: BasicJewishDay, startDay: BasicJewishDay, endDay: BasicJewishDay): string => {
    if (isRange) {
        if (startDay?.jewishDateStrHebrew) {
            return isHebrew ? `${startDay?.jewishDateStrHebrew} - ${endDay?.jewishDateStrHebrew || ''}` : `${startDay?.jewishDateStr} - ${endDay?.jewishDateStr || ''}`;
        } else {
            return isHebrew ? 'בחר תאריכים' : 'Pick Dates';;
        } 
    } else if (selectedDay) {
        return isHebrew ? selectedDay.jewishDateStrHebrew : selectedDay.jewishDateStr
    } else {
        return isHebrew ? 'בחר תאריך' : 'Pick Date';
    }
}

const isDateRange = (object = {}): object is BasicJewishDateRange | DateRange => {
    return 'startDate' in object;
}

const getDateInit = (date: Date | BasicJewishDate | BasicJewishDateRange | DateRange ): Date => {
    if (isDateRange(date)) { 
        return isValidDate(date.startDate) ? date.startDate : getGregDate(date.startDate );
    } else {
        return isValidDate(date) ? date : getGregDate(date);
    }
}

export const ReactJewishDatePicker: React.FC<ReactJewishDatePickerProps> = (props: ReactJewishDatePickerProps) => {
    const { className, value, isHebrew, isRange, onClick, canSelect } = props;
    if (typeof value == 'string') {
        throw new Error("ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}");
    }
    // const month = getJewishMonth(new Date("2020-05-24"));
    const dateInit = value ? getDateInit(value) : new Date();
    const endDateInit = isDateRange(value) && getDateInit(value.endDate);

    const [date, setDate] = React.useState(dateInit);
    const jewishMonth = getJewishMonth(date);

    const [selectedDay, setSelectedDay] = React.useState<BasicJewishDay>(!isRange && value && jewishMonth.selectedDay);
    const [startDay, setStartDay] = React.useState<BasicJewishDay>(isRange && isDateRange(value) && jewishMonth.selectedDay);
    const [endDay, setEndDay] = React.useState<BasicJewishDay>(isRange && isDateRange(value) && getJewishDay(Dayjs(endDateInit)));
    const [isOpen, setOpen] = React.useState(false);
    const [hoveredDay, setHoveredDay] = React.useState(null);
    const ref = React.useRef(null);

    useOnClickOutside(ref, () => {
        setOpen(false);
    });
    
    const handleClick = (day: BasicJewishDay) => {        
        if (isRange) {
            if (!startDay || endDay) {
                setStartDay(day);
                setEndDay(null);
            } else {
                const [start, end] = getDatesInOrder(startDay, day);
                setStartDay(start);
                setEndDay(end);
                props?.onClick(start,  end);
                setOpen(!isOpen);
            }
        } else {
            setSelectedDay(day);
            props?.onClick(day, undefined); 
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
    const selectedDaysToDisplay = getDateStringForSelectedDay(isRange, isHebrew, selectedDay, startDay, endDay);    

    return (
        <div ref={ref} className={classNames}>
            <div data-testid={getTestID('selectedDate')} onClick={() => setOpen(!isOpen)} className={`selectedDate`}>
                <MdDateRange className="calendarIcon" />
                {selectedDaysToDisplay}
            </div>
            <div className={`monthWrapper ${isOpen ? `open` : ``}`}>
                <Navigation month={jewishMonth.jewishMonthString} year={jewishMonth.jewishYear} isHebrew={isHebrew} onClick={handleNavigationClick} />
                <div className='weekdayWrapper'>
                    {getWeekdays(isHebrew).map((weekday, index) => {
                        return <Weekday key={index} value={weekday} />
                    })}
                </div>
                <div className={`month`} >
                    {jewishMonth.days.map((day, index) => {                        
                        return <Day
                            key={index}
                            {...day}
                            canSelect={canSelect}
                            onClick={handleClick}
                            onMouseOver={isRange && handleMouseOver}
                            selectedDay={selectedDay}
                            isRange={isRange}
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
