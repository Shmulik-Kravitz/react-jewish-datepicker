import * as React from "react";
import { waitFor, screen } from "@testing-library/react";
import { render, fireEvent } from './test-utils';
import {
  BasicJewishDate,
  BasicJewishDay,
  BasicJewishDateRange,
  ReactJewishDatePicker,
} from "..";
import {
  getEngJewishMonths,
  dontSelectHolidays,
  dontSelectShabat,
} from "jewish-dates-core";
import { it, expect, describe } from "vitest";

describe("jewishDatesCore", () => {
  it("change month", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Elul",
      year: 5781,
    };

    const { container, getByText } = render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("month"), {
        target: { value: getEngJewishMonths()[0].id },
      });
    });
    expect(screen.getByTestId("30 Tishri 5781")).toHaveTextContent("30");
  });

  it("change year", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Cheshvan",
      year: 5781,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("year"), { target: { value: 5780 } });
    });
    expect(screen.getByTestId("30 Cheshvan 5780")).toHaveTextContent("30");
  });

  it("prev month", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Cheshvan",
      year: 5781,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        onClick={(day: BasicJewishDay) => {}}
      />, {
      legacyRoot: true

      }
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("prev"));
    });
    expect(screen.getByTestId("30 Tishri 5781")).toHaveTextContent("30");
  });

  it("next month", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Cheshvan",
      year: 5781,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("next"));
    });
    expect(screen.getByTestId("29 Kislev 5781")).toHaveTextContent("29");
  });

  it("select date", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 13,
      monthName: "Cheshvan",
      year: 5781,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("16 Cheshvan 5781"));
    });
    expect(screen.getByTestId("selectedDate")).toHaveTextContent(
      "16 Cheshvan 5781"
    );
  });

  it("dont select holiday", async () => {
    const excludeHolidays = dontSelectHolidays(true);
    const basicJewishDate: BasicJewishDate = {
      day: 21,
      monthName: "Nisan",
      year: 5782,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        canSelect={excludeHolidays}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    expect(screen.getByTestId("21 Nisan 5782")).toHaveClass("noSelect");
  });

  it("dont select shabat", async () => {
    const basicJewishDate: BasicJewishDate = {
      day: 20,
      monthName: "Shevat",
      year: 5782,
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        value={basicJewishDate}
        canSelect={dontSelectShabat}
        onClick={(day: BasicJewishDay) => {}}
      />
    );

    expect(screen.getByTestId("20 Shevat 5782")).toHaveClass("noSelect");
  });

  it("select range", async () => {
    const basicJewishDateRange: BasicJewishDateRange = {
      startDate: {
        day: 16,
        monthName: "Elul",
        year: 5788,
      },
      endDate: {
        day: 20,
        monthName: "Elul",
        year: 5788,
      },
    };
    render(
      <ReactJewishDatePicker
        isHebrew={false}
        isRange={true}
        value={basicJewishDateRange}
        onClick={(startDay: BasicJewishDay, endDay: BasicJewishDay) => {}}
      />
    );

    await waitFor(() => {
      () => {
        fireEvent.click(screen.getByTestId("16 Elul 5788"));
        fireEvent.click(screen.getByTestId("20 Elul 5788"));
      };
    });
    expect(screen.getByTestId("selectedDate")).toHaveTextContent(
      "16 Elul 5788 - 20 Elul 5788"
    );
  });
});
