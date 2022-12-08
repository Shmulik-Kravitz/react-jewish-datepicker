import * as React from 'react';
import { getJewishMonths, getJewishYears, getPrevMonth, getNextMonth, convertToHebrew } from 'jewish-dates-core';
import { getTestID } from './utils';


export interface NavigationProps {
    isHebrew?: boolean;
    month: string;
    year: number;
    onClick: (month: string, year: number) => void;
}

export const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
    return (
        <div className={`navigation`}>
            <div className={`arrowLeft`} data-testid={getTestID('prev')} onClick={() => {
                const basicJewishMonthInfo = getPrevMonth({ month: props.month, year: props.year, isHebrew: props.isHebrew });
                props.onClick(basicJewishMonthInfo.month, basicJewishMonthInfo.year);
            }}><span></span></div>
            <div className={`monthYearSelection`}>
                <select data-testid={getTestID('month')} value={props.month} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
                    const month = e.currentTarget.value;
                    props.onClick(month, props.year);
                }}>
                    {getJewishMonths(props.year, props.isHebrew).map(month => {
                        return (<option data-testid={getTestID(month.text)} key={month.id} value={month.id}>{month.text}</option>);
                    })}
                </select>

                <select data-testid={getTestID('year')} value={props.year} onChange={(e: React.SyntheticEvent<HTMLSelectElement>) => {
                    const year = Number(e.currentTarget.value);
                    props.onClick(props.month, year);
                }}>
                    {getJewishYears(props.year).map(y => {
                        const text = props.isHebrew ? convertToHebrew(y) : y;
                        return (<option data-testid={getTestID(y.toString())}  key={y} value={y}>{text}</option>);
                    })}
                </select>
            </div>
            <div className={`arrowRight`} data-testid={getTestID('next')} onClick={() => {
                const basicJewishMonthInfo = getNextMonth({ month: props.month, year: props.year, isHebrew: props.isHebrew });
                props.onClick(basicJewishMonthInfo.month, basicJewishMonthInfo.year);
            }}>
                <span></span>
            </div>
        </div>
    )
};

