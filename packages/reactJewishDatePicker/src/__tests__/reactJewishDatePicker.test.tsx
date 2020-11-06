import * as React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BasicJewishDate, BasicJewishDay, ReactJewishDatePicker } from '..'
import { getEngJewishMonths } from 'jewish-dates-core';


test('change month', async () => {
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Elul",
    year: 5781
  };

  const { container, getByText } =render(<ReactJewishDatePicker isHebrew={false} value={basicJewishDate} onClick={(day: BasicJewishDay) => {
  }} />)
  
  await waitFor(() => {
    fireEvent.change(screen.getByTestId('month'), { target: { value: getEngJewishMonths()[0].id } })
  });
  expect(screen.getByTestId('30 Tishri 5781')).toHaveTextContent('30');
});

test('change year', async () => {
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Heshvan",
    year: 5781
  };
  render(<ReactJewishDatePicker isHebrew={false} value={basicJewishDate} onClick={(day: BasicJewishDay) => {
  }} />)

  await waitFor(() => {
    fireEvent.change(screen.getByTestId('year'), { target: { value: 5780 } });
  });
  expect(screen.getByTestId('30 Heshvan 5780')).toHaveTextContent('30');
});

test('prev month', async () => {
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Heshvan",
    year: 5781
  };
  render(<ReactJewishDatePicker isHebrew={false} value={basicJewishDate} onClick={(day: BasicJewishDay) => {
  }} />)

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('prev'));
  });
  expect(screen.getByTestId('30 Tishri 5781')).toHaveTextContent('30');
});

test('next month', async () => {
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Heshvan",
    year: 5781
  };
  render(<ReactJewishDatePicker isHebrew={false} value={basicJewishDate} onClick={(day: BasicJewishDay) => {
  }} />)

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('next'));
  });
  expect(screen.getByTestId('29 Kislev 5781')).toHaveTextContent('29');
});

test('select date', async () => {
  const basicJewishDate: BasicJewishDate = {
    day: 13,
    monthName: "Heshvan",
    year: 5781
  };
  render(<ReactJewishDatePicker isHebrew={false} value={basicJewishDate} onClick={(day: BasicJewishDay) => {
  }} />)

  await waitFor(() => {
    fireEvent.click(screen.getByTestId('16 Heshvan 5781'));
  });
  expect(screen.getByTestId('selectedDate')).toHaveTextContent('16 Heshvan 5781');
});