import {ExpenseSection} from '../types';

export const totalExpensesCalculation = (sections: ExpenseSection[]) => {
  const getSectionTotal = section =>
    section.data.reduce((sectionTotal, item) => sectionTotal + item.amount, 0);

  return sections.reduce(
    (total, section) => total + getSectionTotal(section),
    0,
  );
};
