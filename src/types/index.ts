export type ExpenseItem = {
  title: string;
  amount: number;
  date: string;
};

export type ExpenseSection = {
  title: string; // The date string
  data: ExpenseItem[];
};
