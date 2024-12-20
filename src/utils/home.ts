export const totalExpensesCalculation = sections =>
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
