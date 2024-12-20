export type NewExpense = {
  title: string;
  amount: number;
  date: string;
};

export type ExpenseItem = {
  title: string;
  amount: number;
};

export type ExpenseSection = {
  title: string; // The date string
  data: ExpenseItem[];
};
