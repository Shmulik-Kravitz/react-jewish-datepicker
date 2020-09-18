import * as React from 'react';
import "./reactJewishDatePicker.scss";
import { getJewishMonths, getJewishYears, getPrevMonth, getNextMonth, convertToHebrew } from '@sk/jewish-dates-core';


export interface NavigationProps {
    isHebrew?: boolean;
    setMonth: (month) => void;
    setYear: (year) => void;
    month: string;
    year: number;
}

export const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
    return (
        <div className={`navigation`}>
            <div className={`arrowLeft`} onClick={() => {
                const basicJewishMonthInfo = getPrevMonth({ month: props.month, year: props.year, isHebrew: props.isHebrew });
                props.setMonth(basicJewishMonthInfo.month);
                props.setYear(basicJewishMonthInfo.year);
            }}><span></span></div>
            <div className={`monthYearSelection`}>
                <select value={props.month} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
                    props.setMonth(e.currentTarget.value);
                }}>
                    {getJewishMonths(props.year, props.isHebrew).map(month => {
                        return (<option key={month.id} value={month.id}>{month.text}</option>);
                    })}
                </select>

                <select value={props.year} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
                    props.setYear(Number(e.currentTarget.value));
                }}>
                    {getJewishYears(props.year).map(y => {
                        const text = props.isHebrew ? convertToHebrew(y) : y;
                        return (<option key={y} value={y}>{text}</option>);
                    })}
                </select>
            </div>
            <div className={`arrowRight`} onClick={() => {
                const basicJewishMonthInfo = getNextMonth({ month: props.month, year: props.year, isHebrew: props.isHebrew });
                props.setMonth(basicJewishMonthInfo.month);
                props.setYear(basicJewishMonthInfo.year);
            }}>
                <span></span>
            </div>
        </div>
    )
};

