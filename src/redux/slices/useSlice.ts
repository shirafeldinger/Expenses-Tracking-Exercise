import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpenseItem, ExpenseSection} from '../../types';
import {compareDatesByDay} from '../../utils';

interface ExpenseState {
  sections: ExpenseSection[];
}

const initialState: ExpenseState = {
  sections: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const {dateKey, expense} = action.payload;

      const sectionIndex = state.sections.findIndex(section =>
        compareDatesByDay(section.title, dateKey),
      );
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].data.push(expense);
      } else {
        state.sections.push({title: dateKey.toString(), data: [expense]});
      }
    },
    setExpenses: (state, action) => {
      state.sections = action.payload;
    },
    deleteExpense: (
      state,
      action: PayloadAction<{dateKey: string; expenseIndex: number}>,
    ) => {
      const {dateKey, expenseIndex} = action.payload;

      state.sections = state.sections.map(section => {
        if (section.title === dateKey) {
          const updatedData = section.data.filter(
            (_, index) => index !== expenseIndex,
          );
          return {...section, data: updatedData};
        }
        return section;
      });

      state.sections = state.sections.filter(
        section => section.data.length > 0,
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        updatedExpense: ExpenseItem;
        oldExpense: ExpenseItem;
      }>,
    ) => {
      const {updatedExpense, oldExpense} = action.payload;

      const sectionIndex = state.sections.findIndex(section =>
        compareDatesByDay(section.title, oldExpense.date,),
      );

      if (sectionIndex !== -1) {
        const expenseIndex = state.sections[sectionIndex].data.findIndex(
          expense => expense.title === oldExpense.title,
        );

        if (expenseIndex !== -1) {
          state.sections[sectionIndex].data[expenseIndex] = {
            ...state.sections[sectionIndex].data[expenseIndex],
            ...updatedExpense,
          };
        }
      }
    },
    resetState: () => initialState,
  },
});

export const {
  setExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  resetState,
} = expenseSlice.actions;
export default expenseSlice.reducer;
