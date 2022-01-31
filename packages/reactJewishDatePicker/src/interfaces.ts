import { BasicJewishDate as BasicJewishDateCore, BasicJewishDay as BasicJewishDayCore } from 'jewish-dates-core';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface BasicJewishDateRange {
  startDate: BasicJewishDate;
  endDate: BasicJewishDate;
}

export type BasicJewishDate = BasicJewishDateCore;
export type BasicJewishDay = BasicJewishDayCore;
