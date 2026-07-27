import * as React from "react";
import { screen, within } from "@testing-library/react";
import { render, fireEvent } from "./test-utils";
import {
  BasicJewishDate,
  BasicJewishDay,
  ReactJewishDatePicker,
} from "..";
import { it, expect, describe } from "vitest";

const value: BasicJewishDate = { day: 13, monthName: "Elul", year: 5781 };

const renderPicker = (props = {}) =>
  render(
    <ReactJewishDatePicker
      isHebrew={false}
      value={value}
      onClick={(_day: BasicJewishDay) => {}}
      {...props}
    />
  );

// The calendar is only mounted from the first open onward, so anything that
// inspects the grid has to open the picker first.
const renderOpenPicker = (props = {}) => {
  const result = renderPicker(props);
  fireEvent.click(screen.getByTestId("selectedDate"));
  return result;
};

describe("keyboard access", () => {
  it("exposes the trigger as a button in the tab order", () => {
    renderPicker();
    const trigger = screen.getByTestId("selectedDate");

    expect(trigger).toHaveAttribute("role", "button");
    expect(trigger).toHaveAttribute("tabindex", "0");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on Enter and on Space, and reflects state in aria-expanded", () => {
    renderPicker();
    const trigger = screen.getByTestId("selectedDate");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(trigger, { key: " " });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes on Escape and returns focus to the trigger", () => {
    const { container } = renderPicker();
    const trigger = screen.getByTestId("selectedDate");

    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const day = screen.getByTestId("20 Elul 5781");
    day.focus();
    fireEvent.keyDown(day, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(trigger);
    expect(container.querySelector(".monthWrapper")).not.toHaveClass("open");
  });

  it("gives the month arrows accessible names", () => {
    renderOpenPicker();

    expect(screen.getByTestId("prev").tagName).toBe("BUTTON");
    expect(screen.getByTestId("next").tagName).toBe("BUTTON");
    expect(screen.getByTestId("prev")).toHaveAttribute(
      "aria-label",
      "Previous month"
    );
    expect(screen.getByTestId("next")).toHaveAttribute(
      "aria-label",
      "Next month"
    );
  });

  it("labels the arrows in Hebrew when isHebrew", () => {
    renderOpenPicker({ isHebrew: true });

    expect(screen.getByTestId("prev")).toHaveAttribute(
      "aria-label",
      "החודש הקודם"
    );
    expect(screen.getByTestId("next")).toHaveAttribute("aria-label", "החודש הבא");
  });
});

describe("deferred calendar render", () => {
  it("keeps the closed calendar out of the DOM but still shows the value", () => {
    const { container } = renderPicker();

    expect(container.querySelector(".month")).toBeNull();
    expect(container.querySelectorAll("option")).toHaveLength(0);
    // The trigger text is driven by an effect, so it works without the grid.
    expect(screen.getByTestId("selectedDate")).toHaveTextContent("13 Elul 5781");
  });

  it("mounts the calendar on first open and keeps it mounted after closing", () => {
    const { container } = renderPicker();
    const trigger = screen.getByTestId("selectedDate");

    fireEvent.click(trigger);
    expect(container.querySelector(".month")).not.toBeNull();
    expect(container.querySelectorAll("option").length).toBeGreaterThan(100);

    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // Still mounted, so the close animation has content to animate.
    expect(container.querySelector(".month")).not.toBeNull();
  });
});

describe("day grid", () => {
  it("costs exactly one tab stop and points it at the selected day", () => {
    const { container } = renderOpenPicker();
    const grid = container.querySelector(".month") as HTMLElement;

    const tabbable = within(grid)
      .getAllByRole("option")
      .filter((cell) => cell.getAttribute("tabindex") === "0");

    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAttribute("aria-selected", "true");
    expect(tabbable[0]).toHaveTextContent("13");
  });

  it("moves focus with arrow keys", () => {
    const { container } = renderOpenPicker();
    const grid = container.querySelector(".month") as HTMLElement;
    const start = screen.getByTestId("13 Elul 5781");
    start.focus();

    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByTestId("14 Elul 5781"));

    fireEvent.keyDown(grid, { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByTestId("21 Elul 5781"));

    fireEvent.keyDown(grid, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(screen.getByTestId("20 Elul 5781"));

    fireEvent.keyDown(grid, { key: "ArrowUp" });
    expect(document.activeElement).toBe(screen.getByTestId("13 Elul 5781"));
  });

  it("reverses left/right in Hebrew so motion matches the screen", () => {
    const { container } = renderOpenPicker({ isHebrew: true });
    const grid = container.querySelector(".month") as HTMLElement;
    screen.getByTestId("י״ג אלול התשפ״א").focus();

    fireEvent.keyDown(grid, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(screen.getByTestId("י״ד אלול התשפ״א"));
  });

  it("selects a day with Enter", () => {
    let picked: BasicJewishDay | undefined;
    renderOpenPicker({ onClick: (day: BasicJewishDay) => (picked = day) });

    fireEvent.keyDown(screen.getByTestId("20 Elul 5781"), { key: "Enter" });

    expect(picked).toBeDefined();
    expect(screen.getByTestId("selectedDate")).toHaveTextContent("20 Elul 5781");
  });

  it("does not strand focus inside the calendar after selecting", () => {
    renderPicker();
    const trigger = screen.getByTestId("selectedDate");

    fireEvent.keyDown(trigger, { key: "Enter" });
    const day = screen.getByTestId("20 Elul 5781");
    day.focus();
    fireEvent.keyDown(day, { key: "Enter" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(trigger);
  });

  it("marks unselectable days aria-disabled and refuses to select them", () => {
    let picked: BasicJewishDay | undefined;
    renderOpenPicker({
      canSelect: (day: BasicJewishDay) => day.jewishDate.day !== 20,
      onClick: (day: BasicJewishDay) => (picked = day),
    });

    const blocked = screen.getByTestId("20 Elul 5781");
    expect(blocked).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(blocked);
    fireEvent.keyDown(blocked, { key: "Enter" });
    expect(picked).toBeUndefined();
  });
});
