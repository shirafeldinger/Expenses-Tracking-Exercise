import {ExpenseSection} from '../types';

export const totalExpensesCalculation = (sections: ExpenseSection[]) =>
  sections
    .reduce(
      (total, section) =>
        total +
        section.data.reduce(
          (sectionTotal, item) => sectionTotal + item.amount,
          0,
        ),
      0,
    )
    .toFixed(2);
