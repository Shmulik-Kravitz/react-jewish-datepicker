import { useState, useRef, useEffect, useCallback } from "react";
import type { FC } from "react";
import { useOnClickOutside } from "./useOnClickOutside";
import { MdDateRange } from "@react-icons/all-files/md/MdDateRange";
import {
  BasicJewishDay,
  BasicJewishDate,
} from "jewish-dates-core";
import { BasicJewishDateRange, DateRange, DateDisplay } from "./interfaces";
import { Month } from "./month";
import { getTestID } from "./utils";

import "./reactJewishDatePicker.css";
import {
  getDateStringForSelectedDay,
} from "./utils/dateUtils";

export interface ReactJewishDatePickerProps {
  className?: string;
  onClick: (startDay: BasicJewishDay, endDay: BasicJewishDay) => void;
  value?: BasicJewishDate | Date | BasicJewishDateRange | DateRange;
  isHebrew?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
  slidingMonths?: boolean;
  dateDisplay?: DateDisplay;
}

export const ReactJewishDatePicker: FC<ReactJewishDatePickerProps> = (
  { className, value, isHebrew = false, isRange, onClick, canSelect, customizeDayStyle, slidingMonths, dateDisplay }: ReactJewishDatePickerProps
) => {
  if (typeof value === "string") {
    throw new Error(
      "ReactJewishDatePicker: The value can be BasicJewishDate or Date. for Dates use 'value={new Date()}' not 'value={Date()}"
    );
  }

  const [selectedDay, setSelectedDay] = useState<BasicJewishDay>();
  const [startDay, setStartDay] = useState<BasicJewishDay>();
  const [endDay, setEndDay] = useState<BasicJewishDay>();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [selectedDaysToDisplay, setSelectedDaysToDisplay] = useState("");

  useEffect(() => {
    if (selectedDay || startDay || endDay) {
      setSelectedDaysToDisplay(
        getDateStringForSelectedDay(
          isRange || false, 
          isHebrew, 
          selectedDay as BasicJewishDay, 
          startDay as BasicJewishDay, 
          endDay as BasicJewishDay, 
          dateDisplay
        )
      );
    }
  }, [isRange, isHebrew, selectedDay, startDay, endDay, dateDisplay]);

  const handleClickOutside = useCallback(() => setOpen(false), []);
  useOnClickOutside(ref as any, handleClickOutside);

  // Whatever closes the calendar — Escape, picking a day, arrow keys — must not
  // leave focus on an element inside it, which is now visibility:hidden and so
  // drops the user back to the top of the document on their next Tab.
  const wasOpen = useRef(false);
  useEffect(() => {
    const active = document.activeElement;
    if (
      wasOpen.current &&
      !isOpen &&
      active &&
      active !== triggerRef.current &&
      ref.current?.contains(active)
    ) {
      triggerRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const classNames = `reactJewishDatePicker${isHebrew ? " isHebrew" : ""}${isOpen ? " isOpen backdropActive" : ""} ${
    className || ""
  }`;

  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  }, []);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      // Space would otherwise scroll the page.
      e.preventDefault();
      setOpen((open) => !open);
    },
    []
  );

  // Escape closes the calendar; the effect above returns focus to the trigger.
  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Escape" || !isOpen) return;
      e.stopPropagation();
      setOpen(false);
    },
    [isOpen]
  );

  return (
    <div
      ref={ref}
      className={classNames}
      onClick={handleContainerClick}
      onKeyDown={handleContainerKeyDown}
    >
      <div
        ref={triggerRef}
        data-testid={getTestID("selectedDate")}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={
          selectedDaysToDisplay
            ? undefined
            : isHebrew
            ? "בחירת תאריך"
            : "Choose date"
        }
        onClick={() => setOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={`selectedDate`}
      >
        <MdDateRange className="calendarIcon" />
        {selectedDaysToDisplay}
      </div>
      <div className={`monthWrapper ${isOpen ? "open" : ""}${slidingMonths ? " slidingMonths" : ""}`}>
        <Month
          onClick={onClick}
          value={value}
          isHebrew={isHebrew}
          isRange={isRange}
          canSelect={canSelect}
          customizeDayStyle={customizeDayStyle}
          isOpen={isOpen}
          setOpen={setOpen}
          setSelectedDay={setSelectedDay}
          setStartDay={setStartDay}
          setEndDay={setEndDay}
          slidingMonths={slidingMonths}
          dateDisplay={dateDisplay}
        />
      </div>
    </div>
  );
};