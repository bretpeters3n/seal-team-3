import * as dayjs from 'dayjs';
import { budgetDummyData } from './dataStructureFiles/budget.interfaces';

// today minus a year
const startingDay = dayjs().subtract(1, 'year');

// a year from today, 2 years from startingDay
const endingDay = startingDay.add(2, 'year');

// a copy of startingDay so we don't manipulate the startingDay.
let mutableStartingDate = startingDay;

// Array to store budget titles
const budgetTitlesArray = [];

// Gets the difference in months between the startingDay and endingDay
const differenceInMonths = endingDay.diff(startingDay, 'month');

// the counter that increments each loop to get each month
let monthCounter = 0;

const serveBudgetTitleOptions = () => {
  while (monthCounter < differenceInMonths + 1) {
    budgetTitlesArray.push(
      mutableStartingDate.add(monthCounter, 'month').format('MMMM YYYY')
    );
    monthCounter++;
    if (monthCounter > differenceInMonths) {
      break;
    }
  }
  return budgetTitlesArray;
};

export const createBudgetObjects = (): budgetDummyData[] => {
  const budgetTitleArray = serveBudgetTitleOptions();
  const budgetObjectArray = budgetTitleArray.map((title: string) => {
    return { title, total: 0, currentAmount: 0, created: false };
  });
  return budgetObjectArray;
};
